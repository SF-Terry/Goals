import React from 'react'
import { connect } from 'react-redux'

import ListItem  from '../component/ListItem'
import { modifyInnerState_route, modifyInnerState_tmpTarget, modifyInnerState_shouldShowListItemModal, modifyInnerState_targetInListItemModal } from '../action/modifyInnerState'

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTap(item) {
      // change temporary target
      dispatch(modifyInnerState_tmpTarget(item))
      // route to add page
      dispatch(modifyInnerState_route(2))
    },
    onPress(item) {
      // set target
      dispatch(modifyInnerState_targetInListItemModal(item))
      // show modal
      dispatch(modifyInnerState_shouldShowListItemModal(true))
    }
  }
} 

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem)


export default ListItemContainer