_       = require "underscore"
superagent = require "superagent"


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

getCSRFToken = -> getCookie("csrftoken")


API =
    get: (options) ->
        r = request.get(options.url)

        for k, v of options.data
            if _(v).isArray()
                _(v).each (item) -> r.query("#{k}[]", item)
            else
                r.query("#{k}", v)

        url = r.url
        _(r._query).each (arg, i) ->
            url += "#{if i is 0 then "?" else "&"}#{arg}"

        r.accept("application/json")
            .on "error", -> console.log "ERROR"
            .end (err, res) ->
                if err or res.error
                    console.log "ERROR"
                else
                    options.callback(err, res)

    del: (options) ->
        request.del(options.url)
            .set "X-CSRFToken", getCSRFToken()
            .accept "application/json"
            .send options.data
            .on "error", -> console.log "REQUEST ERROR"
            .end (err, res) ->
                if err or res.error
                    console.log "ERROR"
                else
                    options.callback(err, res)

    post: (options) ->
        request.post(options.url)
            .set "X-CSRFToken", getCSRFToken()
            .accept "application/json"
            .send options.data
            .on "error", -> console.log "ERROR"
            .end (err, res) ->
                if err or res.error
                    console.log "ERROR"
                else
                    options.callback(err, res)

    put: (options) ->
        request.put(options.url)
            .set "X-CSRFToken", getCSRFToken()
            .accept "application/json"
            .send options.data
            .on "error", -> console.log "REQUEST ERROR"
            .end (err, res) ->
                if err or res.error
                    console.log "ERROR"
                else
                    options.callback(err, res)

module.exports = API
