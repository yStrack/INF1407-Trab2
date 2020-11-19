from django.urls import path
from . import views
from rest_framework.authtoken import views as authviews

urlpatterns = [
    path('register/', views.UserCreate.as_view(), name='user-create'),
    path('login/', authviews.obtain_auth_token)
]