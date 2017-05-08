import moment from 'moment'

import settleRepeatingTargets from './settleRepeatingTargets'



/**
 * auto update targets
 * @param {number} interval
 */
const autoUpdateTargets = timeInterval => {
  const getTargets = () => ReduxStore.getState().targets
  const targets = getTargets()
  

  /**
   * settle repeating target
   * @param {object} target 
   */
  const settleRepeatingTarget = target => {
    
  }

  // settle repeating target every 'timeInterval' millisconds
  setInterval(() => {
      // update target by its repeating propery
      settleRepeatingTargets(targets)
  }, timeInterval)

}

export default autoUpdateTargets