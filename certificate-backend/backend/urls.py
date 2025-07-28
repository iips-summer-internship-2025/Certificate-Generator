# jwt_auth/urls.py
from django.contrib import admin
from django.urls import path , include 
from authority.views import CustomTokenObtainPairView, CustomTokenRefreshView, RegisterView
from authority import views
#from authority.views import test_id_generation
#from authority.views import accept_coords
from rest_framework.routers import DefaultRouter
#from authority.views import CertificateViewSet
from authority.views import  AdminUserAPIView, AdminUserDeleteAPIView
from authority.views import SuperuserChangePasswordView
from authority.views import ViewAdminUsersPost
from django.urls import path
from authority.views import ViewCertificatesAPI
from authority.views import CheckSuperuserStatusView  
from django.urls import path
from authority.views import ClubListCreateView 
from authority.views import EventUploadView
from authority.views import EventFilterView
from authority.views import EventDetailView
from authority.views import EventReportRedirect
from authority.views import EventPhotosView




from authority.views import ClubListCreateView
from django.conf import settings
from django.conf.urls.static import static
from authority.views import verify_certificate

# certificate_list = CertificateViewSet.as_view({'get': 'list'})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/upload/', views.upload_files, name='upload_files'),
    #path('test-id/', test_id_generation, name='test_id_generation'),
    path('api/verify/<str:certificate_id>/', views.verify_certificate, name='verify_certificate'),
    #path('show-qr/<str:certificate_id>/', views.show_qr, name='show-qr'),
    #path('api/coords', accept_coords, name='accept_coords'),
    #path('api/certificates/', include(router.urls)),
    #path('api/certificates/', certificate_list, name='certificate-list'),
    path('api/admin/change-password/', SuperuserChangePasswordView.as_view(), name='superuser_change_password'),
    path('api/admin/view-users/', ViewAdminUsersPost.as_view(), name='view_users_post'),
   # path('show-qr/<str:certificate_id>/', views.show_qr, name='show-qr'),
   # path('api/coords', accept_coords, name='accept_coords'),
   # path('api/certificates/', certificate_list, name='certificate-list'),
   # path('api/adminlist/', AdminListView.as_view(), name='admin-list'),
    #path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/crud-admins/', AdminUserAPIView.as_view(), name='admin_users'),
    path('api/crud-admins/delete/<str:username>/', AdminUserDeleteAPIView.as_view(), name='delete_admin_user'),
    path('api/certificates/', ViewCertificatesAPI.as_view(), name='view-certificates'),

    # path for searching:
    path('api/search/', views.search_certificates, name='search_certificates'),
    # path for checking superuser status
    # This endpoint can be used to check if the user is a superuser
    path('api/check-superuser/', CheckSuperuserStatusView.as_view(), name='check-superuser'),
    path('api/clubs/', ClubListCreateView.as_view(), name='club-list-create'),
    path('api/events/upload/', EventUploadView.as_view(), name='event-upload'),
    path('events/filter/', EventFilterView.as_view(), name='event-filter'),
    path('events/<int:pk>/', EventDetailView.as_view(),      name='event-detail'),
    path('events/<int:pk>/report/', EventReportRedirect.as_view(), name='event-report'),
    path('events/<int:pk>/photos/', EventPhotosView.as_view(),     name='event-photos'),
   # path('api/events/', EventListCreateView.as_view(), name='event-list-create'),

]
   