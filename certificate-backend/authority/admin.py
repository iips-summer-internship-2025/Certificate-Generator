from django.contrib import admin
#from .models import MyModel
from .models import CustomUser, Certificate
#from django.contrib.auth.admin import UserAdmin
admin.site.register(CustomUser)
admin.site.register(Certificate)
# Register your models here.

#admin.site.register(MyModel)