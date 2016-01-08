{
    ADD_TODO
    RECEIVE_TODOS
} = require "./actions"


module.exports =
    todos: (state=[], action) ->
        switch action.type
            when ADD_TODO
                return [state..., action.todo]
            when RECEIVE_TODOS
                return action.todos
            else
                return state
