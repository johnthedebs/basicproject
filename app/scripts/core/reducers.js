import { handleActions } from 'redux-actions'


export default {
  todos: handleActions({
    ADD_TODO(state, action) {
      return [...state, action.payload]
    },

    RECEIVE_TODOS(state, action) {
      return action.payload
    },
  }, []),
}
