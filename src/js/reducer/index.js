import { getLocalStore } from '../store/localStore'
import targets from './targets.js'
import setting from './setting.js'
import { initialSetting } from '../store/initialState'


const localStore = getLocalStore() || {}

const targetsManagement = (state = localStore, action) => {
  return {
    targets: targets(setting.tasks, action),
    setting: setting(state.setting, action)    
  }
}

export default targetsManagement