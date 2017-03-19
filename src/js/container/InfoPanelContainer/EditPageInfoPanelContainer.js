import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from '../../component/InfoPanel/index'

import {
  modifyInnerState_route,
  modifyInnerState_tmpTarget_name,
  modifyInnerState_tmpTarget_level
} from '../../action/modifyInnerState'

import decorate from './decorator'


const EditPageInfoPanelContainer = decorate({
  connect,
  InfoPanel,
  getName: () => ReduxStore.getState().innerState.tmpTarget.name,
  getLevel: () => ReduxStore.getState().innerState.tmpTarget.level,
  modifyName: modifyInnerState_tmpTarget_name,
  modifyLevel: modifyInnerState_tmpTarget_level,
  modifyRoute: modifyInnerState_route
})


export default EditPageInfoPanelContainer