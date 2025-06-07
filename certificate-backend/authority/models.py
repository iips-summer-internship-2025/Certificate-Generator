from django.contrib.auth.models import AbstractUser
from django.db import models
import random
import string
from .utils import generate_unique_id



#table 1
class CustomUser(AbstractUser):

     ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('superadmin', 'Super Admin'),
        ('user', 'User'),
    )
     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
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
    certificate_id = models.CharField(max_length=6, primary_key=True)    # e.g., afs234
    email_id = models.EmailField(max_length=150)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)

   
    
