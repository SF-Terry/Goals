import React from 'react'

import TimeSetter from './TimeSetter'

import {Grid, Checkbox, Segment, Dropdown} from 'semantic-ui-react'
const {Row, Column} = Grid

import tool from '../util/tool'

import moment from 'moment'

import GV from '../util/global'




/**
 * class TaskTypePanel
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {bool} isTaskNeedTimer - current isTaskNeedTimer
 * @receiveProps {bool} isTaskNeedRepeat - current isTaskNeedRepeat
 * @receiveProps {moment} startDate - current startDate
 * @receiveProps {moment} endDate - current endDate
 * @receiveProps {function} taskTypePanelCallback
 	{string} taskType
 	{bool} isTaskNeedTimer
	{bool} isTaskNeedRepeat
	{moment} startDate
	{moment} endDate
 */
class TaskTypePanel extends React.Component {
 	constructor(props) {
 		super(props)
		
 		const defaultTaskTypeMoments = GV.getTaskTypesMoment('today')

 		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, startDate, endDate} = this.props

 		this.state = {
 			taskType: GV.taskTypeToAddObj.target,
 			isTaskNeedTimer: isTaskNeedTimer,
 			isTaskNeedRepeat: isTaskNeedRepeat,
 			isNeedTimeSetter: false,
 			timeSetterTimeType: GV.timeSetterTimeType.start,
 			/* parse task's string startdate and end date */
 			startDate: startDate ? moment(startDate) : defaultTaskTypeMoments[0],
 			endDate: endDate ? moment(endDate) : defaultTaskTypeMoments[1]
 		}

		this.taskTypeDropdownChange = this.taskTypeDropdownChange.bind(this)
		this.isTaskNeedTimerCheckboxClick = this.isTaskNeedTimerCheckboxClick.bind(this)
		this.isTaskNeedRepeatClick = this.isTaskNeedRepeatClick.bind(this)
		this.timeSetterCallback = this.timeSetterCallback.bind(this)
		this.startDatePanelClick = this.startDatePanelClick.bind(this)
		this.endDatePanelClick = this.endDatePanelClick.bind(this)
	}	
	taskTypeDropdownChange(e, result) {
		const value = result.value
		const {taskType, timeSetterTimeType, isNeedTimeSetter, isTaskNeedTimer, isTaskNeedRepeat} = this.state
		const isLongTask = value == 'long'
		const isValueDifferent = value != taskType		

		// reset isTaskNeedTimer if new result is different with old result
		if (isValueDifferent) {
			this.setState(() => ({
				taskType: value
			}), () => {
				this.setState({
					startDate:  GV.getTaskTypesMoment(this.state.taskType)[0],
					endDate:  GV.getTaskTypesMoment(this.state.taskType)[1],
				})

				if (!isLongTask) {
					this.setState({
						isTaskNeedTimer: false
					})
				}

				if (isLongTask) {
					this.setState({
						isTaskNeedRepeat: false,
						isNeedTimeSetter: true
					})
				}
			})
		}

		// reset isTaskNeedRepeat
		if (isTaskNeedRepeat) {
			this.setState({
				isTaskNeedRepeat: false
			})
		} 
	}
	isTaskNeedTimerCheckboxClick(e, result) {
		const checked = result.checked
		let {task} = this.props
		const {isNeedTimeSetter, taskType} = this.state
		const isFutureTaskType = GV.futureTaskTypes.includes(taskType)

		/* @Tansporting checked value: Only when past checked is true that change checked to false, if past checked is false, needing isConfirmSetting to change it */
		// if past checked is true 
		if (checked) {
			this.setState({
				isTaskNeedTimer: !checked
			})

			// hide  timeSetter and TimerPanel
			this.setState({
				isNeedTimeSetter: false,
				startDate: GV.getTaskTypesMoment(taskType)[0],
				endDate: GV.getTaskTypesMoment(taskType)[1]
			})
		}
		
		/* @Tansporting checked value:  tansport default parameter */
		if (!checked) {
			this.setState({
				isNeedTimeSetter: true,
				timeSetterTimeType: GV.timeSetterTimeType.start,
			})

			if (!isFutureTaskType) {
				this.setState({
					startDate: moment()
				})
			}
		}
	}
	isTaskNeedRepeatClick(e, result) {
		const checked = result.checked

		this.setState({
			isTaskNeedRepeat: !checked
		})
	}
	timeSetterCallback(o) {
		const {startDate, endDate, isConfirmSetting, isCancelSetting} = o
		const {taskType} = this.state
		let {task} = this.props

		if (startDate != undefined) {
			this.setState({
				startDate: startDate
			})
		}
		if (endDate != undefined) {
			this.setState({
				endDate: endDate
			})
		}

		if (isConfirmSetting != undefined) {
			this.setState({
				isNeedTimeSetter: false
			})

			/* @Tansporting checked value: To activate checked(form false to true) */
			this.setState({
				isTaskNeedTimer: true
			})
		}
		if (isCancelSetting != undefined) {
			const {isTaskNeedTimer} = this.state

			this.setState({
				isNeedTimeSetter: false
			})

			if (!isTaskNeedTimer) {
				this.setState({
					startDate: GV.getTaskTypesMoment(taskType)[0],
					endDate: GV.getTaskTypesMoment(taskType)[1]
				})
			}
			/*if (taskType === 'long') {
				this.setState({
					taskType: GV.defaultTaskType
				})
			}*/
		}
	}
	startDatePanelClick() {
		this.setState({
			isNeedTimeSetter: true,
			timeSetterTimeType: GV.timeSetterTimeType.start
		})
	}
	endDatePanelClick() {
		this.setState({
			isNeedTimeSetter: true,
			timeSetterTimeType: GV.timeSetterTimeType.end
		})
	}
	render() {
		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, timeSetterTimeType} = this.state

		let startDate = this.state.startDate
		let endDate = this.state.endDate
		const taskTypesOptions = GV.taskTypes.map((item, index) => {
			let text = tool.getLanguageTextByTaskType(item)			
			return {text: text, value: item}
		})
		const isNotTaskType_Long = taskType != 'long'
		const minDate = startDate
		const maxDate = isNotTaskType_Long ? GV.getTaskTypesMoment(taskType)[1] : moment().add(100, 'years')
		// const maxDate = GV.getTaskTypesMoment(taskType)[1]

		// when task's type is 'long', change endDate 
		if (!isNotTaskType_Long) {
			if (!isTaskNeedTimer) {
				endDate = moment().add(1000, 'years')
			}
			// set endDate to normal date
			if (!isTaskNeedTimer && isNeedTimeSetter) {
				endDate = GV.getTaskTypesMoment(taskType)[1]
			}
		}

		const {taskTypePanelCallback} = this.props
		const isFutureTaskType = GV.futureTaskTypes.includes(taskType)

		if (taskTypePanelCallback) {
			taskTypePanelCallback({
				taskType: taskType,
				isTaskNeedTimer: isTaskNeedTimer,
				isTaskNeedRepeat: isTaskNeedRepeat,
				startDate: startDate,
				endDate: endDate
			})
		}

		return (
			<div>
				<Grid style={{display: isNeedTimeSetter ? 'none' : 'block'}}>
					<Row centered>
						<Column width={14}>
							<Dropdown fluid selection value={taskType} options={taskTypesOptions} onChange={this.taskTypeDropdownChange} ></Dropdown>
						</Column>
					</Row>
					{/*isNeedShowCheckboxGroup*/true ? (
						<Row centered>
							<Column width={8} textAlign='center'>
								<Checkbox label='定时' checked={isTaskNeedTimer} onClick={this.isTaskNeedTimerCheckboxClick} />
							</Column>
							{!isFutureTaskType && isNotTaskType_Long ? (
								<Column width={8} textAlign='center'>
									<Checkbox label='重复' checked={isTaskNeedRepeat} onClick={this.isTaskNeedRepeatClick} />
								</Column>
							) : null}
						</Row>
					) : ''}
					
					{isTaskNeedTimer ? (
						<Row centered>
							<Column width={6}>
								<Segment textAlign='center' onClick={this.startDatePanelClick}>
									<h3>{startDate.format('HH:mm')}</h3>
									<h5>{startDate.format('YYYY/M/D')}</h5>
								</Segment>
							</Column>
							<Column width={2} textAlign='center' verticalAlign='middle'>
							
							</Column>
							<Column width={6}>
								<Segment textAlign='center' onClick={this.endDatePanelClick}>
									<h3>{endDate.format('HH:mm')}</h3>
									<h5>{endDate.format('YYYY/M/D')}</h5>
								</Segment>
							</Column>
						</Row>
					) : ''}
				</Grid>
				{  isNeedTimeSetter ? <TimeSetter timeType={timeSetterTimeType} minDate={minDate} maxDate={maxDate} startDate={startDate} endDate={endDate} timeSetterCallback={this.timeSetterCallback} isNeedShow={isNeedTimeSetter}   /> : ''  }
			</div>
		)
	}
}


export default TaskTypePanel