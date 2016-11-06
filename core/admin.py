from django.contrib      import admin
from django.contrib.auth import get_user_model

from authtools.admin     import (
    UserAdmin,
    ADVANCED_PERMISSION_FIELDS,
    BASE_FIELDS,
    DATE_FIELDS,
)


User = get_user_model()


CUSTOM_FIELDS = ("Custom Fields", {
    "fields": (
        "full_name",
        "preferred_name",
    ),
})

class SiteUserAdmin(UserAdmin):
    fieldsets = (
        BASE_FIELDS,
        CUSTOM_FIELDS,
        ADVANCED_PERMISSION_FIELDS,
        DATE_FIELDS,
    )


admin.site.register(User, SiteUserAdmin)
