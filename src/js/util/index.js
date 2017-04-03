import moment from 'moment'
import { getLocalStore, setLocalStore } from '../store/localStore'
import $ from './jQuery'

import { modifyInnerState_shouldShowCaveat } from '../action/modifyInnerState'

/**
 * @var {number}
 * timer for hiding caveat
 */
let caveatTimer = null

/**
 * console the dispatching and state info
 */
export const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

/**
 * Sync the localStorage
 */
export const setStateToLocalStore = store => next => action => {
  let result = next(action)
  // save state to localStorage
  setLocalStore(store.getState())

  // Console
  // console.log('before localStorage state: ', store.getState())
  console.log('localStorage: ', getLocalStore())
  return result
}

/**
 * hide component
 * @param {boolean} bool 
 */
export const hide = bool => ({
  width: bool ? '0px' : '100%',
  height: bool ? '0px' : 'auto',
  overflow: 'hidden'
})

/**
 * get new reverse map
 */
export const getReverseMap = map => {
  const arr = [...map.entries()]
  const newContructor = arr.map(subArr => subArr.reverse())
  return new Map(newContructor)
}


/**
 * show caveat message
 */
export const showCaveat = msg => {
  GV.caveat = msg

  const showCaveat = () => ReduxStore.dispatch(modifyInnerState_shouldShowCaveat(true))
  const hideCaveat = () => ReduxStore.dispatch(modifyInnerState_shouldShowCaveat(false))

  // show caveat
  showCaveat()

  // hide caveat
  if (caveatTimer) {
    clearInterval(caveatTimer)
  }
  caveatTimer = setTimeout(() => {
    hideCaveat()
  }, 1200)

}

/**
 * get timing info
 * @param {moment} startDate
 * @param {moment} endDate
 */
export const getTimingInfo = (startDate, endDate) => {
  const isBefore = moment().isSameOrBefore(startDate);
  const isDoing = moment().isAfter(startDate) && moment().isSameOrBefore(endDate);
  const isAfter = moment().isAfter(endDate);

  if (isBefore) {
    const s = moment().to(startDate, true);
    return s.replace(/ /g, "") + '后开始';
  }
  if (isDoing) {
    const s = moment().to(endDate, true);
    return s.replace(/ /g, "") + '后结束';
  }
  if (isAfter) {
    const s = moment().to(endDate, true);
    return '超时' + s.replace(/ /g, "");
  }
}

/**
 * get target by id
 * @param {string} id
 */
export const getTargetById = id => {
  return ReduxStore.getState().targets.filter( target => target.id === id )[0]
}