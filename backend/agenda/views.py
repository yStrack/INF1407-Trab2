from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from agenda.serializers import UserSerializer, EventSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from agenda.models import Event

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

class EventCreate(APIView):
    '''
    Requisição POST para a criação de um evento.
    '''
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format='json'):

        user_id = Token.objects.get(user=request.user).user_id
        data = {
            'title': request.data['title'],
            'beginDate': request.data['beginDate'],
            'endDate': request.data['endDate'],
            'owner': user_id
        }

        serializer = EventSerializer(data=data)

        if serializer.is_valid():
            event = serializer.save()
            if event:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Em caso de falhas
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventList(APIView):
    '''
    Requisição GET para a retornar todos eventos de um User.
    '''
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, format='json'):
        user_id = Token.objects.get(user=request.user).user_id

        serializer = EventSerializer(Event.objects.filter(owner=user_id), many=True)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Em caso de falhas
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)