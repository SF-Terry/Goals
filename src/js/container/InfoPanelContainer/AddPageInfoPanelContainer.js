import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from '../../component/InfoPanel/index'

import {
  modifyInnerState_route,
  modifyInnerState_tmpTarget_name,
  modifyInnerState_tmpTarget_level,
  modifyInnerState_tmpTarget_type,
  modifyInnerState_tmpTarget_isTiming,
  modifyInnerState_tmpTarget_isRepeating
} from '../../action/modifyInnerState'

import decorate from './decorator'


const AddPageInfoPanelContainer = decorate({
  connect,
  InfoPanel,
  getName: () => ReduxStore.getState().innerState.tmpTarget.name,
  getLevel: () => ReduxStore.getState().innerState.tmpTarget.level,
  getType: () => ReduxStore.getState().innerState.tmpTarget.type,
  getIsTiming: () => ReduxStore.getState().innerState.tmpTarget.isTiming,
  getIsRepeating: () => ReduxStore.getState().innerState.tmpTarget.isRepeating,
  modifyRoute: modifyInnerState_route,
  modifyName: modifyInnerState_tmpTarget_name,
  modifyLevel: modifyInnerState_tmpTarget_level,
  modifyType: modifyInnerState_tmpTarget_type,
  modifyIsTiming: modifyInnerState_tmpTarget_isTiming,
  modifyIsRepeating: modifyInnerState_tmpTarget_isRepeating
})


export default AddPageInfoPanelContainer