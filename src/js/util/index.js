import { getLocalStore, setLocalStore } from '../store/localStore'


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
  width: bool ? '100%' : '0px',
  height: bool ? 'auto' : '0px',
  overflow: 'hidden'
})