import { modifyInnerState_shouldShowCaveat } from '../action/modifyInnerState'

import { showCaveat } from './index'


const nameInvalidMsg = 'Target name is empty!'


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
    
  }
}


export default validator