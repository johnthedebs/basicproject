from django.contrib.auth import get_user_model
from django.shortcuts    import render

from rest_framework import viewsets

from .serializers import UserSerializer


User = get_user_model()


def app(request, path=None):
    return render(request, "app.html", {})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
