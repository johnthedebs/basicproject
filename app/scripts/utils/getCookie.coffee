_ = require "underscore"


getCookie = (name) ->
    cookieValue = null
    if document.cookie && document.cookie != ""
        cookies = document.cookie.split(";")
        _(cookies).each (cookie) ->
            cookie = cookie.trim()
            # Does this cookie string begin with the name we want?
            if cookie.substring(0, name.length + 1) == (name + "=")
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
    return cookieValue


module.exports = getCookie
