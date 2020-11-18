from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=32, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8, write_only=True)

    '''
        Função responsável por criar um novo usuário
        Recebe:
            - validated_data: Dicionario com os campos validados para criar um usuario
    '''
    def create(self, validated_data):
        user = User.objects.create_user(username = validated_data['username'] ,email = validated_data['email'], password = validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')