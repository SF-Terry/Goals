import { modifyInnerState_shouldShowCaveat } from '../action/modifyInnerState'

import { showCaveat } from './index'


const nameInvalidMsg = 'Target name is empty!'
const timeSelectorInvalidMsg = 'Start time cannot be later than end time!'


const validator = {
  // validate the target
  target(target) {
    const t = target
    const isNameInValid = t.name === ''
    // if name is invalid, show caveat
    if (isNameInValid) {
      showCaveat(nameInvalidMsg)
      return false
    } else {
     return true 
    }
  },
  // validate dates of time selector
  timeSelector(startDate, endDate) {
    const isValid = startDate.isSameOrBefore(endDate)
    // if validation is failed, show caveat
    if (!isValid) {
      showCaveat(timeSelectorInvalidMsg)
    }
    return isValid
  }
}


export default validator