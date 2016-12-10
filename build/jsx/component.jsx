import React,  { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import { Button, Grid, Checkbox, Form, Input, Label, Segment, Icon, Menu, Dropdown, Modal, Message} from 'semantic-ui-react';
import Switch from 'react-flexible-switch';
import Draggable from 'react-draggable'; 
import Tappable from 'react-tappable';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import observe from '../js/observe.js';
import {getSingle, getShowOrHideDomStyle, getLanguageTextByTaskType, setSemanticInputInitialledFocus, getLabelTextByMoments} from '../js/tool.js';

// datepicker
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import DatePicker from 'rmc-date-picker/lib/index.web';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn.js';
import storekeeper from '../js/storekeeper.js';

import G, {taskTypesMoment, taskTypesDateType, windowWidth, windowHeight} from '../js/globalVarible.js';

const {Item} = Menu;
const {Row, Column} = Grid;

// inital moment.locale
moment.locale('zh-cn');

let tasks = storekeeper.tasks;
let defaultSetting = storekeeper.settings[0].defaultSetting;

// observe
let observe_taskInfo = {
	setting: {
		isShowTaskInfo: false,
		taskInfoMode: G.taskInfoMode.add,
		task: null,
		isTransporting: false
	}
};
let observe_message = {
	setting: {
		isShowMessage: false,
		message: '',
		color: 'red'
	}
};

// test
setTimeout(() => {

}, 1000);

// init data
if (tasks.length === 0) {
	tasks.push({
		name: '第一个今日目标',
		taskType: 'today',
		taskLevel: G.taskLevels.a,
		isTaskCompleted: false,
		isTaskNeedTimer: true,
		isTaskNeedRepeat: false,
		startDate: moment(),	
		endDate: moment().endOf('day')
	});
	tasks.push({
		name: '第一个长期目标',
		taskType: 'long',
		taskLevel: G.taskLevels.b,
		isTaskCompleted: false,
		isTaskNeedTimer: true,
		isTaskNeedRepeat: false,
		startDate: moment(),	
		endDate: moment().add(6, 'months')
	});
}


/**
 * class TimeSetter
 * @receiveProps {moment} maxDate - current maxDate
 * @receiveProps {moment} minDate - current minDate
 * @receiveProps {moment} startDate - current startDate
 * @receiveProps {moment} endDate - current endDate
 * @receiveProps {string} timeType - G.timeSetterTimeType.start or G.timeSetterTimeType.end
 * @receiveProps {bool} isNeedShow - show or hide
 * @receiveProps {function} timeSetterCallback 
 	@callback {moment} startDate - current startDate
 	@callback {moment} endDate - current endDate
 	@callback {bool} isConfirmSetting - isConfirmSetting
 	@callback {bool} isCancelSetting - isCancelSetting
 */
class TimeSetter extends React.Component {
	constructor(props) {
		super(props);
		this.timeType = this.props.timeType || G.timeSetterTimeType.start;

		this.state = {
			timeType: this.timeType,
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			isNeedShow: this.props.isNeedShow || true
		}
		this.startTimeBtnClick = this.startTimeBtnClick.bind(this);
		this.endTimeBtnClick = this.endTimeBtnClick.bind(this);
		this.cancelBtnClick = this.cancelBtnClick.bind(this);
		this.confirmBtnClick = this.confirmBtnClick.bind(this);
		this.startTimepickerCallback = this.startTimepickerCallback.bind(this);
		this.endTimepickerCallback = this.endTimepickerCallback.bind(this);
	}
	startTimeBtnClick() {
		this.setState({
			timeType: G.timeSetterTimeType.start
		});
	}
	endTimeBtnClick() {
		this.setState({
			timeType: G.timeSetterTimeType.end
		});
	}
	cancelBtnClick() {
		const {timeSetterCallback} = this.props;

		// hide TimeSetter
		this.setState({
			isNeedShow: false
		});

		if (timeSetterCallback) {
			timeSetterCallback({
				isCancelSetting: true
			});
		}
	}	
	confirmBtnClick() {
		const {timeSetterCallback} = this.props;
		if (timeSetterCallback) {
			timeSetterCallback({
				startDate: this.state.startDate,
				endDate: this.state.endDate,
				isConfirmSetting: true
			});
		}

		// hide TimeSetter
		this.setState({
			isNeedShow: false
		});
	}
	startTimepickerCallback(o) {
		this.setState({
			startDate: o.date
		});				
	}
	endTimepickerCallback(o) {
		this.setState({
			endDate: o.date
		});				
	}
	render() {
		const {props} = this;
		const {timeType, isNeedShow} = this.state;	 
		const isStartTime = timeType === G.timeSetterTimeType.start;
		const isEndTime = timeType === G.timeSetterTimeType.end;

		const minDate = props.minDate;
		const maxDate = props.maxDate;
		const startDate = props.startDate;
		const endDate = props.endDate;
		return (
			<div className='TimeSetter' style={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: windowWidth,
				height: windowHeight,
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
							<div style={getShowOrHideDomStyle(isStartTime)} >
								<Timepicker minDate={minDate} maxDate={maxDate} defaultDate={startDate} timepickerCallback={this.startTimepickerCallback}/>
							</div>
							<div style={getShowOrHideDomStyle(isEndTime)}>
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
			</div>);
	}
}

/**
 * class Timepicker
 * @receiveProps {moment} defaultDate - current defaultDate
 * @receiveProps {moment} maxDate - current maxDate
 * @receiveProps {moment} minDate - current minDate
 * @receiveProps {function} timepickerCallback 
 	@callback {moment} date
 */
class Timepicker extends React.Component {
	constructor(props) {
		super(props);
		let that = this;
		this.state = {
	        date: null
	    };

	    this.onDateChange = this.onDateChange.bind(this);
	}
	onDateChange(date) {
    	this.setState({
    		date: date
    	});

    	let {timepickerCallback} = this.props;
    	if (timepickerCallback) {
    		timepickerCallback({
    			date: date
    		});
    	}
    };
	render() {
		const props = this.props;
		const {date} = this.state;

		const minDate = props.minDate || moment();
		const maxDate = props.maxDate || moment().add(100, 'years');
		const defaultDate = props.defaultDate || moment();
		minDate.locale('zh-cn').utcOffset(8);
		maxDate.locale('zh-cn').utcOffset(8);
		defaultDate.locale('zh-cn').utcOffset(8);
		function format(date) {
		  return date.format('YYYY-MM-DD HH:mm');
		}
	    
	    return (
	    	<div style={{ margin: '10px 30px' }}>
	      		<div>
	      		  {/* <span>{date && format(date) || format(defaultDate)}</span> */}
	      		  <DatePicker
	      		    rootNativeProps={{'data-xx':'yy'}}
	      		    defaultDate={date || defaultDate}
	      		    mode={'datetime'}
	      		    locale={zhCn}
	      		    maxDate={maxDate}
	      		    minDate={minDate}
	      		    onDateChange={this.onDateChange}
	      		  />
	      		</div>
	    	</div>);
	  }
}


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
 		super(props);
		
 		const defaultTaskTypeMoments = taskTypesMoment['today'];

 		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, startDate, endDate} = this.props;

 		this.state = {
 			taskType: taskType,
 			isTaskNeedTimer: isTaskNeedTimer,
 			isTaskNeedRepeat: isTaskNeedRepeat,
 			isNeedTimeSetter: false,
 			timeSetterTimeType: G.timeSetterTimeType.start,
 			/* parse task's string startdate and end date */
 			startDate: startDate ? moment(startDate) : defaultTaskTypeMoments[0],
 			endDate: endDate ? moment(endDate) : defaultTaskTypeMoments[1]
 		};

		this.taskTypeDropdownChange = this.taskTypeDropdownChange.bind(this);
		this.isTaskNeedTimerCheckboxClick = this.isTaskNeedTimerCheckboxClick.bind(this);
		this.isTaskNeedRepeatClick = this.isTaskNeedRepeatClick.bind(this);
		this.timeSetterCallback = this.timeSetterCallback.bind(this);
		this.startDatePanelClick = this.startDatePanelClick.bind(this);
		this.endDatePanelClick = this.endDatePanelClick.bind(this);
	}	
	taskTypeDropdownChange(e, result) {
		const value = result.value;
		const {taskType, timeSetterTimeType, isNeedTimeSetter, isTaskNeedTimer, isTaskNeedRepeat} = this.state;
		const isLongTask = value == 'long';
		const isValueDifferent = value != taskType;		

		// reset isTaskNeedTimer if new result is different with old result
		if (isValueDifferent) {
			this.setState(() => ({
				taskType: value
			}), () => {
				this.setState({
					startDate:  taskTypesMoment[this.state.taskType][0],
					endDate:  taskTypesMoment[this.state.taskType][1],
				});

				if (!isLongTask) {
					this.setState({
						isTaskNeedTimer: false
					});
				}

				if (isLongTask) {
					this.setState({
						isTaskNeedRepeat: false,
						isNeedTimeSetter: true
					});
				}
			});
		}

		// reset isTaskNeedRepeat
		if (isTaskNeedRepeat) {
			this.setState({
				isTaskNeedRepeat: false
			});
		} 
	}
	isTaskNeedTimerCheckboxClick(e, result) {
		const checked = result.checked;
		let {task} = this.props;
		const {isNeedTimeSetter, taskType} = this.state;
		const isFutureTaskType = G.futureTaskTypes.includes(taskType);

		/* @Tansporting checked value: Only when past checked is true that change checked to false, if past checked is false, needing isConfirmSetting to change it */
		// if past checked is true 
		if (checked) {
			this.setState({
				isTaskNeedTimer: !checked
			});

			// hide  timeSetter and TimerPanel
			this.setState({
				isNeedTimeSetter: false,
				startDate: taskTypesMoment[taskType][0],
				endDate: taskTypesMoment[taskType][1]
			});
		}
		
		/* @Tansporting checked value:  tansport default parameter */
		if (!checked) {
			this.setState({
				isNeedTimeSetter: true,
				timeSetterTimeType: G.timeSetterTimeType.start,
			});

			if (!isFutureTaskType) {
				this.setState({
					startDate: moment()
				});
			}
		}
	}
	isTaskNeedRepeatClick(e, result) {
		const checked = result.checked;

		this.setState({
			isTaskNeedRepeat: !checked
		});
	}
	timeSetterCallback(o) {
		const {startDate, endDate, isConfirmSetting, isCancelSetting} = o;
		const {taskType} = this.state;
		let {task} = this.props;

		if (startDate != undefined) {
			this.setState({
				startDate: startDate
			});
		}
		if (endDate != undefined) {
			this.setState({
				endDate: endDate
			});
		}

		if (isConfirmSetting != undefined) {
			this.setState({
				isNeedTimeSetter: false
			});

			/* @Tansporting checked value: To activate checked(form false to true) */
			this.setState({
				isTaskNeedTimer: true
			});
		}
		if (isCancelSetting != undefined) {
			const {isTaskNeedTimer} = this.state;

			this.setState({
				isNeedTimeSetter: false
			});

			if (!isTaskNeedTimer) {
				this.setState({
					startDate: taskTypesMoment[taskType][0],
					endDate: taskTypesMoment[taskType][1]
				});
			}
			if (taskType === 'long') {
				this.setState({
					taskType: G.defaultTaskType
				});
			}
		}
	}
	startDatePanelClick() {
		this.setState({
			isNeedTimeSetter: true,
			timeSetterTimeType: G.timeSetterTimeType.start
		});
	}
	endDatePanelClick() {
		this.setState({
			isNeedTimeSetter: true,
			timeSetterTimeType: G.timeSetterTimeType.end
		});
	}
	render() {
		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, timeSetterTimeType, startDate, endDate} = this.state;
		const taskTypesOptions = G.taskTypes.map((item, index) => {
			let text = getLanguageTextByTaskType(item);			
			return {text: text, value: item};
		});
		const isNotTaskType_Long = taskType != 'long';
		const isNeedShowCheckboxGroup = isNotTaskType_Long;
		const minDate = startDate;
		const maxDate = isNotTaskType_Long ? taskTypesMoment[taskType][1] : moment().add(20, 'years');
		const {taskTypePanelCallback} = this.props;
		const isFutureTaskType = G.futureTaskTypes.includes(taskType);


		if (taskTypePanelCallback) {
			taskTypePanelCallback({
				taskType: taskType,
				isTaskNeedTimer: isTaskNeedTimer,
				isTaskNeedRepeat: isTaskNeedRepeat,
				startDate: startDate,
				endDate: endDate
			});
		}

		return (
			<div>
				<Grid style={{display: isNeedTimeSetter ? 'none' : 'block'}}>
					<Row centered>
						<Column width={14}>
							<Dropdown fluid selection value={taskType} options={taskTypesOptions} onChange={this.taskTypeDropdownChange} ></Dropdown>
						</Column>
					</Row>
					{isNeedShowCheckboxGroup ? (
						<Row centered>
							<Column width={8} textAlign='center'>
								<Checkbox label='定时' checked={isTaskNeedTimer} onClick={this.isTaskNeedTimerCheckboxClick} />
							</Column>
							{!isFutureTaskType ? (
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
		);
	}
}


/**
 * class TaskLevelButtons
 * @receiveProps {object} level - current level
 * @receiveProps {function} taskLevelButtonsCallback
 	{string} level
 */
class TaskLevelButtons extends React.Component {
	constructor(props) {
		super(props);

		let {level} = this.props;


		this.state = {
			level: level || 'b'
		}

		this.setLevel = this.setLevel.bind(this);
	}
	setLevel(level) {
		const {taskLevelButtonsCallback} = this.props;
		
		this.setState({
			level: level
		});

		if (taskLevelButtonsCallback) {
			taskLevelButtonsCallback({
				level: level
			});
		}
	}
	render() {
		const {level} = this.state;

		let buttonsInfo = {
			a: {
				color: 'red',
				text: '重急'
			},
			b: {
				color: 'orange',
				text: '重要'
			},
			c: {
				color: 'yellow',
				text: '紧急'
			},
			d: {
				color: 'blue',
				text: '正常'
			}
		};
		let buttons = [];
		for (let buttonLevel in buttonsInfo) {
			buttons.push(
				<span key={buttonLevel}>
					&nbsp;&nbsp;
					<Button className='taskLevelButton' basic={buttonLevel != this.state.level} content={buttonsInfo[buttonLevel].text} color={buttonsInfo[buttonLevel].color} onClick={()=>{this.setLevel(buttonLevel)}} />
				</span>
			);
		}
		return (
			<div style={{
				textAlign: 'center'
			}}>
				{buttons}
			</div>
		);
	}
}


/**
 * class TaskInfo
 * @receiveProps {object} task - task
 * @receiveProps {bool} isShow	
 * @receiveProps {function} taskInfoCallback	
 	{bool} isContinueToAddTask
 	{bool} isShowTaskInfo
 	{bool} isBackTask
 */
class TaskInfo extends React.Component {
	constructor(props) {
		super(props);

		const {mode} = this.props;

		this.tempTask = mode === G.taskInfoMode.add ? Object.assign({}, G.initialTask) : Object.assign({}, this.props.task);

		this.taskNameInputChange = this.taskNameInputChange.bind(this);
		this.completeBtnClick = this.completeBtnClick.bind(this);
		this.backBtnClick = this.backBtnClick.bind(this);

		// add mode
		this.continueToAddBtn = this.continueToAddBtn.bind(this);

		this.taskLevelButtonsCallback = this.taskLevelButtonsCallback.bind(this);
		this.taskTypePanelCallback = this.taskTypePanelCallback.bind(this);
	}
	taskNameInputChange(ev, result) {
		const {value} = result;

		this.tempTask.name = value;
	}
	completeBtnClick() {
		const {taskInfoCallback} = this.props;
		const {mode} = this.props;
		const isAddMode = mode === G.taskInfoMode.add;
		const isEditMode = mode === G.taskInfoMode.edit;
		let task = this.props.task;
		const {name} = this.tempTask;

		// check
		if (!name) {
			observe_message.setting = {
				isShowMessage: true,
				message: '任务内容为空，请重新输入！',
				color: 'red'
			}
			return;
		}

		// save
		if (isAddMode) {
			tasks.push(this.tempTask);
		}
		if (isEditMode) {
			Object.assign(task, this.tempTask);
		}


		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isShowTaskInfo: false
			});
		}
	}
	taskLevelButtonsCallback(o) {
		const {level} = o;
		if (level) {
			this.tempTask.taskLevel = level;
		}
	}
	taskTypePanelCallback(o) {
		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, startDate, endDate} = o;
		if (taskType) {
			this.tempTask.taskType = taskType;
		}
		if (isTaskNeedTimer != undefined) {
			this.tempTask.isTaskNeedTimer = isTaskNeedTimer;
		}
		if (isTaskNeedRepeat != undefined) {
			this.tempTask.isTaskNeedRepeat = isTaskNeedRepeat;
		}
		if (startDate != undefined) {
			this.tempTask.startDate = startDate;
		}
		if (endDate != undefined) {
			this.tempTask.endDate = endDate;
		}
	}
	// add mode
	continueToAddBtn() {
		const {taskInfoCallback, mode} = this.props;
		const isAddMode = mode === G.taskInfoMode.add;

		// check
		if (!name) {
			observe_message.setting = {
				isShowMessage: true,
				message: '任务内容为空，请重新输入！',
				color: 'red'
			}
			return;
		}

		// save
		// add mode
		if (isAddMode) {
			tasks.push(this.tempTask);
		}

		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isContinueToAddTask: true
			});
		}
	}
	// edit mode
	backBtnClick() {
		const {taskInfoCallback} = this.props;
		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isBackTask: true
			});
		}
	}
	render() {
		const {mode} = this.props || G.taskInfoMode.add;
		const {name, taskLevel, taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, startDate, endDate} = this.tempTask;

		return (
			<div className="TaskInfo" style={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: windowWidth,
				height: windowHeight
			}}>
				<Grid padded>
					{/*<Row>
						<Column>
							<Button className='BackBtn' icon='angle left' onClick={this.backBtnClick} />
						</Column>
					</Row>*/}
					<Row centered>
						<Column width={14}>
							<Input id='taskInfo_taskNameInput' defaultValue={name} placeholder='任务内容' onChange={this.taskNameInputChange} fluid ref={(o) => {
								if (o && o.props && o.props.id && mode == G.taskInfoMode.add) {
									let inputDom = document.getElementById(o.props.id).children[0];
									inputDom.focus();
								}
							}} />
						</Column>	
					</Row>
					<Row centered>
						<Column width={16}>
							<TaskLevelButtons level={taskLevel} taskLevelButtonsCallback={this.taskLevelButtonsCallback} />
						</Column>	
					</Row>
					<Row centered>
						<Column width={16}>
							<TaskTypePanel taskType={taskType} isTaskNeedTimer={isTaskNeedTimer} isTaskNeedRepeat={isTaskNeedRepeat} isNeedTimeSetter={isNeedTimeSetter} startDate={startDate} endDate={endDate} taskTypePanelCallback={this.taskTypePanelCallback}/>
						</Column>
					</Row>
					<Row></Row>
					<Row>
						<Column width={16}>
							<Grid padded>
								<Row centered>
									<Column width={12} >
										<Button content='完成' fluid color='blue' onClick={this.completeBtnClick}/>
									</Column>
								</Row>

								{/* add mode */}
								{mode === G.taskInfoMode.add ? (
									<Row centered>
										<Column width={12} >
											<Button content='继续添加' fluid color='teal' onClick={this.continueToAddBtn} />
										</Column>
									</Row>
								) : ''}

								<Row centered>
									<Column width={12} >
										<Button content='返回' fluid color='grey' onClick={this.backBtnClick} />
									</Column>
								</Row>
							</Grid>
						</Column>
					</Row>
				</Grid>
			</div>);
	}
}

/**
 * class TaskListItem
 * @receiveProps {number} key - key
 * @receiveProps {object} task - one task
 * @receiveProps {function} taskListItemCallback
 	{bool} isDeleteTask
 */
class TaskListItem extends React.Component {
	constructor(props) {
		super(props);

		/*this.state = {

		};*/

		this.textClick = this.textClick.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.deleteBtnClick = this.deleteBtnClick.bind(this);
		this.completeCheckboxClick = this.completeCheckboxClick.bind(this);
	}
	componentDidMount() {
		let {task} = this.props;
		const {taskType, isTaskNeedRepeat, startDateStr, endDateStr} = task;
		const startDate = moment(startDateStr);
		const endDate = moment(endDateStr);
		const isFutureTaskType = G.futureTaskTypes.includes(taskType);
		const isLongTask = taskType === 'long';

		/* initial items' prop */
		// update future taskType
		if (isFutureTaskType) {
			const normalStartDate = taskTypesMoment[taskType][0];
			const isNeedChange = moment().isSameOrAfter(normalStartDate)
			let newTaskType = null;
			switch (taskType) {
				case 'tomorrow': 
					newTaskType = 'today'; break;
				case 'nextWeek': 
					newTaskType = 'thisWeek'; break;
				case 'nextMonth': 
					newTaskType = 'thisMonth'; break;
				case 'nextYear': 
					newTaskType = 'thisYear'; break;
				default: break;
			}
			if (newTaskType) {
				task.taskType = newTaskType;
			}
		}

		// judge the condition of task repeat
		// forbid future tasktype

		if (isTaskNeedRepeat && !isFutureTaskType && !isLongTask) {
			const normalStartDate = taskTypesMoment[taskType][0];
			const isNeedChange = moment().isSameOrAfter(normalStartDate)
			const dateType = taskTypesDateType[taskType];
			const timeInterval = startDate.startOf(dateType).diff(normalStartDate,dateType + 's');
			const newStartDate = startDate.add(timeInterval, dateType + 's');
			const newEndDate = endDate.add(timeInterval, dateType + 's');

			task.isTaskCompleted = false;
			task.startDate = newStartDate;
			task.endDate = newEndDate;
		}

	}
	textClick() {
		let {task} = this.props;

		observe_taskInfo.setting = {
			isShowTaskInfo: true,
			taskInfoMode: G.taskInfoMode.edit,
			task: task,
			isTransporting: true
		}
	}
	inputChange(ev, result) {
		const {value} = result;
		let {task} = this.props;

		/* modify name */
		task.name = value;
	}
	deleteBtnClick() {
		let {task} = this.props;
		const index = tasks.indexOf(task);
		const {taskListItemCallback} = this.props;

		/* delete item */
		tasks.splice(index, 1);

		if (taskListItemCallback) {
			taskListItemCallback({
				isDeleteTask: true
			});
		}
		
	}
	completeCheckboxClick() {
		let {task} = this.props;
		const {isTaskCompleted} = task;
		const {taskListItemCallback} = this.props;

		/* modify task is completed or not */
		task.isTaskCompleted = !isTaskCompleted;

		if (taskListItemCallback) {
			taskListItemCallback({
				isCompleteTask: true
			});
		}

	}
	render() {
		let {task, editMode} = this.props;

		const {name: taskName, taskType, isTaskCompleted, taskLevel, isTaskNeedRepeat} = task;

		const color = (() => {
			switch (taskLevel) {
				case 'a':
					return 'red'; break;
				case 'b':
					return 'orange'; break;
				case 'c':
					return 'yellow'; break;
				case 'd':
					return 'blue'; break;
				default:
					return 'orange'; break;
			}
		})();

		return( 
			<Item>
				<Grid>
					{!editMode ? (
						// normal mode
						<Row >
							<Column width={!isTaskCompleted ? 8 : 14} verticalAlign='middle'>
								<div onClick={this.textClick}>
									{taskName}
								</div>
							</Column>
							{!isTaskCompleted ? (
								<Column width={6} textAlign='right' verticalAlign='middle'>
									<Label className='taskTimeLabel' color={color}>
										{getLabelTextByMoments(task)}
										&nbsp;
										{isTaskNeedRepeat ? (
											<Icon name='repeat' size='mini' />
										) : null}
									</Label>
								</Column>
							) : ''}
							<Column width={2} textAlign='center' verticalAlign='middle'>
								<Checkbox defaultChecked={isTaskCompleted} onClick={this.completeCheckboxClick}/>
							</Column>
							
						</Row>
					) : (
						// edit mode
						<Row>
							<Column width={3} textAlign='center' verticalAlign='middle'>
								<Icon size='large' color='red' name='minus circle' onClick={this.deleteBtnClick}/>
							</Column>							
							<Column width={13}>
								<Input fluid className="Tasklist_TaskNameInput" defaultValue={taskName} onChange={this.inputChange}/>
							</Column>
							{/* <Button basic icon='content' className="SortBtn" /> */}
						</Row>
					)}
				</Grid>
			</Item>);
	}
}

/**
 * class TaskList
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {bool} isTaskCompleted - isTaskCompleted
 * @receiveProps {bool} editMode - editMode
 */
class TaskList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowTaskLists: true
		}

		this.taskListItemCallback = this.taskListItemCallback.bind(this);
	}
	taskListItemCallback(o) {
		const {isDeleteTask, isCompleteTask} = o;

		if (isDeleteTask != undefined && isDeleteTask) {
			this.setState({
				isShowTaskLists: false
			}, () => {
				this.setState({
					isShowTaskLists: true
				});
			});
		}

		if (isCompleteTask != undefined && isCompleteTask) {

			this.setState({
				isShowTaskLists: false
			}, () => {
				this.setState({
					isShowTaskLists: true
				});
			});
		}
	};
	render() {
		const {taskType, isTaskCompleted, editMode} = this.props;
		const {isShowTaskLists} = this.state;

		const filterdTasks = tasks.filter(task => {
			const {taskType: t, isTaskCompleted: c} = task;
			return t === taskType && c === isTaskCompleted;
		});
		const isfilterdTasksNotEmpty = filterdTasks.length > 0;


		return (
				<div>
					{isShowTaskLists && isfilterdTasksNotEmpty ? (
						<Menu fluid vertical>
							{filterdTasks.map((task, index) => (<TaskListItem key={index} task={task} editMode={editMode} taskListItemCallback={this.taskListItemCallback}/>))}
						</Menu>
					) : null}
				</div>
			);
	}
}

/**
 * class TaskTypeSelector
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {string} taskTypes - current taskTypes
 * @receiveProps {function} taskTypeSelectorCallback
 	{string} value
 */
class TaskTypeSelector extends React.Component {
	constructor(props) {
		super(props);

		this.dropdownChange = this.dropdownChange.bind(this);
	}
	dropdownChange(ev, result) {
		const {value} = result;
		const {taskTypeSelectorCallback} = this.props;

		if (taskTypeSelectorCallback) {
			taskTypeSelectorCallback({
				value: value
			});
		}

		// set defaultSetting
		const isDayTaskType = G.isDayTaskType(value);
		const isLongTaskType = G.isLongTaskType(value);
		if (isDayTaskType) {
			defaultSetting.dayTask_taskType = value;
		}
		if (isLongTaskType) {
			defaultSetting.longTask_taskType = value;
		}
	}
	render() {
		const taskTypes = this.props.taskTypes;
		const taskTypesOptions = taskTypes.map((item) => {
			let text = getLanguageTextByTaskType(item);
			
			return ({text: text, value: item});
		});
		const selectValue = this.props.taskType || taskTypes[0];
		return (
			<div>
				<Dropdown fluid selection defaultValue={selectValue} options={taskTypesOptions} onChange={this.dropdownChange} />
			</div>
		);
	}
}



/**
 * class TaskListContainer
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {string} taskTypes - current taskTypes
 */
class TaskListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskType: this.props.taskType,
			isTaskCompleted: this.props.isCompleted,
			editMode: false,
			isShowTaskList: true
		}	

		this.taskTypeSelectorCallback = this.taskTypeSelectorCallback.bind(this);
		this.handleIsCompleteSwitchChange = this.handleIsCompleteSwitchChange.bind(this);
		this.editBtnClick = this.editBtnClick.bind(this);
	}
	taskTypeSelectorCallback(o) {
		const {value} = o;

		if (value != undefined) {
			this.setState({
				taskType: value
			});
		}
	}
	handleIsCompleteSwitchChange(active) {
		this.setState({
			isTaskCompleted: active
		});

		// set defaultSetting
		const {taskType} = this.state;
		const isDayTaskType = G.isDayTaskType(taskType);
		const isLongTaskType = G.isLongTaskType(taskType);
		if (isDayTaskType) {
			defaultSetting.dayTask_isCompleted = active;
		}
		if (isLongTaskType) {
			defaultSetting.longTask_isCompleted = active;
		}
	}
	editBtnClick() {
		this.setState((prevState) => ({
			editMode: !prevState.editMode
		}));
	}
	render() {	
		const {taskType, isTaskCompleted, editMode, isShowTaskList} = this.state;	
		const {taskTypes} = this.props;

		const isCompletesOptions = [
			{value: 1, text: '已完成'},
			{value: 0, text: '未完成'}
		];
		const defalutIsComplete = this.props.isCompleted;

		return (
			<div>
				<Grid padded>
					<Row>
						<Column width={6} verticalAlign='middle'>
							<TaskTypeSelector taskType={taskType} taskTypes={taskTypes} taskTypeSelectorCallback={this.taskTypeSelectorCallback} />
						</Column>
						<Column width={6} textAlign='center' verticalAlign='middle'>
							<Label className='isTaskCompletedSwitch'>
								<Switch value={isTaskCompleted}
										labels={{ on: '已完成', off: '未完成' }} 
										circleStyles={{ diameter: 24 }} 
										switchStyles={{ width: 90 }}
										onChange={this.handleIsCompleteSwitchChange} />
							</Label>
						</Column>
						<Column width={4} textAlign='center' verticalAlign='middle'>
							<Icon size='big' name={!editMode ? 'edit' : 'check'} color={!editMode ? 'blue' : 'green'} onClick={this.editBtnClick} />
						</Column>
					</Row>

				</Grid>
				{isShowTaskList ? (
					<div>
						<TaskList taskType={taskType} editMode={editMode} isTaskCompleted={isTaskCompleted} />
					</div>
				) : null}
			</div>
		);
	}
}

/**
 * class DayTaskContainer
 */
class DayTaskContainer extends React.Component {
	render() {
		const taskTypes = G.dayTaskTypes;		
		const {dayTask_taskType, dayTask_isCompleted} = defaultSetting;
		return <TaskListContainer taskType={dayTask_taskType} taskTypes={taskTypes} isCompleted={dayTask_isCompleted}/>;
	}
}

/**
 * class LongTaskContainer
 */
class LongTaskContainer extends React.Component {
	render() {
		const taskTypes = G.longTaskTypes;
		const {longTask_taskType, longTask_isCompleted} = defaultSetting;
		return <TaskListContainer taskType={longTask_taskType} taskTypes={taskTypes} isCompleted={longTask_isCompleted} />;
	}
}

/**
 * class MultiFunctionBtn
 * @receiveProps {function} multiFunctionBtnCallback
 	{bool} isClicked
 */
class MultiFunctionBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMenu: false,
			isOpenSetting: false,
			isMovingBtn: false
		}

		this.handleTapAddButton = this.handleTapAddButton.bind(this);

		this.handleClickFunctionBtn = this.handleClickFunctionBtn.bind(this);
		this.handleClickExportBtn = this.handleClickExportBtn.bind(this);
		this.handleClickSettingBtn = this.handleClickSettingBtn.bind(this);
	}
	handleClickFunctionBtn() {
		this.setState((prevState) => ({
			isShowMenu: !prevState.isShowMenu
		}));
	}
	handleTapAddButton(ev) {
		const {isMovingBtn} = this.state;

		if (!isMovingBtn) {
			this.props.multiFunctionBtnCallback({
				isAddBtnTaped: true
			});
			this.setState({
				isShowMenu: false
			});
		}
	}
	handleClickExportBtn() {
		this.setState({
			isShowMenu: false
		});
	}
	handleClickSettingBtn() {
		this.setState({
			isShowMenu: false,
			isOpenSetting: true
		});

	}
	render() {
		const {isShowMenu, isOpenSetting} = this.state;
		return (
			<div className='MultiFunctionBtn'>
				<Draggable>
					<div>
						<div style={getShowOrHideDomStyle(isShowMenu)}>
							<p>
								{/*<Button className='ovalButton' size='huge' icon='setting' circular color='brown' onClick={this.handleClickSettingBtn} />*/}
							</p>
							<p>
								{/*<Button className='ovalButton' size='huge' icon='sign out' circular color='violet' onClick={this.handleClickExportBtn} />*/}
							</p>
							<p>
								{/* <Button className='ovalButton' size='huge' icon='plus' circular color='blue' onClick={this.handleClickAddBtn} /> */}
							</p>
							<p>
							</p>
						</div>
						<p>
							{/* place add button here temporarily */}
							<Tappable   
								onTap={() => {
									this.handleTapAddButton();console.log('onTap');}
								} 
								onTouchMove={() => {
									console.log('onTouchMove');
									this.setState({
										isMovingBtn: true
									});
								}}
								onTouchStart={() => {
									console.log('onTouchStart');
									this.setState({
										isMovingBtn: false
									});
								}}
								onMouseDown={() => {
									console.log('onMouseDown');
									this.setState({
										isMovingBtn: false
									});
								}}
								onMouseMove={() => {
									console.log('onMouseMove');
									this.setState({
										isMovingBtn: true
									});
								}}
								>
								<Button id='floatFunctionBtn' className='ovalButton' size='massive' icon='plus' circular color='twitter' />
							</Tappable>

							{/*<Button className='ovalButton' size='huge' icon='ellipsis horizontal' circular color='twitter' onClick={this.handleClickFunctionBtn} />*/}
						</p>
					</div>
				</Draggable>
				{/*<Modal size='large' open={isOpenSetting} onClose={this.close}>
	        	  	<Modal.Header>
	        	  	    设置
	        	  	</Modal.Header>
	        	  	<Modal.Content>
	        	  	    <h5>邮箱</h5>
	        	  	    <Input fluid placeholder='此处输入邮箱地址' />
	        	  	</Modal.Content>
	        	  	<Modal.Actions>
	        	  	  <Button negative>
	        	  	      返回
	        	  	  </Button>
	        	  	  <Button positive icon='checkmark' labelPosition='right' content='确认' />
	        	  	</Modal.Actions>
	        	</Modal>*/}
			</div>
		);
	}
}


/**
 * class ToDoList
 */
class ToDoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			taskInfoMode: G.taskInfoMode.add,
			isShowTaskInfo: false,
			// Message
			isShowMessage: false,
			message: '',
			messageColor: 'red',
			task: null			
		};

		this.observeIsNeedShowTaskInfo();
		this.observeIsNeedShowMessage();

		this.tabChange = this.tabChange.bind(this);
		this.multiFunctionBtnCallback = this.multiFunctionBtnCallback.bind(this);
		this.taskInfoCallback = this.taskInfoCallback.bind(this);
	}
	tabChange(index) {
		defaultSetting.tabIndex = index;
	}
	multiFunctionBtnCallback(o) {
		const {isAddBtnTaped} = o;

		if (isAddBtnTaped != undefined && isAddBtnTaped) {
			this.setState({
				taskInfoMode:  G.taskInfoMode.add,
				isShowTaskInfo: true,
				task: null
			});
		}
	}
	taskInfoCallback(o) {
		const {isShowTaskInfo, isContinueToAddTask, isBackTask} = o;

		if (isShowTaskInfo != undefined  && !isShowTaskInfo) {
			this.setState({
				isShowTaskInfo: false
			});
		}
		if (isContinueToAddTask != undefined && isContinueToAddTask) {
			this.setState({
				isShowTaskInfo: false,
				task: null,
				taskInfoMode: G.taskInfoMode.add
			},  () => {
					this.setState({
						isShowTaskInfo: true
					});
				});
		}
		if (isBackTask != undefined && isBackTask) {
			this.setState({
				isShowTaskInfo: false,
				task: null
			});
		}
	}
	observeIsNeedShowTaskInfo() {
		observe(observe_taskInfo, (key, setting) => {
			let {task, taskInfoMode, isShowTaskInfo, isTransporting} = setting;

			if (isTransporting) {
				observe_taskInfo.setting.isTransporting = false;
				this.setState({
					isShowTaskInfo: isShowTaskInfo,
					taskInfoMode: taskInfoMode,
					task: task
				});	
				observe_taskInfo.setting.task = null;
			}
			
		});
	}
	observeIsNeedShowMessage() {
		observe(observe_message, (key, setting) => {
			let {isShowMessage, message, color} = setting;

			// animation
			this.setState({
				isShowMessage: isShowMessage,
				message: message,
				messageColor: color
			});
			setTimeout(() => {
				this.setState({
					isShowMessage: false,
					message: '',
					messageColor: color
				});
			},1000);			
		});
	}
	render() {
		const {taskInfoMode, isShowTaskInfo, task, isShowMessage, message, messageColor} = this.state;

		return (
			<div className='ToDoList' style={{
				width: '100%',
				height: '100%'
			}}>
				{isShowMessage ? (
					<div className='message' style={{
						position: 'fixed',
						width: windowWidth
					}}>
						<Message color={messageColor} content={message} />
					</div>
				) : null}
				  
				{isShowTaskInfo ? (
					<TaskInfo mode={taskInfoMode} task={task} taskInfoCallback={this.taskInfoCallback}/> 
				) : ''}
				<Tabs justified={true} initialSelectedIndex={defaultSetting.tabIndex} onChange={this.tabChange}>
		            <Tab label="长期目标">
		            	<LongTaskContainer />
		            </Tab>
		            <Tab label="今日目标">
		            	<DayTaskContainer />
		            </Tab>
		        </Tabs>
				<MultiFunctionBtn multiFunctionBtnCallback={this.multiFunctionBtnCallback}/>

				{/* <Input id='testInput' defaultValue='默认值' ref ={setSemanticInputInitialledFocus} /> */}

			</div>
			);
	}
}
















module.exports = ToDoList;