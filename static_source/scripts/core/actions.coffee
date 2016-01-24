{ Promise }      = require "es6-promise"
{ createAction } = require "redux-actions"
Request          = require "superagent"


module.exports =
    addTodo      : createAction "ADD_TODO"
    receiveTodos : createAction "RECEIVE_TODOS"

    fetchTodos : (dispatch) ->
        req = new Promise (resolve, reject) ->
            Request.get("/todos/")
                .on "error", -> reject("ON ERROR")
                .end (err, res) ->
                    if err or res.error
                        reject err, res
                    else
                        todos = res.body.todos
                        # TODO: Does @ refer to this object?
                        dispatch(@receiveTodos(todos))
                        resolve(todos)
        req.catch (error) -> console.error error
        return req
