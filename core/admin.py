from django.contrib import admin
from .models import Counter


@admin.register(Counter)
class CounterAdmin(admin.ModelAdmin):
    list_display = ('value', 'updated_at', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-updated_at',)
