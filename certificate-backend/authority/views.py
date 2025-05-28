# users/views.py

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from PIL import Image, ImageDraw, ImageFont
import pytesseract
import csv
import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from .serializers import CustomTokenObtainPairSerializer, UserSerializer



PLACEHOLDERS = {'name', 'class', 'event', 'rank'}
UPLOAD_DIR = 'uploads'
CERT_DIR = 'certificates'
DEFAULT_FONT = ImageFont.load_default()


def generate_certificate(template_path: str, output_path: str, data: dict) -> None:
    """Generate a certificate image with user data."""
    image = Image.open(template_path).convert("RGB")
    draw = ImageDraw.Draw(image)
    boxes = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)

    for i in range(len(boxes['level'])):
        word = boxes['text'][i].strip().lower()
        if word in PLACEHOLDERS:
            x, y, w, h = boxes['left'][i], boxes['top'][i], boxes['width'][i], boxes['height'][i]
            draw.rectangle([x, y, x + w, y + h], fill='white')
            text = data.get(word.capitalize(), '')  # Match CSV headers like "Name", "Class", etc.
            draw.text((x, y), text, fill='black', font=DEFAULT_FONT)

    image.save(output_path)


def save_uploaded_file(uploaded_file, path: str) -> None:
    """Save uploaded file to disk."""
    with open(path, 'wb+') as f:
        for chunk in uploaded_file.chunks():
            f.write(chunk)


def handle_csv_upload(csv_file, output_csv_path: str) -> list[dict]:
    """Append new CSV rows and return all rows for processing."""
    csv_data = csv_file.read().decode('utf-8').splitlines()
    reader = csv.reader(csv_data)
    is_new_file = not os.path.exists(output_csv_path)

    rows = []
    with open(output_csv_path, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        header = next(reader, None)
        if is_new_file and header:
            writer.writerow(header)
        else:
            next(reader, None)  # Skip header if appending

        for row in reader:
            writer.writerow(row)
            rows.append(dict(zip(header, row)))

    return rows


def upload_files(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    csv_file = request.FILES.get('csvfile')
    image_file = request.FILES.get('imagefile')
    user_type = request.POST.get('userType', '').lower()

    if not all([csv_file, image_file, user_type]):
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    if user_type not in ('merit', 'participant'):
        return JsonResponse({'error': 'Invalid userType'}, status=400)

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    os.makedirs(os.path.join(CERT_DIR, user_type), exist_ok=True)

    image_path = os.path.join(UPLOAD_DIR, image_file.name)
    csv_path = os.path.join(UPLOAD_DIR, f"{user_type}.csv")

    save_uploaded_file(image_file, image_path)
    new_rows = handle_csv_upload(csv_file, csv_path)

    for row in new_rows:
        name_slug = row.get('Name', '').replace(" ", "_")
        if name_slug:
            cert_path = os.path.join(CERT_DIR, user_type, f"{name_slug}.jpg")
            generate_certificate(image_path, cert_path, row)

    return JsonResponse({'message': 'Certificates generated successfully'})


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
    pass


class RegisterView(APIView):
    permission_classes = [AllowAny]


    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


