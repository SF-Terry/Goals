import React from 'react'
import { connect } from 'react-redux'

import TimeSelector from '../component/InfoPanel/TimeSelector/index'
import { 
  modifyInnerState_route,
  modifyInnerState_timeType,
  modifyInnerState_tmpTarget_startDate,
  modifyInnerState_tmpTarget_endDate,
  modifyInnerState_tmpTarget_minDate,
  modifyInnerState_tmpTarget_maxDate
} from '../action/modifyInnerState'


const mapStateToProps = state => {
  return {
    timeType: state.innerState.timeType,
    type: state.innerState.tmpTarget.type,
    minDate: state.innerState.tmpTarget.minDate,
    maxDate: state.innerState.tmpTarget.maxDate,
    startDate: state.innerState.tmpTarget.startDate,
    endDate: state.innerState.tmpTarget.endDate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * start time button's click event
     */
    onStartTimeClick() {
      // change time type to 'startTime'
      dispatch(modifyInnerState_timeType(1))
    },
    /**
     * start time button's click event
     */
    onEndTimeClick() {
      // change time type to 'startTime'
      dispatch(modifyInnerState_timeType(2))
    },
    /**
     * confirm button's click event
     */
    onConfirmClick({
      startDate,
      endDate,
      minDate,
      maxDate
    }) {
      // change start date of temporary target 
      dispatch(modifyInnerState_tmpTarget_startDate(startDate))
      // change end date of temporary target 
      dispatch(modifyInnerState_tmpTarget_endDate(endDate))
      // change minimum date of temporary target 
      dispatch(modifyInnerState_tmpTarget_minDate(minDate))
      // change maximum date of temporary target 
      dispatch(modifyInnerState_tmpTarget_maxDate(maxDate))
      // route to adding Page info panel
      const prevRoute = ReduxStore.getState().innerState.prevRoute
      dispatch(modifyInnerState_route(prevRoute))
    },
    /**
     * cancel button's click event
     */
    onCancelClick() {
      // route to adding Page info panel
      const prevRoute = ReduxStore.getState().innerState.prevRoute
      dispatch(modifyInnerState_route(prevRoute))
    }
  }
}

const TimeSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(TimeSelector)


export default TimeSelectorContainer