from django.urls import path
from . import views
from rest_framework.authtoken import views as authviews
from django.contrib.auth.models import User

urlpatterns = [
    path('register/', views.UserCreate.as_view(), name='user-create'),
    path('login/', authviews.obtain_auth_token),
    path('register-event/', views.EventCreate.as_view(), name='event-create')
]