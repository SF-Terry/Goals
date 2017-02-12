import { initialSetting } from '../util/initialState'
import { checkSettingKey } from '../util/validator'


const setting = (state = { ...initialSetting }, action) => {
  switch (action.type) {
    case 'MODIFY_SETTING':
      const {key, value} = action
      if (checkSettingKey(key)) {
        return {
          ...state,
          [action.key]: action.value
        }
      }
  }
}

export default setting