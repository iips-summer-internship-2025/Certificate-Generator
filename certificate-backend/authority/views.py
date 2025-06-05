# users/views.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from .serializers import CertificateUploadSerializer
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
from .models import Certificate,generate_unique_id
import cloudinary
import cloudinary.uploader
#from .cloudinary_upload import cloudinary_upload
import qrcode
from io import BytesIO
import io
from rest_framework.parsers import MultiPartParser
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
# In-memory QR generator
def generate_qr_image_in_memory(data):
    qr = qrcode.QRCode(version=1, box_size=5, border=2)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    return img

def generate_certificate_dynamic(template_bytes,  data):
    #image = Image.open(template_path).convert("RGB")
    # Load the image from in-memory bytes
    image = Image.open(io.BytesIO(template_bytes)).convert("RGB")
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    
    # Perform OCR and get bounding boxes for each word
    boxes = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
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

    #image.save(output_path)
    # Return image in-memory
    output = io.BytesIO()
    image.save(output, format='JPEG')
    output.seek(0)
    return output

#  Upload to Cloudinary
# def cloudinary_upload(cert_image_io):
    # result=cloudinary.uploader.upload(cert_image_io, folder='certificates', use_filename=True, unique_filename=True)
    # #cloudinary_result = cloudinary.uploader.upload(cert_image_io)
    # return JsonResponse({'cloudinary_url': result.get('secure_url')})
def test_cloudinary_upload(request):
    # Create a simple red image in memory
    img = Image.new('RGB', (400, 200), color='red')
    buffer = io.BytesIO()
    img.save(buffer, format='JPEG')
    buffer.seek(0)

    result = cloudinary_upload(buffer)
    return JsonResponse({'cloudinary_url': result.get('secure_url')})

def cloudinary_upload(file_like_object):
    return cloudinary.uploader.upload(
        file_like_object,
        folder='certificates',
        use_filename=True,
        unique_filename=True
    )
#some change done here for testing purpose
#def upload_files(request):
class UploadCertificatesView(APIView):
    parser_classes = [MultiPartParser]
    def post(self, request):
        # if request.method != 'POST':
        #     return JsonResponse({'error': 'Invalid method'}, status=405)
        serializer = CertificateUploadSerializer(data=request.data)
        if serializer.is_valid():
            csv_file = serializer.validated_data['csv']
            template_file = serializer.validated_data['template']

            # Process your files here (generate certs, upload to Cloudinary, etc.)

            
        # csv_file = request.FILES.get('csvfile')
        # image_file = request.FILES.get('imagefile')
            #suser_type = request.POST.get('userType')

            # if not csv_file or not template_file or not user_type:
            #     return JsonResponse({'error': 'Missing files or userType'}, status=400)
            
            # user_type = user_type.lower()
            # if user_type not in ('merit', 'participant'):
            #     return JsonResponse({'error': 'Invalid userType'}, status=400)
            #  this 2  lines can be deleted later 
            #upload_dir = 'uploads'
            #os.makedirs(upload_dir, exist_ok=True)
            
            ##Read template once into memory
            template_bytes = template_file.read() # add this line to read the image file into memory
            
            # Save the image file
            # this section  also can be deleted later
            #img_path = os.path.join(upload_dir, image_file.name)
            #with open(img_path, 'wb+') as f:
                #for chunk in image_file.chunks():
                    #f.write(chunk)

            # Read uploaded CSV content
            csv_file_data = csv_file.read().decode('utf-8')
            csv_reader = csv.DictReader(StringIO(csv_file_data))

            # Prepares certificate output directory #this also can be deleted later
            #cert_dir = os.path.join('certificates', user_type)
            #os.makedirs(cert_dir, exist_ok=True)

            # Generate certificates from the CSV reader
            for row in csv_reader:
                # Generate certificates for each row
                name_slug = row.get('Name', '').replace(" ", "_")
                if not name_slug:
                    continue  # Skip if no name found
                
                #cert_path = os.path.join(cert_dir, f"{name_slug}.jpg")
                #generate_certificate_dynamic(img_path, cert_path, row, user_type)
                cert_image_io=generate_certificate_dynamic(template_bytes,row)
                cloudinary_result = cloudinary_upload(cert_image_io)
                
                name = row.get('Name', '').strip()
                roll_no = row.get('roll_no', '').strip()
                email_id = row.get('email_id', '').strip()
                #user_type = row.get('status', '').strip()
                if not name:
                    continue  

                # Save certificate data to the database
                Certificate.objects.create(
                    name=name,
                    roll_no=roll_no,
                    email_id=email_id,
                    #user_type=userType.lower() == 'true',  # Convert to boolean
                    certificate=cloudinary_result.get('secure_url') #certificate_url 
                )

            return JsonResponse({'message': 'Files uploaded and certificates generated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
    obj = Certificate.objects.create(name="Example via view")
    return JsonResponse({'unique_id':obj.unique_id})

