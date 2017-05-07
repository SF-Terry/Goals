import React from 'react'
import { Button, Grid } from 'semantic-ui-react'
const { Row, Column } = Grid
import moment from 'moment'
import { hide } from '../../../util'
import validator from '../../../util/validator'

import Timepicker from './TimePicker'



let startDate, endDate, minDate, maxDate

/**
 * get min date by target type
 * @param {number} type 
 */
const getMinDate = type => {
  switch (type) {
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
 * get max date by target type
 * @param {number} type 
 */
const getMaxDate = (minDate, type) => {
  const targetDate = moment(minDate)
  switch (type) {
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
 * @param {number} type target's type
 * @param {number} timeType time type
 * @param {moment} startDate
 * @param {moment} endDate
 * @param {moment} minDate
 * @param {moment} maxDate
 * @param {function} onStartTimeClick 
 * @param {function} onEndTimeClick 
 * @param {function} onConfirmClick 
 * @param {function} onCancelClick 
 */
class TimeSelector extends React.Component {
  constructor(props) {
    super(props)

    const { type } = this.props

    minDate = this.props.minDate || getMinDate(type)
    maxDate = this.props.maxDate || getMaxDate(minDate, type)
    startDate = this.props.startDate || minDate
    endDate = this.props.endDate || minDate


    this.state = {
      shouldShowStartTime: true
    }

    this._onConfirmClick = this._onConfirmClick.bind(this)
  }

  _onConfirmClick() {
    const { onConfirmClick, validate } = this.props

    const isValid = validator.timeSelector(startDate, endDate)

    isValid && onConfirmClick({
      startDate: startDate, 
      endDate: endDate, 
      minDate: minDate, 
      maxDate: maxDate
    })
  }

  _startTime_timepickerCallback(date) {
    startDate = date
  }

  _endTime_timepickerCallback(date) {
    endDate = date
  }

  render() {
    const { timeType, onStartTimeClick, onEndTimeClick, onCancelClick } = this.props

    const shouldHideStartTime = timeType === 2
    const shouldShowOutline = shouldHideStartTime

    return (
      <div>
        <Grid style={{ marginTop: "20px" }}>
          <Row>
            {/* startTime{ */}
            <Column width={8} style={{ textAlign: 'right' }}>
              <Button content='开始时间' basic={shouldShowOutline} primary onClick={onStartTimeClick} />
            </Column>
            {/* startTime} */}

            {/* endTime{ */}
            <Column width={8} style={{ textAlign: 'left' }}>
              <Button content='结束时间' basic={!shouldShowOutline} primary onClick={onEndTimeClick} />
            </Column>
            {/* endTime} */}
          </Row>

          <Row>
            <Column>
              {/* start time Timepicker{ */}
              <div style={ hide(shouldHideStartTime) }>
                <Timepicker defaultDate={startDate} minDate={minDate} maxDate={maxDate} callback={this._startTime_timepickerCallback} />
              </div>
              {/* start time Timepicker{ */}

              {/* end time Timepicker{ */}
              <div style={hide(!shouldHideStartTime) }>
                <Timepicker defaultDate={endDate} minDate={minDate} maxDate={maxDate} callback={this._endTime_timepickerCallback} />
              </div>
              {/* end time Timepicker{ */}
            </Column>
          </Row>

          <Row>
            <Column width={8} style={{ textAlign: 'right' }}>
              <Button content='返回' color='grey' onClick={onCancelClick} />
            </Column>
            <Column width={8} style={{ textAlign: 'left' }}>
              <Button content='确认' color='green' onClick={this._onConfirmClick} />
            </Column>
          </Row>
        </Grid>
      </div>
    )
  }
}

TimeSelector.propTypes = {
  type: React.PropTypes.number,
  timeType: React.PropTypes.number,
  minDate: React.PropTypes.instanceOf(moment),
  maxDate: React.PropTypes.instanceOf(moment),
  startDate: React.PropTypes.instanceOf(moment),
  endDate: React.PropTypes.instanceOf(moment),
  onStartTimeClick: React.PropTypes.func,
  onEndTimeClick: React.PropTypes.func,
  onConfirmClick: React.PropTypes.func,
  onCancelClick: React.PropTypes.func
}


export default TimeSelector