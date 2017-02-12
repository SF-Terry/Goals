import { initialTask } from '../util/initialState'


const task = (state = { ...initialTask }, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...initialTask,
        ...action.task
      }
    case 'MODIFY_TASK':
      const {key, value} = action
      if (state) {
        return {
          ...state,
          [action.key]: action.value
        }
      }
  }
}

const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        task(undefined, action)
      ]
    case 'MODIFY_TASK':
      return state.map(task => {
        if (task.id === action.id) {
          return task(task, action)
        }
        return task
      })
  }
}


export default tasks