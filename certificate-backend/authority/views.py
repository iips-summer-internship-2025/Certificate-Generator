# users/views.py

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import CustomTokenObtainPairSerializer, UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import csv
import os

def upload_files(request):
    if request.method == 'POST':
        csv_file = request.FILES.get('csvfile')
        image_file = request.FILES.get('imagefile')
        user_type = request.POST.get('userType')
        print(user_type)

        if not csv_file or not image_file:
            return JsonResponse({'error': 'Missing files'}, status=400)

        upload_dir = 'uploads'
        os.makedirs(upload_dir, exist_ok=True)  # <== Add this line to create folder if missing

        csv_path = os.path.join(upload_dir, csv_file.name)
        img_path = os.path.join(upload_dir, image_file.name)

        with open(csv_path, 'wb+') as f:
            for chunk in csv_file.chunks():
                f.write(chunk)

        with open(img_path, 'wb+') as f:
            for chunk in image_file.chunks():
                f.write(chunk)

        # You can do something with user_type here

        return JsonResponse({'message': 'Files uploaded successfully'})

    return JsonResponse({'error': 'Invalid method'}, status=405)


def handle_files(request):
    user_type = request.session.get('user_type')




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
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
