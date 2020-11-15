from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.mail import send_mail
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField("full name", max_length=255, blank=True)
    preferred_name = models.CharField("preferred name", max_length=255, blank=True)
    email = models.EmailField("email address", max_length=255, unique=True)
    is_staff = models.BooleanField("staff status", default=False,
        help_text="Designates whether the user can log into this admin site.")
    is_active = models.BooleanField("active", default=True,
        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.")
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ["email"]

    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        return self.preferred_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Sends an email to this User."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
