from django.contrib.auth.models import AbstractUser
from django.db import models
import random
import string
from .utils import generate_unique_id



# def generate_unique_id():
#     while True:
#         # 2 uppercase letters + 4-digit number
#         prefix = ''.join(random.choices(string.ascii_uppercase, k=2))  # e.g., 'AB'
#         suffix = ''.join(random.choices(string.digits, k=4))           # e.g., '1234'
#         unique_id = prefix + suffix                                    # e.g., 'AB1234'

        
#         if not Certificate.objects.filter(certificate_id=unique_id).exists():
#             return unique_id
        
#table 1
class CustomUser(AbstractUser):
    
    email = models.EmailField(unique=True)
    # Add any additional fields here

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class Certificate(models.Model):

    name = models.CharField(max_length=150)
    roll_no = models.CharField(max_length=50)           # e.g., IC-2K22-89
    certificate = models.URLField(max_length=200, blank=True, null=True)  # URL to the certificate image
    certificate_id = models.CharField(max_length=6, primary_key=True, default=generate_unique_id, editable=False)
    email_id = models.EmailField(max_length=150)
    timestamp = models.DateTimeField(auto_now_add=True)
    #suser_type= models.BooleanField(default=False)

    #def __str__(self):
     #   return f"{self.name} ({self.roll_no})"





    

