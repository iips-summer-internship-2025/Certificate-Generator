# users/serializers.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser
from .models import Certificate
from django.contrib.auth import get_user_model

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
        fields = ('email', 'username', 'password')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
    
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
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