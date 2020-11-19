from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from agenda.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserCreate(APIView):
    """ 
    Requisição POST para a criação do usuário.
    """
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        
        # Em caso de sucesso
        if serializer.is_valid():
            user = serializer.save()
            if user:
                # Após registro, token p/ autenticacao é retornado
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        
        # Em caso de falhas
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
