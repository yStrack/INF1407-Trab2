from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required = True, validators = [UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8)

    '''
        Função responsável por criar um novo usuário
        Recebe:
            - validated_data: Dicionario com os campos validados para criar um usuario
    '''
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'], validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'email', 'password')