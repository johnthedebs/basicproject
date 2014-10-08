# Based on code from: https://docs.djangoproject.com/en/dev/ref/contrib/csrf/

csrfSafeMethod = (method) ->
    # these HTTP methods do not require CSRF protection
    (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))

$.ajaxSetup
    crossDomain: false # obviates need for sameOrigin test
    beforeSend: (xhr, settings) ->
        if not csrfSafeMethod(settings.type)
            xhr.setRequestHeader "X-CSRFToken", window.CSRF_TOKEN
