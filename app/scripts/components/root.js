import React, {
  PropTypes,
} from 'react'
import { connect } from 'react-redux'

import actions from '../core/actions'

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
