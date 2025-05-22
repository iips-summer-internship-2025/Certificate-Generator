from django.contrib.auth.models import AbstractUser
from django.db import models
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
    certificate = models.URLField(max_length=200)
    certificate_id = models.CharField(max_length=6, primary_key=True)    # e.g., afs234
    email_id = models.EmailField(max_length=150)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.roll_no})"