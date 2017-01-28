import React from 'react'
import { connect } from 'react-redux'

import actions from '../core/actions'

let devTools = null

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('../utils/devtools') // eslint-disable-line

  devTools = <DevTools />
}


const Root = React.createClass({
  displayName: 'Root',

  propTypes: {
  },

  render() {
    return (
      <div>
        {this.props.todos}
        <button onClick={this.props.addTodo}>
          add todo
        </button>
        {devTools}
      </div>
    )
  }
})

export default connect(
  state => ({ todos: state.todos })
  ,
  dispatch =>
    ({
      addTodo() {
        return dispatch(actions.addTodo('hello world'))
      }
    })
)(Root)
