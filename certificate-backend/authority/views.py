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
from django.views.decorators.csrf import csrf_exempt 
from .serializers import CustomTokenObtainPairSerializer, UserSerializer
from io import StringIO
from .models import Certificate
import cloudinary
import cloudinary.uploader
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

def generate_certificate_dynamic(template_path, output_path, data, user_type):
    image = Image.open(template_path).convert("RGB")
    draw = ImageDraw.Draw(image)
    
    # Perform OCR and get bounding boxes for each word
    boxes = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)

    font = ImageFont.load_default()
    
    # Loop over each detected word
    n_boxes = len(boxes['level'])
    for i in range(n_boxes):
        word = boxes['text'][i].strip().lower()
        if word in ['name', 'class', 'event', 'rank']:
            # Get box coordinates
            (x, y, w, h) = (boxes['left'][i], boxes['top'][i], boxes['width'][i], boxes['height'][i])

            # Erase placeholder by drawing a white rectangle over it
            draw.rectangle([x, y, x+w, y+h], fill='white')

            # Write the actual data text next to or inside that box
            # You can adjust text position as needed here
            if word == 'name':
                text = data.get('Name', '')
            elif word == 'class':
                text = data.get('class', '')
            elif word == 'event':
                text = data.get('event', '')
            elif word == 'rank':
                text = data.get('rank', '')

            draw.text((x, y), text, fill='black', font=font)

    image.save(output_path)


def upload_files(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid method'}, status=405)

    csv_file = request.FILES.get('csvfile')
    image_file = request.FILES.get('imagefile')
    user_type = request.POST.get('userType')

    if not csv_file or not image_file or not user_type:
        return JsonResponse({'error': 'Missing files or userType'}, status=400)
    
    user_type = user_type.lower()
    if user_type not in ('merit', 'participant'):
        return JsonResponse({'error': 'Invalid userType'}, status=400)
    
    upload_dir = 'uploads'
    os.makedirs(upload_dir, exist_ok=True)

    # Save the image file
    img_path = os.path.join(upload_dir, image_file.name)
    with open(img_path, 'wb+') as f:
        for chunk in image_file.chunks():
            f.write(chunk)

    # Read uploaded CSV content
    csv_file_data = csv_file.read().decode('utf-8').splitlines()
    csv_reader = csv.DictReader(StringIO(csv_file_data))

    # Prepares certificate output directory
    cert_dir = os.path.join('certificates', user_type)
    os.makedirs(cert_dir, exist_ok=True)

    # Generate certificates from the CSV reader
    for row in csv_reader:
        # Generate certificates for each row
        name_slug = row.get('Name', '').replace(" ", "_")
        if not name_slug:
            continue  # Skip if no name found
        cert_path = os.path.join(cert_dir, f"{name_slug}.jpg")
        generate_certificate_dynamic(img_path, cert_path, row, user_type)
        
        #  Upload to Cloudinary
        cloudinary_result = cloudinary.uploader.upload(cert_path)

        name = row.get('Name', '').strip()
        roll_no = row.get('roll_no', '').strip()
        email_id = row.get('email_id', '').strip()
        status = row.get('status', '').strip()
        if not name:
            continue  

        # Save certificate data to the database
        Certificate.objects.create(
            name=name,
            roll_no=roll_no,
            email_id=email_id,
            status=status.lower() == 'true',  # Convert to boolean
            certificate=cloudinary_result.get('secure_url') #certificate_url 
        )

    return JsonResponse({'message': 'Files uploaded and certificates generated successfully'})

@csrf_exempt 
def accept_coords(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            if not isinstance(data, list):
                return JsonResponse({'error': 'Expected a list of objects'}, status=400)
            
            for item in data:
                title = item.get('title')
                x = item.get('x')
                y = item.get('y')
                font_size = item.get('fontSize')
                font_color = item.get('fontcolor')
                
                # You can now process/save/store this data
                print(f"Received field: {title}, x: {x}, y: {y}, fontSize: {font_size}, fontcolor: {font_color}")

            return JsonResponse({'status': 'success', 'message': f'{len(data)} fields received'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Only POST allowed'}, status=405)



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
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def test_id_generation(request):
    obj = MyModel.objects.create(name="Example via view")
    return JsonResponse({'unique_id': obj.unique_id})