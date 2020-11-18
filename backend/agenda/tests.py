# Create your tests here.
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status

class AccountsTest(APITestCase):
    def setUp(self):
        # Criando um usuario padrão. 
        self.test_user = User.objects.create_user('testuser', 'test@example.com', 'testpassword')

        # URL para criar usuarios.
        self.create_url = reverse('user-create')

    def test_create_user(self):
        """
        Garantindo que podemos criar um novo user e um token valido eh criado com ele.
        """
        data = {
            'username': 'test1',
            'email': 'test1@example.com',
            'password': 'test1password'
        }

        response = self.client.post(self.create_url , data, format='json')
        # Garantindo que tem 2 users no BD
        self.assertEqual(User.objects.count(), 2)
        # Response devolve http 201
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Garantindo que devolve o email correto e a senha não é enviada na response
        self.assertEqual(response.data['email'], data['email'])
        self.assertFalse('password' in response.data)

    '''
    Testes com password
    '''
    def test_create_user_with_short_password(self):
        """
        Garantindo que user não é criado com senha menor que 8.
        """
        data = {
                'username': 'test2',
                'email': 'test2@example.com',
                'password': 'test2'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_no_password(self):
        """
        Garantindo que user não é criado sem mandar senha.
        """
        data = {
                'username': 'test3',
                'email': 'test3@example.com',
                'password': ''
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['password']), 1)

    '''
    Testes com username
    '''
    def test_create_user_with_too_long_username(self):
        '''
        Garantindo que usernames muito longos não são aceitos
        '''
        data = {
            'username': 'test4'*30,
            'email': 'test4@example.com',
            'password': 'test4password'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_no_username(self):
        '''
        Garantindo que não é possível criar um user sem nome
        '''
        data = {
                'username': '',
                'email': 'test5@example.com',
                'password': 'test5password'
                }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_preexisting_username(self):
        '''
        Garantindo que não é possível criar um user com o nome igual a outro.
        '''
        data = {
                'username': 'testuser',
                'email': 'user@example.com',
                'password': 'testuser'
                }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['username']), 1)

    '''
    Testes com email
    '''
    def test_create_user_with_preexisting_email(self):
        '''
        Garantindo que não é possível criar um user com o email igual a outro.
        '''
        data = {
            'username': 'test6',
            'email': 'test@example.com',
            'password': 'test6password'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_invalid_email(self):
        '''
        Garantindo que não é possível criar um user com o email invalido.
        '''
        data = {
            'username': 'test7',
            'email':  'testing',
            'passsword': 'test7password'
        }


        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_no_email(self):
        '''
        Garantindo que não é possível criar um user sem email.
        '''
        data = {
                'username' : 'test8',
                'email': '',
                'password': 'test8password'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)