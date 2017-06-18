import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import InfoPanel from '../../component/InfoPanel/index'

import {
  modifyInnerState_route,
  modifyInnerState_prevLevel,
  modifyInnerState_tmpTarget_createFutureDate
} from '../../action/modifyInnerState'
import { modifyTarget } from '../../action/modifyTarget'
// import { getTargetById } from '../../util'

import decorate from './decorator'



const getTmpTarget = () => ReduxStore.getState().innerState.tmpTarget

/**
 * confirm button's click event
 */
const onConfirmClick = () => {
  // get temporary target 
  const { id } = getTmpTarget()
  // change the create future date of temporary target
  const isFutureType = [7, 8, 9, 10].some(n => getTmpTarget().type === n)
  if (isFutureType) {
    ReduxStore.dispatch(modifyInnerState_tmpTarget_createFutureDate(moment()))
  }
  // modify target
  Object.keys(getTmpTarget()).map(key => {
    // do not change id
    const isKeyNotId = key != 'id'
    isKeyNotId && ReduxStore.dispatch(modifyTarget({
      id,
      key,
      value: getTmpTarget()[key]
    }))
  })

  // jump route
  _jump(ReduxStore)

  // set previous level 
  const { level } = getTmpTarget()
  _setPrevLevel(ReduxStore, modifyInnerState_prevLevel, level)
  
}


const EditPageInfoPanelContainer = decorate({
  connect,
  InfoPanel,
  onConfirmClick,
  prop_onContinueAddClick: null
})

/**
 * jump route
 */
function _jump(ReduxStore) {
  const { prevRoute } = ReduxStore.getState().innerState
  const isTimeline = prevRoute === 4  
  const isRecycle = prevRoute === 5

  // timeline special situation
  if (isTimeline) {
    // route to timeline page
    return ReduxStore.dispatch(modifyInnerState_route(4))
  }

  // recycle special situation
  if (isRecycle) {
    // route to recycle page
    return ReduxStore.dispatch(modifyInnerState_route(5))
  }


  // route to home page
  ReduxStore.dispatch(modifyInnerState_route(0))
}


/**
 * set previous level 
 */
function _setPrevLevel(ReduxStore, modifyInnerState_prevLevel, level) {
  ReduxStore.dispatch(modifyInnerState_prevLevel(level))
}


export default EditPageInfoPanelContainer