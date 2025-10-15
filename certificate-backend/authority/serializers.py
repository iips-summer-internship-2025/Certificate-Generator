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
#       
# 
#       user.set_password(password)
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
# class CertificateSerializer(serializers.Serializer):
#     csv = serializers.FileField()
#     template = serializers.ImageField()  
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['certificate_id', 'name', 'email_id', 'roll_no', 'certificate', 'timestamp']

      
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
        
from rest_framework import serializers
from .models import Club, Event


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    club_id= serializers.SlugRelatedField(
        queryset=Club.objects.all(),
        slug_field='club_code'  # since club_code is the primary key
    )
    club_name = serializers.CharField(source='club_id.club_name', read_only=True)
    eventName = serializers.CharField(source='event_name')
    startDate = serializers.DateField(source='start_date')
    endDate = serializers.DateField(source='end_date')
    coordinator2 = serializers.CharField(required=False, allow_blank=True)
    coordinator3 = serializers.CharField(required=False, allow_blank=True)
    coordinator4 = serializers.CharField(required=False, allow_blank=True)
    
    #organizerName = serializers.CharField(source='coordinator_name')
    #coordinator2 = serializers.CharField(source='coordinator_name1')
    #coordinator3 = serializers.CharField(source='coordinator_name2')
    
    #These are only for frontend dropdown compatibility
    name = serializers.CharField(source='event_name', read_only=True)
    date = serializers.DateField(source='start_date', read_only=True)

    class Meta:
        model = Event
        fields = [
            'id',
            'club_id',         # keep as is
            'eventName',       # maps to event_name
            'startDate',       # maps to start_date
            'endDate',         # maps to end_date
            'coordinator1',
            'coordinator2',
            'coordinator3',
            'coordinator4',# maps to coordinator_name
            'event_pdf',
            'event_image',
            'event_image1',
            'event_image2',  
            'event_image3',   
            'club_name',
            'name',  #  Add for dropdown
            'date',
            'participantList',  # Add for participant list
        ]
        #read_only_fields = ['event_pdf', 'event_image']  # These are filled after Cloudinary upload
        
class EventDetailSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club_id.club_name', read_only=True)

    class Meta:
        model  = Event
        fields = [
            'id', 'club_name', 'event_name',
            'start_date', 'end_date',
            'event_pdf',
            'event_image', 'event_image1', 'event_image2', 'event_image3',
        ]


