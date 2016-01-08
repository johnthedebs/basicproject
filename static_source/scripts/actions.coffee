{ Promise } = require "es6-promise"

Request = require "superagent"


ADD_TODO      = "ADD_TODO"
FETCH_TODOS   = "FETCH_TODOS"
RECEIVE_TODOS = "RECEIVE_TODOS"


addTodo = (todo) ->
    type : ADD_TODO
    todo : todo


fetchTodos = (dispatch) ->
    req = new Promise (resolve, reject) ->
        Request.get("/todos/")
            .on "error", -> reject("ON ERROR")
            .end (err, res) ->
                if err or res.error
                    reject err, res
                else
                    todos = res.body.todos
                    dispatch(receiveTodos(todos))
                    resolve(todos)
    req.catch (error) -> console.error error
    return req


receiveTodos = (todos) ->
    type   : RECEIVE_TODOS
    todos : todos


module.exports =
    ADD_TODO            : ADD_TODO
    FETCH_TODOS         : FETCH_TODOS
    RECEIVE_TODOS       : RECEIVE_TODOS

    addTodo          : addTodo
    fetchTodos       : fetchTodos
    receiveTodos     : receiveTodos
