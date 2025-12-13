from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailOTPBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)
        
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None

        # Verify OTP
        if user.verify_otp(password):
            return user
        
        # Fallback to standard password if OTP doesn't match?
        # For this specific requirement, we prioritize OTP. 
        # But if we want to allow password fallback:
        # if user.check_password(password):
        #     return user
            
        return None
