import React from 'react'
import { connect } from 'react-redux'

import AddBtn from '../component/AddBtn'
import {
  modifyInnerState_route,
  modifyInnerState_tmpTarget
} from '../action/modifyInnerState'
import { targetModel } from '../store/initialState'

const mapStateToProps = (state) => {
  return {
    // prop: state.prop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * invoked when AddBtn is clicked
     */
    click: () => {
      // route to home page
      dispatch(modifyInnerState_route(1))
      // reset and initial temporary target
      dispatch(modifyInnerState_tmpTarget({
        ...targetModel
      }))
    }
  }
}

const AddBtnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBtn)


export default AddBtnContainer