from django.shortcuts import render


def app(request, path=None):
    return render(request, "app.html", {})
