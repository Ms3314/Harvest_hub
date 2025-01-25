from django.contrib import admin
from django.urls import path, include
from .views import LoginView, RegisterView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),



]
     # Include the app's URLs
