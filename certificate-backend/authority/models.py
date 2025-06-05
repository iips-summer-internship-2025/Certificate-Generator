from django.contrib.auth.models import AbstractUser
from django.db import models
import random
import string
from .utils import generate_unique_id



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
    roll_no = models.CharField(max_length=50)           # e.g., IT-2K22-45
    certificate = models.URLField(max_length=200)
    certificate_id = models.CharField(max_length=6, unique=True, primary_key=True, default=generate_unique_id, editable=False)    # e.g., afs234
    email_id = models.EmailField(max_length=150)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)

    #def __str__(self):
     #   return f"{self.name} ({self.roll_no})"




#class MyModel(models.Model):
 #   name = models.CharField(max_length=255)
  #  unique_id = models.CharField(max_length=6, unique=True, editable=False, default=generate_unique_id)

    
