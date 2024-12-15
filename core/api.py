from ninja import NinjaAPI
from django.shortcuts import get_object_or_404
from .models import Counter

api = NinjaAPI()

@api.get("/counter")
def get_counter(request):
    counter = Counter.objects.first()
    if not counter:
        counter = Counter.objects.create()
    return {"value": counter.value}

@api.post("/counter/increment")
def increment_counter(request):
    counter = Counter.objects.first()
    if not counter:
        counter = Counter.objects.create()
    counter.value += 1
    counter.save()
    return {"value": counter.value} 