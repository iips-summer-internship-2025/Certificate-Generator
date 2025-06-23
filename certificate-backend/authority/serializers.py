# # users/serializers.py

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework import serializers
# from .models import CustomUser
# from .models import Certificate
# from django.contrib.auth import get_user_model
# from authority.serializers import CertificateSerializer
# # users/serializers.py

# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['email'] = user.email
#         token['roles'] = list(user.groups.values_list('name', flat=True))
#         return token

# # authority/serializers.py
# from rest_framework import serializers
# from .models import Certificate  # Only import models

# class CertificateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Certificate
#         fields = '__all__'
        
# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ( 'username','email','role,' 'password','is_superuser')
#         read_only_fields = []  


#     def create(self, validated_data):
#         user = CustomUser.objects.create_user(
#             email=validated_data['email'],
#             username=validated_data['username'],
#             password=validated_data['password']
#         )
#         return user
# # for testing purpose 
# class CertificateUploadSerializer(serializers.Serializer):
#     csv = serializers.FileField()
#     template = serializers.ImageField()    
# class AdminUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'email', 'is_superuser', 'is_staff', 'date_joined']
#         model = Certificate
#         fields = [ 'name', 'roll_no', 'email_id', 'certificate_id', 'timestamp']


# User = get_user_model()

# class AdminSerializer(serializers.ModelSerializer):
#     role = serializers.SerializerMethodField()
#     date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

#     class Meta:
#         model = User
#         fields = [ 'username', 'email', 'role', 'date_joined']

#     def get_role(self, obj):
#         if obj.is_superuser:
#             return "Super Admin"
#         elif obj.is_staff:
#             return "Admin"
#         return "User"    


    
# class AdminUserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True)

#     class Meta:
#         model = CustomUser
#         fields = ['username', 'email', 'role', 'password']
        
#         def create(self, validated_data):
#             password = validated_data.pop('password')
#             user = CustomUser(**validated_data)
#             user.set_password(password)
#             user.is_staff = True
#             user.save()
#             return user
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser
from .models import Certificate
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

# users/serializers.py

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['roles'] = list(user.groups.values_list('name', flat=True))
        return token


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ( 'username','email','role', 'password','is_superuser')
        read_only_fields = []  


    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
# for testing purpose 
# class CertificateUploadSerializer(serializers.Serializer):
#     csv = serializers.FileField()
#     template = serializers.ImageField()    
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'  # or list all fields you want to expose
        
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_superuser', 'is_staff', 'date_joined']
        model = Certificate
        fields = [ 'name', 'roll_no', 'email_id', 'certificate_id', 'timestamp']


User = get_user_model()

class AdminSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = User
        fields = [ 'username', 'email', 'role', 'date_joined']

    def get_role(self, obj):
        if obj.is_superuser:
            return "Super Admin"
        elif obj.is_staff:
            return "Admin"
        return "User"    


    
class AdminUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'role', 'password']
        
        # def create(self, validated_data):
        #     password = validated_data.pop('password')
        #     user = CustomUser(**validated_data)
        #     user.set_password(password)
        #     user.is_staff = True
        #     user.save()
        #     return user
        # def create(self, validated_data):
        #     validated_data['password'] = make_password(validated_data['password'])
        #     return super().create(validated_data)
        def create(self, validated_data):
            role = validated_data.get('role', 'Admin')
            validated_data['password'] = make_password(validated_data['password'])

            user = CustomUser(
                username=validated_data['username'],
                email=validated_data['email'],
                role=role,
                is_staff=(role == 'Admin'),
                is_superuser=(role == 'Super Admin'),
            )
            user.save()
            return user