import React from 'react'

import Timepicker from './Timepicker'

import { Button, Grid,} from 'semantic-ui-react'
const {Row, Column} = Grid

import tool from '../util/tool'

import moment from 'moment'

import GV from '../util/globalVarible'


/**
 * class TimeSetter
 * @receiveProps {moment} maxDate - current maxDate
 * @receiveProps {moment} minDate - current minDate
 * @receiveProps {moment} startDate - current startDate
 * @receiveProps {moment} endDate - current endDate
 * @receiveProps {string} timeType - GV.timeSetterTimeType.start or GV.timeSetterTimeType.end
 * @receiveProps {bool} isNeedShow - show or hide
 * @receiveProps {function} timeSetterCallback 
 	@callback {moment} startDate - current startDate
 	@callback {moment} endDate - current endDate
 	@callback {bool} isConfirmSetting - isConfirmSetting
 	@callback {bool} isCancelSetting - isCancelSetting
 */
class TimeSetter extends React.Component {
	constructor(props) {
		super(props)
		this.timeType = this.props.timeType || GV.timeSetterTimeType.start

		this.state = {
			timeType: this.timeType,
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			isNeedShow: this.props.isNeedShow || true
		}
		this.startTimeBtnClick = this.startTimeBtnClick.bind(this)
		this.endTimeBtnClick = this.endTimeBtnClick.bind(this)
		this.cancelBtnClick = this.cancelBtnClick.bind(this)
		this.confirmBtnClick = this.confirmBtnClick.bind(this)
		this.startTimepickerCallback = this.startTimepickerCallback.bind(this)
		this.endTimepickerCallback = this.endTimepickerCallback.bind(this)
	}
	startTimeBtnClick() {
		this.setState({
			timeType: GV.timeSetterTimeType.start
		})
	}
	endTimeBtnClick() {
		this.setState({
			timeType: GV.timeSetterTimeType.end
		})
	}
	cancelBtnClick() {
		const {timeSetterCallback} = this.props

		// hide TimeSetter
		this.setState({
			isNeedShow: false
		})

		if (timeSetterCallback) {
			timeSetterCallback({
				isCancelSetting: true
			})
		}
	}	
	confirmBtnClick() {
		const {timeSetterCallback} = this.props
		const {startDate, endDate} = this.state

		// check
		const isEndDateBeforeStartDate = endDate.isBefore(startDate)
		if (isEndDateBeforeStartDate) {
			tool.observe_message.setting = {
				isShowMessage: true,
				message: '开始时间晚于结束时间，请重新选择！',
				color: 'red'
			}
			return
		}

		if (timeSetterCallback) {
			timeSetterCallback({
				startDate: this.state.startDate,
				endDate: this.state.endDate,
				isConfirmSetting: true
			})
		}

		// hide TimeSetter
		this.setState({
			isNeedShow: false
		})
	}
	startTimepickerCallback(o) {
		this.setState({
			startDate: o.date
		})				
	}
	endTimepickerCallback(o) {
		this.setState({
			endDate: o.date
		})				
	}
	render() {
		const {props} = this
		const {timeType, isNeedShow} = this.state	 
		const isStartTime = timeType === GV.timeSetterTimeType.start
		const isEndTime = timeType === GV.timeSetterTimeType.end

		const minDate = props.minDate
		const maxDate = props.maxDate
		const startDate = props.startDate
		const endDate = props.endDate
		return (
			<div className='TimeSetter' style={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: GV.windowWidth,
				height: GV.windowHeight,
				display: isNeedShow ? 'block' : 'none'
			}}>
				<Grid style={{marginTop: "20px"}}>
					<Row>
						<Column width={8} style={{textAlign: 'right'}}>
							<Button content='开始时间' basic={isStartTime ? false : true} primary={isStartTime ? true : false} onClick={this.startTimeBtnClick} />
						</Column>
						<Column width={8} style={{textAlign: 'left'}}>
							<Button content='结束时间' basic={isEndTime ? false : true} primary={isEndTime ? true : false} onClick={this.endTimeBtnClick} />
						</Column>
					</Row>
					<Row>
						<Column>
							<div style={tool.getShowOrHideDomStyle(isStartTime)} >
								<Timepicker minDate={minDate} maxDate={maxDate} defaultDate={startDate} timepickerCallback={this.startTimepickerCallback}/>
							</div>
							<div style={tool.getShowOrHideDomStyle(isEndTime)}>
								<Timepicker minDate={minDate} maxDate={maxDate} defaultDate={endDate} timepickerCallback={this.endTimepickerCallback}/>
							</div>
						</Column>
					</Row>
					<Row>
						<Column width={8} style={{textAlign: 'right'}}>
							<Button content='返回' color='grey' onClick={this.cancelBtnClick} />
						</Column>
						<Column width={8} style={{textAlign: 'left'}}>
							<Button content='确认' color='green' onClick={this.confirmBtnClick}/>
						</Column>
					</Row>
				</Grid>
			</div>)
	}
}


export default TimeSetter
