import { targetModel } from '../store/initialState'


const target = (state = { ...targetModel }, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...initialTarget,
        ...action.target
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

const targets = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        target(undefined, action)
      ]
    case 'MODIFY_TASK':
      return state.map(target => {
        if (target.id === action.id) {
          return target(target, action)
        }
        return target
      })
  }
}


export default targets