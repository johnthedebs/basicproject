import React, {
  PropTypes,
} from 'react'
import { connect } from 'react-redux'

import actions from '../core/actions'

let devTools = null

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('../utils/devtools') // eslint-disable-line

  devTools = <DevTools />
}


class Root extends React.Component {
  static displayName = 'Root'

  static propTypes = {
    todos: PropTypes.array,
    addTodo: PropTypes.func.isRequired,
  }

  render() {
    const {
      todos,
      addTodo,
    } = this.props

    return (
      <div>
        {todos}
        <button onClick={addTodo}>
          add todo
        </button>
        {devTools}
      </div>
    )
  }
}

export default connect(
  state => ({ todos: state.todos })
  ,
  dispatch =>
    ({
      addTodo() {
        return dispatch(actions.addTodo('hello world'))
      },
    })
)(Root)
