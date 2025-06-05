# jwt_auth/urls.py

from django.contrib import admin
from django.urls import path
from authority.views import CustomTokenObtainPairView, CustomTokenRefreshView, RegisterView
from authority import views
from authority.views import test_id_generation
from authority.views import test_cloudinary_upload
#from authority.views import UploadCertificatesView # added for test
from authority.views import UploadCertificatesView

from authority.views import accept_coords

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    #path('api/upload/', views.upload_files, name='upload_files'),
    path('api/test-id/', views.test_id_generation, name='test_id_generation'),
    path('api/test-upload/', test_cloudinary_upload, name='test_cloudinary_upload'),
    path('api/upload-certificates/', UploadCertificatesView.as_view(), name='upload_certificates'),# added for test
    path('api/coords', accept_coords, name='accept_coords'),
   ]