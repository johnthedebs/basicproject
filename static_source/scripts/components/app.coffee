React       = require "react"
{ connect } = require "react-redux"

actions = require "../actions"


module.exports = connect(
    (state) ->
        todos: state.todos
)(React.createClass
    displayName: "App"

    render: ->
        <div>{@props.todos}</div>
)
