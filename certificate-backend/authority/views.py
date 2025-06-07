# users/views.py
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
from io import StringIO
from .models import Certificate
import cloudinary
import cloudinary.uploader
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.cache import cache

from rest_framework import viewsets
from .serializers import CertificateSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions
from .serializers import AdminSerializer


def generate_certificate_dynamic(template_path, output_path, coordinates,row, certificate_id):
    
    image = Image.open(template_path).convert("RGB")
    width, height = image.size
    
    draw = ImageDraw.Draw(image)
    # for field in ['name','event']:
    #     coord = next((item for item in coordinates if item['title'].lower() == field), None)

    for item in coordinates:
        field_key = item.get('title', '')
        #matched_key = next((k for k in row.keys() if k.strip().lower() == field_key.lower()), None)
        text = row.get(field_key, '') #if matched_key else '' # dynamically extract from CSV

        #text = item.get('title', '')
        x_percent = item.get('x', 0)
        y_percent = item.get('y', 0)
        # Convert percent to actual pixel values
        x = int((x_percent / 100) * width)
        y = int((y_percent / 100) * height)
        font_color = item.get('font_color')#, '#000000')
        font_size_percent = float(item.get('fontSize', 2))
        font_size = int((font_size_percent / 100) * height)



        # Remove 'px' and convert to int
        # try:
        #     font_size = int(font_size_str.replace('px', ''))
        # except:
        #     font_size = 16

        # Load a font — make sure 'arial.ttf' exists or use full path
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()

        draw.text((x, y), text, fill=font_color, font=font)



    #  Generate QR code based on unique ID
    qr_data = f"https://yourdomain.com/verify/{certificate_id}"
    qr = qrcode.make(qr_data)
    qr = qr.resize((150, 150))  # Resize as needed
    image.paste(qr, (image.width - 170, image.height - 170))  # Bottom right corner

    image.save(output_path)

@csrf_exempt
def upload_files(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid method'}, status=405)
    
    coordinates = cache.get('certificate_coordinates')
    if not coordinates:
        return JsonResponse({'error': 'Coordinates not set. Please send them first via /accept-coords'}, status=400)

    csv_file = request.FILES.get('csvfile')
    image_file = request.FILES.get('imagefile')
    user_type = request.POST.get('userType')

    if not csv_file or not image_file or not user_type:
        return JsonResponse({'error': 'Missing files or userType'}, status=400)
    
    user_type = user_type.lower()
    if user_type not in ('merit', 'participant'):
        return JsonResponse({'error': 'Invalid userType'}, status=400)
    
    # upload_dir = 'uploads'
    os.makedirs("certificates/qrcodes", exist_ok=True)
    # os.makedirs(upload_dir, exist_ok=True)
    template_filename = default_storage.save(os.path.join('templates', image_file.name), image_file)
    template_path = os.path.join(settings.MEDIA_ROOT, template_filename)

    # When creating the output certificate path
    # output_filename = f"{name_slug}.jpg"
    # output_path = os.path.join(settings.MEDIA_ROOT, 'certificates', output_filename)

    # Save the image file
    # img_path = os.path.join(upload_dir, image_file.name)
    # with open(img_path, 'wb+') as f:
    #     for chunk in image_file.chunks():
    #         f.write(chunk)

    # Read uploaded CSV content
    csv_file_data = csv_file.read().decode('utf-8')
    csv_reader = csv.DictReader(StringIO(csv_file_data))
    csv_data_list = list(csv_reader)

    # Prepares certificate output directory
    cert_dir = os.path.join(settings.MEDIA_ROOT, 'certificates', user_type)
    os.makedirs(cert_dir, exist_ok=True)
    
    # Generate certificates from the CSV reader
    for row in csv_data_list:

        # Generate certificates for each row
        name = row.get('Name', '').strip()
        if not name:
            continue
        
        name_slug = name.replace(" ", "_")
        output_filename = f"{name_slug}.jpg"
        output_path = os.path.join(cert_dir, output_filename)
        certificate_id = generate_unique_id() 
        #  Generate the certificate dynamically

        # coordinates = [
        #     {'title': 'Name', 'x': 100, 'y': 150, 'font_color': '#000000', 'fontSize': '100px'},
        #     {'title': 'event', 'x': 100, 'y': 200, 'font_color': '#000000', 'fontSize': '100px'}
        # ] 
        generate_certificate_dynamic(template_path, output_path, coordinates,row,certificate_id)
        
        #  Upload to Cloudinary
        cloudinary_result = cloudinary.uploader.upload(output_path)

        name = row.get('Name', '').strip()
        roll_no = row.get('roll_no', '').strip()
        email_id = row.get('email_id', '').strip()
        #status = row.get('status', '').strip()
        if not name:
            continue  

        # Save certificate data to the database
        Certificate.objects.create(
            name=name,
            roll_no=roll_no,
            email_id=email_id,
            #status=status.lower() == 'true',  # Convert to boolean
            certificate=cloudinary_result.get('secure_url') ,#certificate_url 
            certificate_id=certificate_id

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
                font_color = item.get('font_color')
                print(f"Received field: {title}, x: {x}, y: {y}, fontSize: {font_size}, fontcolor: {font_color}")
            
            cache.set('certificate_coordinates', data, timeout=3600)  # expires in 1 hour

                # You can now process/save/store this data
                
                
            # generate_certificate_dynamic(
            #     template_path="./uploads/Techno-Geek.png",  # update with actual path
            #     output_path="./upload/output.png",      # update with actual path
            #     coordinates=data                       # pass the entire list
            # )
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

class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


User = get_user_model()

class AdminUserViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]

    def list(self, request):
        admins = User.objects.filter(is_superuser=True)
        data = [
            {
                "username": admin.username,
                "email": admin.email,
                "role": admin.role,  # 'admin' or 'superadmin'
                "date_created": admin.date_joined.strftime('%Y-%m-%d %H:%M:%S'),

            }
            for admin in admins
        ]
        return Response(data)
    
#lass AdminListView(APIView):
  #  permission_classes = [IsAuthenticated]

   # def get(self, request):
    #    admins = User.objects.filter(is_staff=True)
     #   serializer = AdminSerializer(admins, many=True)
      #  return Response(serializer.data)    
    
class AdminListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        admins = User.objects.filter(is_staff=True) | User.objects.filter(is_superuser=True)
        admins = admins.distinct() # remove duplicates

        data = []
        for admin in admins:
            if admin.is_superuser:
                role = "superadmin"
            elif admin.is_staff:
                role = "admin"
            else:
                role = "user"  # fallback, shouldn't occur in this list

            data.append({
                "username": admin.username,
                "email": admin.email,
                "role": role,
                "date_created": admin.date_joined.strftime("%Y-%m-%d %H:%M:%S"),
            })

        return Response(data)    