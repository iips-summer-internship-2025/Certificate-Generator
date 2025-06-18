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
from .models import CustomUser
import cloudinary
import cloudinary.uploader
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.cache import cache
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, status
from .serializers import AdminUserSerializer,UserSerializer
from django.contrib.auth import update_session_auth_hash
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from rest_framework import permissions
from .serializers import AdminUserSerializer
from django.core.paginator import Paginator
from django.db.models import Q
 
from .utils import send_bulk_emails

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


def generate_certificate_dynamic(template_path, output_path, coordinates,row, certificate_id):
    
    image = Image.open(template_path).convert("RGB")
    width, height = image.size
    
    draw = ImageDraw.Draw(image)
    # for field in ['name','event']:
    #     coord = next((item for item in coordinates if item['title'].lower() == field), None)

    for item in coordinates:
        field_key = item.get('title', '')
        #matched_key = next((k for k in row.keys() if k.strip().lower() == field_key.lower()), None)
        # Find the matching key in row (case-insensitive)
        matched_key = next((k for k in row.keys() if k.strip().lower() == field_key.strip().lower()), None)
        text = row.get(matched_key, '') if matched_key else ''

        #text = item.get('title', '')
        x_percent= item.get('x', 0)
        y_percent= item.get('y', 0)
        
        # Convert percent to actual pixel values
        
        x = int((x_percent / 100) * width)
        y = int((y_percent / 100) * (height+30))    # Adjust y to avoid clipping at the bottom
        font_color = item.get('font_color')#, '#000000')
        font_size_percent = item.get('fontSize', '10px')
        print(f"font_size_percent: {font_size_percent}")
        #font_size = int((font_size_percent / 100) * height)
        
        # Remove 'px' and convert to int
        # try:
        #     font_size = int(font_size_str.replace('px', ''))
        # except:
        #     font_size = 16

        # Load a font — make sure 'arial.ttf' exists or use full path
        try:
            if isinstance(font_size_percent, str) and 'px' in font_size_percent:
                # Remove 'px' and convert to int
                based_font_size = int(str(font_size_percent.replace('px', '')))
            else:
                print (f"font_size_percent: {font_size_percent} in try block")
                based_font_size = float(font_size_percent)
            
            print(f"Based font size: {based_font_size}in try block")
            font_size = int((font_size_percent / 100) * width)
        except:
            based_font_size = 10
            print(f"Based font size: {based_font_size} in except block")
            font_size = int((based_font_size/ 100) * width)
        try:
            font = ImageFont.truetype("ARIAL.TTF", font_size)
            print(f"Using font size: {font_size}px and font: {font}")
        except:
            print(" Falling back to default font!")
            font = ImageFont.load_default()
        print(f"Rendering '{text}' at ({x},{y}) with font size: {font_size}px {font}")
        print(f"coordinates:{coordinates}")


        draw.text((x, y), text, fill=font_color, font=font)



    #  Generate QR code based on unique ID
    qr_data = f"http://127.0.0.1:8000/verify/{certificate_id}"
    qr = qrcode.make(qr_data)
    qr = qr.resize((150, 150))
    # Padding from top and right edges
    padding_x = 20
    padding_y = 20
    
    # Get QR code dimensions
    qr_width, qr_height = qr.size
    # Calculate position for top right corner with padding
      # Resize as needed
    image.paste(qr, (image.width - qr_width - padding_x,  padding_y))  # Bottom right corner

    image.save(output_path)







# Uploading Files and Generating certificates and sending them 
@csrf_exempt
def upload_files(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid method'}, status=405)
    #for testing
    # coordinates = cache.get('certificate_coordinates')
    # if not coordinates:
    #     return JsonResponse({'error': 'Coordinates not set. Please send them first via /accept-coords'}, status=400)
    #for testing
    # coordinates = cache.get('certificate_coordinates')
    # if not coordinates:
    #     return JsonResponse({'error': 'Coordinates not set. Please send them first via /accept-coords'}, status=400)

    csv_file = request.FILES.get('csvfile')
    image_file = request.FILES.get('imagefile')
    user_type = request.POST.get('userType')
    
      # getting and processing  coordinates from request
      
    if request.content_type == 'application/json':
        try:
            body_data = json.loads(request.body)
            coords_json = body_data.get('coords')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    else:
        coords_json = request.POST.get('coords')
    if not coords_json:
        return JsonResponse({'error': 'Missing coordinates'}, status=400)

    try:
        raw_coordinates = json.loads(coords_json)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format for coordinates'}, status=400)

    # Step 2: Sanitize and convert string values
    coordinates = []  # Initialize the coordinates list
    for item in raw_coordinates:
        try:
            coordinates.append({
                'title': item.get('title', ''),
                'x': float(item.get('x', 0)),
                'y': float(item.get('y', 0)),
                'fontSize':float(item.get('font_size','8')),
                'font_color': item.get('font_color', '#000000'),
                
            })
            print(f"{coordinates} in upload function")
        except (ValueError, TypeError) as e:
            return JsonResponse({'error': f'Invalid coordinate values for field "{item.get("title", "unknown")}": {e}'}, status=400)

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
        # Try to find 'name' in any case variant
        name = ''
        for key in row.keys():
            if key.strip().lower() == 'name':
                name = row[key].strip()
                break
        if not name:
            raise Exception("Missing required field: 'name' (case-insensitive) in CSV row")
        
        name_slug = name.replace(" ", "_")
        certificate_id = generate_unique_id()
        output_filename = f"{name_slug}_{certificate_id}.jpg"
        output_path = os.path.join(cert_dir, output_filename)
         
        #  Generate the certificate dynamically

        # coordinates = [
        #     {'title': 'Name', 'x': 100, 'y': 150, 'font_color': '#000000', 'fontSize': '100px'},
        #     {'title': 'event', 'x': 100, 'y': 200, 'font_color': '#000000', 'fontSize': '100px'}
        # ] 
        generate_certificate_dynamic(template_path, output_path, coordinates,row,certificate_id)
        
        #  Upload to Cloudinary
        cloudinary_result = cloudinary.uploader.upload(output_path)

        # Support 'name', 'Name', or 'NAME' as the key
        name = ''
        for key in row.keys():
            if key.strip().lower() == 'name':
                name = row[key].strip()
                break
        roll_no = row.get('roll_no', '').strip()
        email_id = row.get('email', '').strip()
        status = 'idk'
        # status = row.get('status', '').strip()
        if not name:
            continue  
        

        # Save certificate data to the database
        Certificate.objects.create(
            name=name,
            roll_no=roll_no,
            email_id=email_id,
            #status=status.lower() == 'true',  # Convert to boolean
            certificate=cloudinary_result.get('secure_url'),  # certificate_url
            certificate_id=certificate_id
        )

        subject = "Certificate-testing"
        # html_file = 'mails-certificate.html'

        cc_list = [

            'shubhanshsharmagreat@gmail.com',
        ]

        # # Ensure output_path is a string, not a list
        # if isinstance(output_path, list):
        #     output_path_str = output_path[0]
        # else:
        #     output_path_str = output_path

        # with open(output_path_str, "rb") as img_file:
        #     certificate_image_data = img_file.read()

        
        certificate=cloudinary_result['secure_url']  # certificate_url
        certificate_image=cloudinary_result.get('public_id')  # or 'url' or any other field you need

        # sending mails synchronously
        send_bulk_emails(email_id, certificate_id, certificate, subject, cc_list)


    return JsonResponse({'message': 'Files uploaded and certificates generated successfully'})
#
# @csrf_exempt 
# def accept_coords(request):
#     if request.method == 'POST':
#         try:

#             data = json.loads(request.body)
#             if not isinstance(data, list):
#                 return JsonResponse({'error': 'Expected a list of objects'}, status=400)
            
#             for item in data:
#                 title = item.get('title')
#                 x = item.get('x')
#                 y = item.get('y')
#                 font_size = item.get('fontSize')
#                 font_color = item.get('font_color')
#                 print(f"Received field: {title}, x: {x}, y: {y}, fontSize: {font_size}, fontcolor: {font_color}")
            
#             cache.set('certificate_coordinates', data, timeout=3600)  # expires in 1 hour

#                 # You can now process/save/store this data
                
                
#             # generate_certificate_dynamic(
#             #     template_path="./uploads/Techno-Geek.png",  # update with actual path
#             #     output_path="./upload/output.png",      # update with actual path
#             #     coordinates=data                       # pass the entire list
#             # )
#             return JsonResponse({'status': 'success', 'message': f'{len(data)} fields received'})
            
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     return JsonResponse({'error': 'Only POST allowed'}, status=405)








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


# searching certificate:
@api_view(['GET'])
@permission_classes([AllowAny])
def search_certificates(request):
    search_query = request.GET.get('q', '')
    
    if not search_query:
        return Response({'error': 'Search query is required'}, status=400)
    
    # Search by name or email (case insensitive)
    certificates = Certificate.objects.filter(
        Q(name__icontains=search_query) | 
        Q(email_id__icontains=search_query)
    )
    
    results = [
        {
            'name': cert.name,
            'roll_no': cert.roll_no,
            'certificate': cert.certificate,
            'certificate_id': cert.certificate_id,
            'email_id': cert.email_id,
            'timestamp': cert.timestamp
        }
        for cert in certificates
    ]
    
    return Response({'results': results})

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
            #'roll_no': cert.roll_no,
            #'email': cert.email_id
            'certificate_url': cert.certificate,
         })
     except Certificate.DoesNotExist:
         return JsonResponse({'status': 'Certificate not found'}, status=404)
     


# def show_qr(request,certificate_id):
#    # test_id = "XB5879"  # Replace this with any real certificate_id for testing
#     qr_data = f"https://yourdomain.com/verify/{certificate_id}"
#     qr_img = qrcode.make(qr_data)

#     response = HttpResponse(content_type="image/png")
#     qr_img.save(response, "PNG")
#     return response

class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

#admin functinality:view certificate
class ViewCertificatesAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not request.user.is_superuser:
            return Response({'error': 'Only superusers can view certificates.'}, status=status.HTTP_403_FORBIDDEN)

        search_query = request.data.get('search', '').strip()
        page_number = int(request.data.get('page', 1))
        page_size = int(request.data.get('page_size', 10))

        queryset = Certificate.objects.all().order_by('-timestamp')

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(roll_no__icontains=search_query) |
                Q(email_id__icontains=search_query) |
                Q(certificate_id__icontains=search_query)
                #Q(title__icontains=search_query) 
            )

        paginator = Paginator(queryset, page_size)
        page = paginator.get_page(page_number)

        serialized_data = CertificateSerializer(page.object_list, many=True).data

        result = []
        for cert in serialized_data:
            result.append({
                "id": cert['certificate_id'],
                "recipient": cert['email_id'],
                #"title": cert.get('title', "Certificate of Achievement"),
                "title": "Certificate of Achievement",  # static or change if dynamic
                "dateSent": cert['timestamp'][:10],
                "cloudinaryUrl": cert['certificate'],
            })

        return Response({
            "total": paginator.count,
            "totalPages": paginator.num_pages,
            "currentPage": page.number,
            "results": result
        }, status=status.HTTP_200_OK)
        
    def delete(self, request):
        #""Delete Certificate (Superuser only)"""
        if not request.user.is_superuser:
            return Response({'error': 'Only superusers can delete certificates.'}, status=status.HTTP_403_FORBIDDEN)

        certificate_id = request.data.get('certificate_id')
        if not certificate_id:
            return Response({'error': 'certificate_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cert = Certificate.objects.get(certificate_id=certificate_id)
            cert.delete()
            return Response({'message': 'Certificate deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found.'}, status=status.HTTP_404_NOT_FOUND)

#admin functinality:view certificate
class ViewCertificatesAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not request.user.is_superuser:
            return Response({'error': 'Only superusers can view certificates.'}, status=status.HTTP_403_FORBIDDEN)

        search_query = request.data.get('search', '').strip()
        page_number = int(request.data.get('page', 1))
        page_size = int(request.data.get('page_size', 10))

        queryset = Certificate.objects.all().order_by('-timestamp')

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(roll_no__icontains=search_query) |
                Q(email_id__icontains=search_query) |
                Q(certificate_id__icontains=search_query)
                #Q(title__icontains=search_query) 
            )

        paginator = Paginator(queryset, page_size)
        page = paginator.get_page(page_number)

        serialized_data = CertificateSerializer(page.object_list, many=True).data

        result = []
        for cert in serialized_data:
            result.append({
                "id": cert['certificate_id'],
                "recipient": cert['email_id'],
                #"title": cert.get('title', "Certificate of Achievement"),
                "title": "Certificate of Achievement",  # static or change if dynamic
                "dateSent": cert['timestamp'][:10],
                "cloudinaryUrl": cert['certificate'],
            })

        return Response({
            "total": paginator.count,
            "totalPages": paginator.num_pages,
            "currentPage": page.number,
            "results": result
        }, status=status.HTTP_200_OK)
        
    def delete(self, request):
        #""Delete Certificate (Superuser only)"""
        if not request.user.is_superuser:
            return Response({'error': 'Only superusers can delete certificates.'}, status=status.HTTP_403_FORBIDDEN)

        certificate_id = request.data.get('certificate_id')
        if not certificate_id:
            return Response({'error': 'certificate_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cert = Certificate.objects.get(certificate_id=certificate_id)
            cert.delete()
            return Response({'message': 'Certificate deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found.'}, status=status.HTTP_404_NOT_FOUND)

User = get_user_model()
#for change password of user 2. admin functionality
class SuperuserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_superuser:
            return Response({'error': 'Only superusers can change passwords.'}, status=status.HTTP_403_FORBIDDEN)

        email = request.data.get("email")  # Email of the user whose password is to be changed
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not email or not new_password or not confirm_password:
            return Response({'error': 'All fields (email, new_password, confirm_password) are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)  # Securely hashes the password
            user.save()
            return Response({'success': f'Password updated successfully for {user.email}.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

 # for admin view
# for viewing admin users and their roles 3 functionality 
class ViewAdminUsersPost(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not request.user.is_superuser:
            return Response({'error': 'Only superusers can view user list.'}, status=status.HTTP_403_FORBIDDEN)

        search_query = request.data.get('search', '').strip()
        page_number = request.data.get('page', 1)
        page_size = request.data.get('page_size', 10)

        users = CustomUser.objects.all().order_by('-date_joined')

        # Apply search filter
        if search_query:
            users = users.filter(
                Q(email__icontains=search_query) |
                Q(username__icontains=search_query) |
                Q(id__icontains=search_query)
            )

        paginator = Paginator(users, page_size)
        page = paginator.get_page(page_number)
        
        # Build the result list with dynamic role
        results = []
        for user in page:
            if user.is_superuser:
                role = "Super Admin"
            elif user.is_staff:
                role = "Admin"
            else:
                role = "User"  # fallback, not expected here
            results.append({
                "username": user.username,
                "email": user.email,
                "role": role,
                "dateCreated": user.date_joined.strftime("%Y-%m-%d"),
            })

                
        #Serialize the page data
        # serializer = AdminUserSerializer(page, many=True)
        
        #  Return paginated, serialized response
        
        return Response({
            'total_users': paginator.count,
            'total_pages': paginator.num_pages,
            'current_page': page.number,
            'results': results
        }, status=status.HTTP_200_OK)

User = get_user_model()



class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)
    
class AdminUserAPIView(APIView):
    permission_classes = [IsSuperAdmin]

    def get(self, request):
        users = User.objects.filter(is_staff=True) | User.objects.filter(is_superuser=True)
        users = users.distinct()

        data = []
        for user in users:
            if user.is_superuser:
                role = "superadmin"
            elif user.is_staff:
                role = "admin"
            else:
                role = "user"

            data.append({
                "username": user.username,
                "email": user.email,
                "role": role,
                "date_created": user.date_joined.strftime("%Y-%m-%d %H:%M:%S"),
            })

        return Response(data)
        

    def post(self, request):
         data = request.data.copy()
         data['is_staff'] = True  # Ensure the created user is marked as admin

         serializer = AdminUserSerializer(data=data)
         if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class AdminUserDeleteAPIView(APIView):
    permission_classes = [IsSuperAdmin]

    def delete(self, request, username):
        try:
            user = User.objects.get(username=username)
            user.delete()
            return Response({"detail": "User deleted successfully."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    

#User.objects.filter(is_staff=True) |
class AdminListView(APIView):
    permission_classes = [IsSuperAdmin]

    def get(self, request):
        users = User.objects.all()
        data = []
        for user in users:
            if user.is_superuser:
                role = "superadmin"
            elif user.is_staff:
                role = "admin"
            else:
                role = "user"  # fallback, shouldn't occur in this list

            data.append({
                "username": user.username,
                "email": user.email,
                "role": role,
                "date_created": user.date_joined.strftime("%Y-%m-%d %H:%M:%S"),
            })
        
        return Response(data)    
    
class ChangePasswordView(APIView):
    permission_classes = [IsSuperAdmin]

    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not current_password or not new_password or not confirm_password:
            return Response({"detail": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"detail": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"detail": "New passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 6:
            return Response({"detail": "New password must be at least 6 characters."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        update_session_auth_hash(request, user)

        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)    