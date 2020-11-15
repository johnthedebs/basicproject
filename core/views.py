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


def error_403(request, exception=None, reason="", template_name="403.html"):
    data = {}
    response = render(request, template_name, data)
    response.status_code = 403
    return response


def error_404(request, exception=None, template_name="404.html"):
    data = {}
    response = render(request, template_name, data)
    response.status_code = 404
    return response


def error_500(request, *args, **kwargs):
    data = {}
    response = render(request, "500.html", data)
    response.status_code = 500
    return response
