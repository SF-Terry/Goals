import { initialSetting, initialTask } from '../util/global'

const validator = {
  /**
   * check task(with valid key)
   */
  checkTaskKey(task, key) {
    return task[key] != undefined
  },

  /**
   * check setting(with valid key)
   */
  checkSettingKey(setting, key) {
    return setting[key] != undefined
  }
}

export default validator