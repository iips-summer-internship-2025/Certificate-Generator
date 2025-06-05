# users/views.py

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.http import JsonResponse, HttpResponse
from PIL import Image, ImageDraw, ImageFont
import pytesseract
import csv
import os
from django.views.decorators.csrf import csrf_exempt 
from .serializers import CustomTokenObtainPairSerializer, UserSerializer
import qrcode
from .models import Certificate
import random
import string


def generate_certificate_dynamic(template_path, output_path, data, user_type, certificate_id):
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



    #  Generate QR code based on unique ID
    qr_data = f"https://yourdomain.com/verify/{certificate_id}"
    qr = qrcode.make(qr_data)
    qr = qr.resize((150, 150))  # Resize as needed
    image.paste(qr, (image.width - 170, image.height - 170))  # Bottom right corner


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
    os.makedirs("certificates/qrcodes", exist_ok=True)
    os.makedirs(upload_dir, exist_ok=True)

    # Save the image file
    img_path = os.path.join(upload_dir, image_file.name)
    with open(img_path, 'wb+') as f:
        for chunk in image_file.chunks():
            f.write(chunk)

    # Define CSV path based on user type
    final_csv_path = os.path.join(upload_dir, f'{user_type}.csv')

    # Read uploaded CSV content
    csv_file_data = csv_file.read().decode('utf-8').splitlines()
    csv_reader = csv.reader(csv_file_data)

    # Append or create the CSV file with appropriate header handling
    file_exists = os.path.isfile(final_csv_path)
    with open(final_csv_path, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)

        if not file_exists:
            header = next(csv_reader, None)
            if header:
                writer.writerow(header)
        else:
            # Skip header if file already exists
            next(csv_reader, None)

        for row in csv_reader:
            writer.writerow(row)

    # Prepare certificate output directory
    cert_dir = os.path.join('certificates', user_type)
    os.makedirs(cert_dir, exist_ok=True)

    # Generate certificates from the updated CSV file
    with open(final_csv_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name_slug = row.get('Name', '').replace(" ", "_")
            if not name_slug:
                continue  # Skip if no name found
 
            certificate_id = generate_unique_id() 
            certificate_obj = Certificate.objects.create(
                 name=name_slug,
                 roll_no=row.get('roll_no', ''),
                 email_id=row.get('email_id', ''),
                 certificate_id=certificate_id
            )  
            cert_path = os.path.join(cert_dir, f"{name_slug}.jpg")
            generate_certificate_dynamic(img_path, cert_path, row, user_type,certificate_obj.certificate_id)



    return JsonResponse({'message': 'Files uploaded and certificates generated successfully'})


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
    row = {
    'Name': 'Test User',
    'roll_no': '12345',
    'email_id': 'test@example.com',
    # other fields
}
    name_slug = "test_name"  # or some default value
    certificate_id = generate_unique_id()

    obj = Certificate.objects.create(

            name=name_slug,
            roll_no=row.get('Roll No', ''),
            email_id=row.get('Email', ''),
            certificate_id=certificate_id,
            certificate=f"https://yourdomain.com/verify/{certificate_id}"
        
    )
    return JsonResponse({'unique_id': obj.certificate_id})

def generate_unique_id():
    while True:
        # 2 uppercase letters + 4-digit number
        prefix = ''.join(random.choices(string.ascii_uppercase, k=2))  # e.g., 'AB'
        suffix = ''.join(random.choices(string.digits, k=4))           # e.g., '1234'
        unique_id = prefix + suffix                                    # e.g., 'AB1234'

        if not Certificate.objects.filter(certificate_id=unique_id).exists():
            return unique_id



def verify_certificate(request, certificate_id):
     try:
         cert = Certificate.objects.get(certificate_id=certificate_id)
         return JsonResponse({
            'status': 'valid',
            'name': cert.name,
            'roll_no': cert.roll_no,
            'email': cert.email_id
         })
     except Certificate.DoesNotExist:
         return JsonResponse({'status': 'Certificate not found'}, status=404)
     


def show_qr(request,certificate_id):
   # test_id = "XB5879"  # Replace this with any real certificate_id for testing
    qr_data = f"https://yourdomain.com/verify/{certificate_id}"
    qr_img = qrcode.make(qr_data)

    response = HttpResponse(content_type="image/png")
    qr_img.save(response, "PNG")
    return response