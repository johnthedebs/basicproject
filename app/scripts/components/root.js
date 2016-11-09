import React from 'react'
import { connect } from 'react-redux'

import actions from '../core/actions'


export default connect(
    state => ({ todos: state.todos })
    ,
    dispatch =>
        ({
          addTodo() {
            return dispatch(actions.addTodo('hello world'))
          }
        })
)(React.createClass({
  displayName: 'Root',

  render() {
    return <div>{this.props.todos}<button onClick={this.props.addTodo}>add todo</button>{this.renderDevTools()}</div>
  },

  renderDevTools() {
    if (process.env.NODE_ENV === 'production') {
      return null
    } else {
      const DevTools = require('../utils/devtools')
      return <DevTools />
    }
  }
})
)
