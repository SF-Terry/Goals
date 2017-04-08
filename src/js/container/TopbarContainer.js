import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Topbar from '../component/Topbar'
import { modifyInnerState_listType, modifyInnerState_route, modifyInnerState_mode, modifyInnerState_email } from '../action/modifyInnerState'
import { setLocalStore, getLocalStore } from '../store/localStore'
import { storeName } from '../store/initialState'
import { showCaveat } from '../util/index'
import { confirmModal, promptModal } from '../util/modal'

const mapStateToProps = state => {
  return {
    listType: state.innerState.listType
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
      // show confirm: "It's adviced to backup current data before importing any data!"
      confirmModal.show({
        text: `It's adviced to backup current data before importing any data!`,
        modalConfirmed() {
          
          // show prompt: "Please paste data string to import"
          promptModal.show({
            text: `Please paste data to import`,
            modalConfirmed(inputValue) {
              // data to generate
              let data = null

              // check pasted data
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
              const checkResult = check(inputValue)

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
          })
        }
      })
    },
    onExportClick() {
      const { email } = ReduxStore.getState().innerState
      promptModal.show({
        text: `Please ${email ? 'confirm' : 'set'} email`,
        defaultValue: email,
        modalConfirmed(confirmedEmail) {
          // save email
          dispatch(modifyInnerState_email(confirmedEmail))

          // show prompt
          const data = getLocalStore()
          const dataStr = JSON.stringify(data)
          const isSupportExecCommand = !!document.execCommand
          const notion = isSupportExecCommand ? `The data was copied! Send to email?` : `Please copy data manually, and then send to email`
          promptModal.show({
            text: notion,
            defaultValue: dataStr,
            modalShowed() {
              $('#targetsManagement-prompt input').select()
              // copy value in input
              if (isSupportExecCommand) {
                document.execCommand('copy')
              }
            },
            modalConfirmed(confirmedEmail) {
              location.href = `mailto:${confirmedEmail}?subject=${moment().format("YYYY MMMM Do, dddd, h:mm:ss a")} By ${storeName}`;
            }
          })
        }
      })
    }
  }
}

const TopbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar)


export default TopbarContainer