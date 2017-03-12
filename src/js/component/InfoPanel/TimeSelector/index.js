import React from 'react'
import { Button, Grid } from 'semantic-ui-react'
const { Row, Column } = Grid
import moment from 'moment'
import { hide } from '../../../util'

import Timepicker from './TimePicker'



let startDate, endDate, minDate, maxDate

/**
 * get min date by targetType
 * @param {number} targetType 
 */
const getMinDate = targetType => {
  switch (targetType) {
    case 1:
      // today
      return moment().startOf('day')
    case 2:
      // week
      return moment().startOf('week')
    case 3:
      // month
      return moment().startOf('month')
    case 4:
      // project
      return moment()
    case 5:
      // year
      return moment().startOf('year')
    case 6:
      // long
      return moment()
    case 7:
      // tomorrow
      return moment().startOf('day').add(1, 'days')
    case 8:
      // nextWeek
      return moment().startOf('week').add(1, 'weeks')
    case 9:
      // nextMonth
      return moment().startOf('month').add(1, 'months')
    case 10:
      // nextYear
      return moment().startOf('year').add(1, 'years')
  }
}

/**
 * get max date by targetType
 * @param {number} targetType 
 */
const getMaxDate = (minDate, targetType) => {
  const targetDate = moment(minDate)
  switch (targetType) {
    case 1:
      // today
      return targetDate.add(1, 'days')
    case 2:
      // week
      return targetDate.add(1, 'weeks')
    case 3:
      // month
      return targetDate.add(1, 'months')
    case 4:
      // project
      return targetDate.add(800, 'years')
    case 5:
      // year
      return targetDate.add(1, 'years')
    case 6:
      // long
      return targetDate.add(800, 'years')
    case 7:
      // tomorrow
      return targetDate.add(1, 'days')
    case 8:
      // nextWeek
      return targetDate.add(1, 'weeks')
    case 9:
      // nextMonth
      return targetDate.add(1, 'months')
    case 10:
      // nextYear
      return targetDate.add(1, 'years')
  }
}

/**
 * TimeSelector
 * @param {number} targetType target's type
 * @param {number} timeType time type
 * @param {moment} startDate
 * @param {moment} endDate
 * @param {moment} minDate
 * @param {moment} maxDate
 * @param {function} timeSelectorCallback callback({startDate, endDate, minDate, maxDate})
 */
class TimeSelector extends React.Component {
  constructor(props) {
    super(props)

    const { timeType, targetType } = props

    minDate = props.minDate || getMinDate(targetType)
    maxDate = props.maxDate || getMaxDate(minDate, targetType)
    startDate = props.startDate || minDate
    endDate = props.endDate || minDate

    this.state = {
      shouldShowStartTime: timeType === 1
    }

    this._handleStartTimeBtnClick = this._handleStartTimeBtnClick.bind(this)
    this._handleEndTimeBtnClick = this._handleEndTimeBtnClick.bind(this)
    this._handleCancelBtnClick = this._handleCancelBtnClick.bind(this)
    this._handleConfirmBtnClick = this._handleConfirmBtnClick.bind(this)
  }

  _handleStartTimeBtnClick() {
    this.setState({
      shouldShowStartTime: true
    })
  }

  _handleEndTimeBtnClick() {
    this.setState({
      shouldShowStartTime: false
    })
  }

  _handleCancelBtnClick() {

  }

  _handleConfirmBtnClick() {
    this.props.timeSelectorCallback({
      startDate, 
      endDate, 
      minDate, 
      maxDate
    })
  }

  _startTime_timepickerCallback(date) {
    startDate = date
  }

  _endTime_timepickerCallback(date) {
    endDate = date
  }

  render() {
    const { shouldShowStartTime } = this.state

    return (
      <div>
        <Grid style={{ marginTop: "20px" }}>
          <Row>
            {/* startTime{ */}
            <Column width={8} style={{ textAlign: 'right' }}>
              <Button content='开始时间' basic={!shouldShowStartTime} primary onClick={this._handleStartTimeBtnClick} />
            </Column>
            {/* startTime} */}

            {/* endTime{ */}
            <Column width={8} style={{ textAlign: 'left' }}>
              <Button content='结束时间' basic={shouldShowStartTime} primary onClick={this._handleEndTimeBtnClick} />
            </Column>
            {/* endTime} */}
          </Row>

          <Row>
            <Column>
              {/* start time Timepicker{ */}
              <div style={hide(shouldShowStartTime)}>
                <Timepicker defaultDate={startDate} minDate={minDate} maxDate={maxDate} timepickerCallback={this._startTime_timepickerCallback} />
              </div>
              {/* start time Timepicker{ */}

              {/* end time Timepicker{ */}
              <div style={hide(!shouldShowStartTime)}>
                <Timepicker defaultDate={endDate} minDate={minDate} maxDate={maxDate} timepickerCallback={this._endTime_timepickerCallback} />
              </div>
              {/* end time Timepicker{ */}
            </Column>
          </Row>

          <Row>
            <Column width={8} style={{ textAlign: 'right' }}>
              <Button content='返回' color='grey' onClick={this._handleCancelBtnClick} />
            </Column>
            <Column width={8} style={{ textAlign: 'left' }}>
              <Button content='确认' color='green' onClick={this._handleConfirmBtnClick} />
            </Column>
          </Row>
        </Grid>
      </div>
    )
  }
}


export default TimeSelector