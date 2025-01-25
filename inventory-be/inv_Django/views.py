from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth.models import User
from core.models import UserProfile  # Corrected import
import jwt
import datetime

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            email = request.data.get('email')
            phone_num = request.data.get('phone_num')
            location = request.data.get('location')
            farm_name = request.data.get('farm_name')

            # Check if user exists
            if User.objects.filter(username=username).exists():
                return Response({
                    'error': 'Username already exists'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create user
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email
            )

            # Create user profile
            UserProfile.objects.create(
                user=user,
                phone_num=phone_num,
                location=location,
                farm_name=farm_name
            )

            # Generate token
            payload = {
                'user_id': user.id,
                'username': user.username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            return Response({
                'token': token,
                'message': 'Registration successful',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'phone_num': phone_num,
                    'location': location,
                    'farm_name': farm_name
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            try:
                profile = UserProfile.objects.get(user=user)
                payload = {
                    'user_id': user.id,
                    'username': user.username,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
                }
                token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
                return Response({
                    'token': token,
                    'user': {
                        'username': user.username,
                        'email': user.email,
                        'phone_num': profile.phone_num,
                        'location': profile.location,
                        'farm_name': profile.farm_name
                    }
                })
            except UserProfile.DoesNotExist:
                return Response({
                    'error': 'User profile not found'
                }, status=status.HTTP_404_NOT_FOUND)
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)