from django.views.generic.simple import direct_to_template


def index(request, template_name="index.html"):
    return direct_to_template(request, template_name, extra_context={})
