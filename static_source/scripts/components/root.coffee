React       = require "react"
{ connect } = require "react-redux"

actions = require "../core/actions"


module.exports = connect(
    (state) ->
        todos: state.todos
    ,
    (dispatch) ->
        addTodo: ->
            dispatch actions.addTodo("hello world")
)(React.createClass
    displayName: "Root"

    render: ->
        <div>
            {@props.todos}
            <button onClick={@props.addTodo}>
                add todo
            </button>
        </div>
)
