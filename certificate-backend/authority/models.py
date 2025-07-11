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

     ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('superadmin', 'Super Admin'),
        ('user', 'User'),
    )
     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    #  can_manage_users = models.BooleanField(default=False)  # permission to add/delete users
     email = models.EmailField(unique=True)
    # Add any additional fields here
     USERNAME_FIELD = 'email'
     REQUIRED_FIELDS = ['username']
     
     def save(self, *args, **kwargs):
        # Auto-set role based on is_superuser and is_staff
        if self.is_superuser:
            self.role = 'superadmin'
        elif self.is_staff:
            self.role = 'admin'
        else:
            self.role = 'user'
        super().save(*args, **kwargs)

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

class Club(models.Model):
    club_code = models.CharField(max_length=10, primary_key=True)  # Custom PK
    name = models.CharField(max_length=100, unique=True)
    head = models.CharField(max_length=100)
    

    def __str__(self):
        return self.name

class Event(models.Model):
    club = models.ForeignKey(Club, to_field='club_code', on_delete=models.CASCADE)
    event_name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    coordinator_name = models.CharField(max_length=100)
    event_pdf = models.URLField(blank=True, null=True)    # PDF Cloudinary URL
    event_image = models.URLField(blank=True, null=True)  # Image Cloudinary URL


    def __str__(self):
        return f"{self.event_name} ({self.club.name})"
  
    
