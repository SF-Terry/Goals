import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { modifyInnerState_route, modifyInnerState_mode } from '../action/modifyInnerState'
import { monthsMap } from '../store/initialState'
import Timeline from '../component/Timeline'


const mapStateToProps = state => {
  const targets = state.targets.filter(target => target.isCompleted && !target.isDeleted)

  /**
   * get timeline info
   * @param {} targets 
   */
  const getTimelineInfo = targets => {
    let timelineInfo = {}
    targets.map(target => {
      const { completeDate } = target
      const year = moment(completeDate).year()
      const monthNum = moment(completeDate).month() + 1
      const month = monthsMap.get(monthNum)
      const date = moment(completeDate).date() + 'st'

      timelineInfo[year] = timelineInfo[year] || {}
      let theYear = timelineInfo[year]
      theYear[month] = theYear[month] || {} 
      let theMonth = theYear[month]
      theMonth[date] = theMonth[date] || []
      let theDate = theMonth[date]
      theDate.push(target)
    })
    return timelineInfo
  }

  const timelineInfo = getTimelineInfo(targets)

  return {
    timelineInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBackClick() {
      // back to homepage
      dispatch(modifyInnerState_route(0))
      // change page mode to homepage
      dispatch(modifyInnerState_mode(1))
    }
  }
}

const TimelineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)


export default TimelineContainer