import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from '../../component/InfoPanel/index'

import { modifyInnerState_route, modifyInnerState_prevLevel } from '../../action/modifyInnerState'
import { modifyTarget } from '../../action/modifyTarget'
// import { getTargetById } from '../../util'

import decorate from './decorator'


/**
 * confirm button's click event
 */
const onConfirmClick = () => {
  // get temporary target 
  const { tmpTarget } = ReduxStore.getState().innerState
  const { id } = tmpTarget
  // modify target
  Object.keys(tmpTarget).map(key => {
    ReduxStore.dispatch(modifyTarget({
      id,
      key,
      value: tmpTarget[key]
    }))
  })
  // route to home page
  ReduxStore.dispatch(modifyInnerState_route(0))
  // set previous level 
  ReduxStore.dispatch(modifyInnerState_prevLevel(tmpTarget.level))
}

const EditPageInfoPanelContainer = decorate({
  connect,
  InfoPanel,
  onConfirmClick
})


export default EditPageInfoPanelContainer