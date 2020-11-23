from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from agenda.serializers import UserSerializer, EventSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from agenda.models import Event
from django.http import Http404

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

        # user_id = Token.objects.get(user=request.user).user_id
        user_id = Token.objects.get(key=request.auth.key).user_id
        endDate = request.data.get("endDate", request.data["beginDate"])
        data = {
            'title': request.data['title'],
            'beginDate': request.data['beginDate'],
            'endDate': endDate,
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
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    def get(self, request, format='json'):
        # user_id = Token.objects.get(user=request.user).user_id
        user_id = Token.objects.get(key=request.auth.key).user_id

        serializer = EventSerializer(Event.objects.filter(owner=user_id), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EventDelete(APIView):
    '''
    Requisição GET para a retornar todos eventos de um User.
    '''
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    def get_object(self, id, owner):
        try:
            event = Event.objects.filter(id=id, owner=owner)
            if len(event) == 0 or len(event) > 1:
                raise Event.DoesNotExist
            return event.first()
        except Event.DoesNotExist:
            raise Http404

    def put(self, request, id, format=None):
        # Recuperando o evento desejado
        # user_id = Token.objects.get(user=request.user).user_id
        user_id = Token.objects.get(key=request.auth.key).user_id
        event = self.get_object(id, user_id)
        
        # Criando data com todos os campos
        endDate = request.data.get("endDate", request.data["beginDate"])
        data = {
            'title': request.data['title'],
            'beginDate': request.data['beginDate'],
            'endDate': endDate,
            'owner': user_id
        }

        # Atualizando evento
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        # Em caso de erro
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format='json'):
        # user_id = Token.objects.get(user=request.user).user_id
        user_id = Token.objects.get(key=request.auth.key).user_id
        event = self.get_object(id, user_id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)