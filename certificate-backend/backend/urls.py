# jwt_auth/urls.py
from django.contrib import admin
from django.urls import path , include 
from authority.views import CustomTokenObtainPairView, CustomTokenRefreshView, RegisterView
from authority import views
#from authority.views import test_id_generation
#from authority.views import accept_coords
from rest_framework.routers import DefaultRouter
# from authority.views import CertificateViewSet
from authority.views import AdminListView, ChangePasswordView, AdminUserAPIView, AdminUserDeleteAPIView

from authority.views import SuperuserChangePasswordView
from authority.views import ViewAdminUsersPost


# certificate_list = CertificateViewSet.as_view({'get': 'list'})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/admin-list/', views.AdminListView.as_view(), name='admin-list'),

    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/upload/', views.upload_files, name='upload_files'),
    #path('test-id/', test_id_generation, name='test_id_generation'),
    path('verify/<str:certificate_id>/', views.verify_certificate, name='verify_certificate'),
    #path('show-qr/<str:certificate_id>/', views.show_qr, name='show-qr'),
    #path('api/coords', accept_coords, name='accept_coords'),
    #path('api/certificates/', include(router.urls)),
    #path('api/certificates/', certificate_list, name='certificate-list'),
    path('api/admin/change-password/', SuperuserChangePasswordView.as_view(), name='superuser_change_password'),
    path('api/admin/view-users/', ViewAdminUsersPost.as_view(), name='view_users_post'),
    # path('show-qr/<str:certificate_id>/', views.show_qr, name='show-qr'),
    # path('api/coords', accept_coords, name='accept_coords'),
    # path('api/certificates/', certificate_list, name='certificate-list'),
    path('api/adminlist/', AdminListView.as_view(), name='admin-list'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/crud-admins/', AdminUserAPIView.as_view(), name='admin_users'),
    path('api/crud-admins/delete/<str:username>/', AdminUserDeleteAPIView.as_view(), name='delete_admin_user'),


    # path for searching:
    path('api/search/', views.search_certificates, name='search_certificates'),

    # path for super admin to view certificates
    path('api/certificates-latest/', views.latest_certificates.as_view(), name='latest_certificates'),
]