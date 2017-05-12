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
    ReduxStore.dispatch(modifyTarget({
      id,
      key,
      value: getTmpTarget()[key]
    }))
  })
  
  // route to home page
  ReduxStore.dispatch(modifyInnerState_route(0))
  // set previous level 
  ReduxStore.dispatch(modifyInnerState_prevLevel(getTmpTarget().level))
}

const EditPageInfoPanelContainer = decorate({
  connect,
  InfoPanel,
  onConfirmClick
})


export default EditPageInfoPanelContainer