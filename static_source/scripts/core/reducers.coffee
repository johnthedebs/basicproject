{ handleActions } = require "redux-actions"


module.exports =
    todos: handleActions {
            ADD_TODO: (state, action) ->
                [state..., action.payload]

            RECEIVE_TODOS: (state, action) ->
                action.payload
        }, []
