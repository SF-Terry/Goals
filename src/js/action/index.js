const ADD_TASK = 'ADD_TASK'
const MODIFY_SETTING = 'MODIFY_SETTING'

const tasks = ReduxStore.getState().tasks || []
const idArr = tasks.map(task => task.id)
let id = Math.max(...idArr)

/**
 * add task
 * @param {object} taskInfo 
 */
export const addTask = taskInfo => {
  return {
    type: ADD_TASK,
    task: {
      ...taskInfo,
      id: id
    }
  }
}



export const modifySetting = (key, value) => {
  return {
    type: MODIFY_SETTING,
    key,
    value
  }
}

