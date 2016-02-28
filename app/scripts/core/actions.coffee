{ Promise }      = require "es6-promise"
{ createAction } = require "redux-actions"
Request          = require "superagent"

Api = require "../utils/api"


Actions =
    addTodo      : createAction "ADD_TODO"
    receiveTodos : createAction "RECEIVE_TODOS"

    fetchTodos : (dispatch) ->
        Api.get("/todos/")
            .then (res) ->
                todos = res.body.todos
                dispatch(Actions.receiveTodos(todos))
                return todos


module.exports = Actions
