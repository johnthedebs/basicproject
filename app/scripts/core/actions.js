import { createAction } from 'redux-actions'

import Api from '../utils/api'


const Actions = {
  addTodo: createAction('ADD_TODO'),
  receiveTodos: createAction('RECEIVE_TODOS'),

  fetchTodos(dispatch) {
    return Api.get('/todos/')
            .then((res) => {
              const { todos } = res.body
              dispatch(Actions.receiveTodos(todos))
              return todos
            })
  },
}


export default Actions
