from datetime import datetime

from django.contrib.auth.base_user import BaseUserManager
# from django.contrib.auth.models import User


class UserManager(BaseUserManager):
    def create_user(self, userid,  name, password=None):
        if not name and not userid:
            raise ValueError('must have user information')
        user = self.model(
            username=None,
            userid=userid,
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userid, name, password):
        user = self.create_user(
            userid,
            name,
            password=password
        )
        user.is_admin = True
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.activeAt = datetime.now()
        user.save(using=self._db)
        return user

