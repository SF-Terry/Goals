import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Topbar from '../component/Topbar'
import { modifyInnerState_listType, modifyInnerState_route, modifyInnerState_mode, modifyInnerState_email } from '../action/modifyInnerState'
import { setLocalStore, getLocalStore } from '../store/localStore'
import { storeName } from '../store/initialState'
import { showCaveat } from '../util/index'


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDayClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(1))
    },
    onWeekClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(2))
    },
    onMonthClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(3))
    },
    onProjectClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(4))
    },
    onYearClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(5))
    },
    onLongClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(6))
    },
    onNextDayClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(7))
    },
    onNextWeekClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(8))
    },
    onNextMonthClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(9))
    },
    onNextYearClick() {
      dispatch(modifyInnerState_route(0))
      dispatch(modifyInnerState_listType(10))
    },
    onTimelineClick() {
      dispatch(modifyInnerState_route(4))
      // change page mode to timeline
      dispatch(modifyInnerState_mode(2))
    },
    onRecycleClick() {
      dispatch(modifyInnerState_route(5))
    },
    onImportClick() {
      // show hint
      const hintConfirmResult = window.confirm(`It's adviced to backup current data before importing any data!`)

      // hint confirmed 
      if (hintConfirmResult) {
        let data = null

        // show importing prompt
        const importingPromptResult = window.prompt(`Please paste data you prefer to import`, ``)

        // data pasted
        if (importingPromptResult) {
          // check data
          const check = dataStr => {
            let result = false
            try { 
              data = JSON.parse(dataStr)
              result = typeof data === 'object' && data.targets != null
            } 
            catch (e) {
              
            } 
            return result 
          }
          const checkResult = check(importingPromptResult)

          // data is okay
          if (checkResult) {
            // set localstorage
            setLocalStore(data)
            // refresh
            location.href = location.href
          }
          // data is wrong
          if (!checkResult) {
            showCaveat(`Data's format was wrong!`)
          }
        }
      }
    },
    onExportClick() {
      // confirm exporting mail
      const { email } = ReduxStore.getState().innerState
      const promptEmailResult = window.prompt(`Please ${email ? 'confirm' : 'set'} email`, email || '')

      // email prompt confirmed
      if (promptEmailResult) {
        // save email
        dispatch(modifyInnerState_email(promptEmailResult))
        // show prompt
        const promptDataResult = window.prompt('Please copy data manually', JSON.stringify(getLocalStore()))
        // send email if data prompt confirmed 
        if (promptDataResult) {
          location.href = `mailto:${promptEmailResult}?subject=${moment().format("YYYY MMMM Do, dddd, h:mm:ss a")} By ${storeName}`;
        }
      }

    }
  }
}

const TopbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar)


export default TopbarContainer