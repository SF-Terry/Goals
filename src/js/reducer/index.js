import { getLocalStore } from '../util/localStore'
import tasks from './tasks.js'
import setting from './setting.js'
import { initialSetting } from '../util/initialState'


const localStore = getLocalStore() || {}

const targetsManagement = (state = localStore, action) => {
  return {
    tasks: tasks(setting.tasks, action),
    setting: setting(state.setting, action)    
  }
}

export default targetsManagement