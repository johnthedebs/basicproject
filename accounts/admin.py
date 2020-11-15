from django.contrib      import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.forms import UserCreationForm

from accounts.forms import UserChangeForm

User = get_user_model()


USERNAME_FIELD = User.USERNAME_FIELD

REQUIRED_FIELDS = (USERNAME_FIELD,) + tuple(User.REQUIRED_FIELDS)

BASE_FIELDS = (None, {
    "fields": REQUIRED_FIELDS + ("password",),
})

CUSTOM_FIELDS = ("Custom Fields", {
    "fields": (
        "full_name",
        "preferred_name",
    ),
})

PERMISSION_FIELDS = ("Permissions", {
    "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions", ),
})

DATE_FIELDS = ("Important dates", {
    "fields": ("last_login", "date_joined",),
})


class StrippedUserAdmin(DjangoUserAdmin):
    # The forms to add and change user instances
    add_form_template = None
    add_form = UserCreationForm
    form = UserChangeForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ("is_active", USERNAME_FIELD, "is_superuser", "is_staff",)
    list_display_links = (USERNAME_FIELD,)
    list_filter = ("is_superuser", "is_staff", "is_active",)
    fieldsets = (
        BASE_FIELDS,
        PERMISSION_FIELDS,
    )
    add_fieldsets = (
        (None, {
            "fields": REQUIRED_FIELDS + (
                "password1",
                "password2",
            ),
        }),
    )
    search_fields = (USERNAME_FIELD,)
    ordering = None
    filter_horizontal = tuple()
    readonly_fields = ("last_login", "date_joined")


class SiteUserAdmin(StrippedUserAdmin):
    fieldsets = (
        BASE_FIELDS,
        CUSTOM_FIELDS,
        PERMISSION_FIELDS,
        DATE_FIELDS,
    )

    filter_horizontal = ("groups", "user_permissions",)


admin.site.register(User, SiteUserAdmin)
