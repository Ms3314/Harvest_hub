from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth.models import User
from core.models import UserProfile  # Corrected import
import jwt
import datetime
import logging

# Logger for error tracking
logger = logging.getLogger(__name__)

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            # Fetch data from the request
            username = request.data.get('username')
            password = request.data.get('password')
            email = request.data.get('email')
            phone_num = request.data.get('phone_num')
            location = request.data.get('location')
            farm_name = request.data.get('farm_name')

            # Check for missing fields
            missing_fields = [field for field in ['username', 'password', 'email', 'phone_num', 'location', 'farm_name'] if not request.data.get(field)]
            if missing_fields:
                return Response({'error': f'Missing fields: {", ".join(missing_fields)}'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if user already exists
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            # Create user
            user = User.objects.create_user(username=username, password=password, email=email)

            # Create user profile
            UserProfile.objects.create(
                user=user,
                phone_num=phone_num,
                location=location,
                farm_name=farm_name
            )

            # Generate JWT token
            payload = {
                'user_id': user.id,
                'username': user.username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token expiry set to 1 day
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            # Return success response with token and user data
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
            # Log the error for debugging
            logger.error(f"Error during registration: {str(e)}", exc_info=True)
            return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            # Fetch data from the request
            username = request.data.get('username')
            password = request.data.get('password')

            # Authenticate user
            user = authenticate(username=username, password=password)
            if user is not None:
                try:
                    # Retrieve user profile
                    profile = UserProfile.objects.get(user=user)
                    
                    # Generate JWT token
                    payload = {
                        'user_id': user.id,
                        'username': user.username,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token expiry set to 1 day
                    }
                    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

                    # Return success response with token and user profile
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
                    return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            # Log the error for debugging
            logger.error(f"Error during login: {str(e)}", exc_info=True)
            return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_400_BAD_REQUEST)
