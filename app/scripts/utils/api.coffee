_       = require "underscore"
Request = require "superagent"

getCookie = require "./getCookie"

getCSRFToken = -> getCookie("csrftoken")


API =
    get: (url, options={}) ->
        p = new Promise (resolve, reject) ->
            r = Request.get(url)

            for k, v of options.data
                if _(v).isArray()
                    _(v).each (item) -> r.query("#{k}[]", item)
                else
                    r.query("#{k}", v)

            url = r.url
            _(r._query).each (arg, i) ->
                url += "#{if i is 0 then "?" else "&"}#{arg}"

            r.accept("application/json")
                .on "error", -> reject("ERROR")
                .end (err, res) ->
                    if err or res.error
                        reject [err, res]
                    else
                        resolve(res)
        p.catch (error) -> console.error error


    del: (url, options={}) ->
        p = new Promise (resolve, reject) ->
            Request.del(url)
                .set "X-CSRFToken", getCSRFToken()
                .accept "application/json"
                .send options.data
                .on "error", -> reject("ERROR")
                .end (err, res) ->
                    if err or res.error
                        reject [err, res]
                    else
                        resolve(res)
        p.catch (error) -> console.error error


    post: (url, options={}) ->
        p = new Promise (resolve, reject) ->
            r = Request.post(url)

            _(options.files).each (file) ->
                console.log "FILE", file
                r.attach file.name, file.file, file.filename

            _(options.fields).each (field) ->
                console.log "FIELD", field
                r.field field.name, field.data

            if options.onProgress
                r.on "progress", options.onProgress

            r.set "X-CSRFToken", getCSRFToken()
                .accept "application/json"
                .send options.data
                .on "error", -> reject("ERROR")
                .end (err, res) ->
                    console.log "END"
                    if err or res.error
                        reject [err, res]
                    else
                        resolve(res)
        p.catch (error) -> console.error error


    put: (url, options={}) ->
        p = new Promise (resolve, reject) ->
            Request.put(url)
                .set "X-CSRFToken", getCSRFToken()
                .accept "application/json"
                .send options.data
                .on "error", -> reject("ERROR")
                .end (err, res) ->
                    if err or res.error
                        reject [err, res]
                    else
                        resolve(res)
        p.catch (error) -> console.error error


module.exports = API
