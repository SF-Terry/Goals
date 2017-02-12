import { getLocalStore } from '../util/localStore'

const ADD_TASK = 'ADD_TASK'
const MODIFY_TASK = 'MODIFY_TASK'
const ADD_SETTING = 'ADD_SETTING'
const MODIFY_SETTING = 'MODIFY_SETTING'

const {tasks} = getLocalStore()
const idArr = tasks.map(task => task.id)
let id = Math.max(...idArr)

const addTask = (taskInfo) => {
  return {
    type: ADD_TASK,
    task: {
      ...taskInfo,
      id: id
    }
  }
}

const modifyTask = ({id, key, value}) => {
  return {
    type: MODIFY_TASK,
    id,
    key,
    value
  }
}

const modifySetting = (key, value) => {
  return {
    type: MODIFY_SETTING,
    key,
    value
  }
}