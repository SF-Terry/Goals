import React from 'react'
import { connect } from 'react-redux'

import InfoPanel from '../../component/InfoPanel/index'

import decorate from './decorator'


/**
 * confirm button's click event
 */
const onConfirmClick = () => {
  
}

const EditPageInfoPanelContainer = decorate({
  connect,
  InfoPanel,
  onConfirmClick
})


export default EditPageInfoPanelContainer