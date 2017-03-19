import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from '../../component/InfoPanel/index'

import {
  addTarget
} from '../../action'
import {
  modifyInnerState_route,
  modifyInnerState_tmpTarget
} from '../../action/modifyInnerState'

import { targetModel } from '../../store/initialState'
import decorate from './decorator'


/**
 * confirm button's click event
 */
const onConfirmClick = () => {
  // add target
  const { tmpTarget } = ReduxStore.getState().innerState
  ReduxStore.dispatch(addTarget(tmpTarget))

  // route to home page
  ReduxStore.dispatch(modifyInnerState_route(0))
}

/**
 * continute to add button's click event
 */
const onContinueAddClick = () => {
  // add target
  const { tmpTarget } = ReduxStore.getState().innerState
  ReduxStore.dispatch(addTarget(tmpTarget))

  // reset temporary target
  ReduxStore.dispatch(modifyInnerState_tmpTarget({
    ...targetModel
  }))
}

const AddPageInfoPanelContainer = decorate({
  connect,
  InfoPanel,
  onConfirmClick,
  onContinueAddClick
})


export default AddPageInfoPanelContainer