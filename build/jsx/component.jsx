import React,  { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import { Button, Grid, Checkbox, Form, Input, Label, Segment, Icon, Menu, Dropdown } from 'semantic-ui-react';
import Draggable from 'react-draggable'; 
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import observe from '../js/observe.js';
import {getSingle, getShowOrHideDomStyle} from '../js/tool.js';

// datepicker
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import DatePicker from 'rmc-date-picker/lib/index.web';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn.js';
import storekeeper from '../js/storekeeper.js';

const {Item} = Menu;
const {Row, Column} = Grid;


let rootDom = document.getElementById('app');

let settings = storekeeper.settings;
let tasks = storekeeper.tasks;
 
// Top varibles
const globalTaskTypes = ['today', 'long', 'thisWeek', 'thisMonth', 'thisYear', 'tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
const globalFutureTaskTypes = ['tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
const globalDayTaskTypes = ['today', 'tomorrow'];
const globalLongTaskTypes = ['long', 'thisYear', 'thisMonth', 'thisWeek', 'nextWeek', 'nextMonth', 'nextYear'];
const globalDefaultTaskType = 'today';

const globalTaskLevels = {
	a: 'a',
	b: 'b',
	c: 'c',
	d: 'd'
}
const globalDefaultLevel = globalTaskLevels.b;

const globalTaskInfoMode = {
	add: 'add',
	edit: 'edit'
}

const globalInitialTask = {
	name: null,
	taskType: globalDefaultTaskType,
	taskLevel: 'b',
	isTaskCompleted: false,
	isTaskNeedTimer: false,
	isTaskNeedRepeat: false,
	startDate: null,	// use moment(...) to initial string to moment object
	endDate: null,	// use moment(...) to initial string to moment object
};
const globalTimeSetterTimeType = {
	start: 'start',
	end: 'end'
}

// observe
let observe_isNeedShowTaskInfo = {
	setting: {
		isShowTaskInfo: false,
		taskInfoMode: globalTaskInfoMode.add,
		task: null,
		isTransporting: false
	}
};

// test
setTimeout(() => {
	
}, 3000);

// init data
if (tasks.length === 0) {
	tasks.push({
		name: '第一个今日目标',
		taskType: globalDefaultTaskType,
		taskLevel: globalTaskLevels.a,
		isTaskCompleted: false,
		isTaskNeedTimer: true,
		isTaskNeedRepeat: false,
		startDate: moment(),	
		endDate: moment().add(2, 'hours')
	});
	tasks.push({
		name: '第一个长期目标',
		taskType: globalTaskTypes.long,
		taskLevel: globalTaskLevels.b,
		isTaskCompleted: false,
		isTaskNeedTimer: true,
		isTaskNeedRepeat: false,
		startDate: moment(),	
		endDate: moment().add(2, 'months')
	});
}


/**
 * class TimeSetter
 * @receiveProps {moment} maxDate - current maxDate
 * @receiveProps {moment} minDate - current minDate
 * @receiveProps {moment} startDate - current startDate
 * @receiveProps {moment} endDate - current endDate
 * @receiveProps {string} timeType - globalTimeSetterTimeType.start or globalTimeSetterTimeType.end
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
		this.timeType = this.props.timeType || globalTimeSetterTimeType.start;

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
			timeType: globalTimeSetterTimeType.start
		});
	}
	endTimeBtnClick() {
		this.setState({
			timeType: globalTimeSetterTimeType.end
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
		const isStartTime = timeType === globalTimeSetterTimeType.start;
		const isEndTime = timeType === globalTimeSetterTimeType.end;

		const minDate = props.minDate;
		const maxDate = props.maxDate;
		const startDate = props.startDate;
		const endDate = props.endDate;
		return (
			<div className='TimeSetter' style={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: window.screen.availWidth,
				height: window.screen.availHeight,
				display: isNeedShow ? 'block' : 'none'
			}}>
				<Grid style={{marginTop: "20px"}}>
					<Row>
						<Column width={8} style={{textAlign: 'right'}}>
							<Button content='Start Time' basic={isStartTime ? false : true} primary={isStartTime ? true : false} onClick={this.startTimeBtnClick} />
						</Column>
						<Column width={8} style={{textAlign: 'left'}}>
							<Button content='End Time' basic={isEndTime ? false : true} primary={isEndTime ? true : false} onClick={this.endTimeBtnClick} />
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

 		// set taskTypeMomentsMap
 		const getCurrentMoments = dateType => ([moment().startOf(dateType), moment().add(1, dateType + 's').startOf(dateType)]); 
 		const getNextMoments = dateType => ([moment().add(1, dateType + 's').startOf(dateType), moment().add(2, dateType + 's').startOf(dateType)]); 
 		const dayTaskTypeMoments = getCurrentMoments('day');
 		// const longTaskTypeMoments = [moment(), moment().add(2, 'days').startOf('day')];
 		const longTaskTypeMoments = [moment(), moment().add(2, 'days').startOf('day')];
 		const weekTaskTypeMoments = getCurrentMoments('week');
 		const monthTaskTypeMoments = getCurrentMoments('month');
 		const yearTaskTypeMoments = getCurrentMoments('year');
 		const tomorrowTaskTypeMoments =  getNextMoments('day');
 		const nextWeekTaskTypeMoments =  getNextMoments('week');
 		const nextMonthTaskTypeMoments = getNextMoments('month');
 		const nextYearTaskTypeMoments =  getNextMoments('year');
 		this.taskTypeMomentsObj = {
 			'today': dayTaskTypeMoments,
 			'long': longTaskTypeMoments,
 			'thisWeek': weekTaskTypeMoments,
 			'thisMonth': monthTaskTypeMoments,
 			'thisYear': yearTaskTypeMoments,
 			'tomorrow': tomorrowTaskTypeMoments,
 			'nextWeek': nextWeekTaskTypeMoments,
 			'nextMonth': nextMonthTaskTypeMoments,
 			'nextYear': nextYearTaskTypeMoments
 		};
 		const defaultTaskTypeMoments = this.taskTypeMomentsObj['today'];

 		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, startDate, endDate} = this.props;

 		this.state = {
 			taskType: taskType,
 			isTaskNeedTimer: isTaskNeedTimer,
 			isTaskNeedRepeat: isTaskNeedRepeat,
 			isNeedTimeSetter: false,
 			timeSetterTimeType: globalTimeSetterTimeType.start,
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
		const {taskTypeMomentsObj} = this;
		const value = result.value;
		const {taskType, timeSetterTimeType, isNeedTimeSetter, isTaskNeedTimer} = this.state;
		const isLongTask = value == 'long';
		const isValueDifferent = value != taskType;		

		// reset isTaskNeedTimer if new result is different with old result
		if (isValueDifferent) {
			this.setState(() => ({
				taskType: value
			}), () => {
				this.setState({
					startDate:  taskTypeMomentsObj[this.state.taskType][0],
					endDate:  taskTypeMomentsObj[this.state.taskType][1],
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
	}
	isTaskNeedTimerCheckboxClick(e, result) {
		const {taskTypeMomentsObj} = this;
		const checked = result.checked;
		let {task} = this.props;
		const {isNeedTimeSetter, taskType} = this.state;
		const isFutureTaskType = globalFutureTaskTypes.includes(taskType);

		/* @Tansporting checked value: Only when past checked is true that change checked to false, if past checked is false, needing isConfirmSetting to change it */
		// if past checked is true 
		if (checked) {
			this.setState({
				isTaskNeedTimer: !checked
			});

			// hide  timeSetter and TimerPanel
			this.setState({
				isNeedTimeSetter: false,
				startDate: taskTypeMomentsObj[taskType][0],
				endDate: taskTypeMomentsObj[taskType][1]
			});
		}
		
		/* @Tansporting checked value:  tansport default parameter */
		if (!checked) {
			this.setState({
				isNeedTimeSetter: true,
				timeSetterTimeType: globalTimeSetterTimeType.start,
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
		const {taskTypeMomentsObj} = this;
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
					startDate: taskTypeMomentsObj[taskType][0],
					endDate: taskTypeMomentsObj[taskType][1]
				});
			}
			if (taskType === 'long') {
				this.setState({
					taskType: globalDefaultTaskType
				});
			}
		}
	}
	startDatePanelClick() {
		this.setState({
			isNeedTimeSetter: true,
			timeSetterTimeType: globalTimeSetterTimeType.start
		});
	}
	endDatePanelClick() {
		this.setState({
			isNeedTimeSetter: true,
			timeSetterTimeType: globalTimeSetterTimeType.end
		});
	}
	render() {
		let {taskTypeMomentsObj} = this;
		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, timeSetterTimeType, startDate, endDate} = this.state;
		const taskTypesOptions = globalTaskTypes.map((item, index) => {
			let text = '';
			switch (item) {
				case 'today': 
					text = '今日目标';break;
				case 'long': 
					text = '长期目标';break;
				case 'thisWeek': 
					text = '本周目标';break;
				case 'thisMonth': 
					text = '本月目标';break;
				case 'thisYear': 
					text = '本年目标';break;
				case 'tomorrow': 
					text = '明日目标';break;
				case 'nextWeek': 
					text = '下周目标';break;
				case 'nextMonth': 
					text = '下月目标';break;
				case 'nextYear': 
					text = '明年目标';break;
				defaut: break;
			}
			return {text: text, value: item};
		});
		const isNeedShowCheckboxGroup = taskType != 'long';
		const minDate = startDate;
		const maxDate = endDate;
		const {taskTypePanelCallback} = this.props;

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
							<Column width={8} textAlign='right'>
								<Checkbox label='定时' checked={isTaskNeedTimer} onClick={this.isTaskNeedTimerCheckboxClick} />
							</Column>
							<Column width={8}>
								<Checkbox label='重复' defaultChecked={isTaskNeedRepeat} onClick={this.isTaskNeedRepeatClick} />
							</Column>
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
				text: '重要紧急'
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
				<Button circular basic={buttonLevel != this.state.level} content={buttonsInfo[buttonLevel].text} color={buttonsInfo[buttonLevel].color} onClick={()=>{this.setLevel(buttonLevel)}} key={buttonLevel} />
			);
		}
		return (
			<div style={{textAlign: 'center'}}>
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

		this.tempTask = mode === globalTaskInfoMode.add ? Object.assign({}, globalInitialTask) : Object.assign({}, this.props.task);

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
		const isAddMode = mode === globalTaskInfoMode.add;
		const isEditMode = mode === globalTaskInfoMode.edit;
		let task = this.props.task;

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
		const isAddMode = mode === globalTaskInfoMode.add;

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
		const {mode} = this.props || globalTaskInfoMode.add;
		const {name, taskLevel, taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, startDate, endDate} = this.tempTask;

		return (
			<div className="TaskInfo" style={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: window.screen.availWidth,
				height: window.screen.availHeight
			}}>
				<Grid padded>
					{/*<Row>
						<Column>
							<Button className='BackBtn' icon='angle left' onClick={this.backBtnClick} />
						</Column>
					</Row>*/}
					<Row centered>
						<Column width={14}>
							<Input className='AddTask_TaskNameInput' defaultValue={name} placeholder='Task Content' onChange={this.taskNameInputChange} fluid />
						</Column>	
					</Row>
					<Row centered>
						<Column width={14}>
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
								{/* add mode */}
								{mode === globalTaskInfoMode.add ? (
									<Row centered>
										<Column width={12} >
											<Button content='继续添加' fluid color='teal' onClick={this.continueToAddBtn} />
										</Column>
									</Row>
								) : ''}

								<Row centered>
									<Column width={12} >
										<Button content='完成' fluid color='blue' onClick={this.completeBtnClick}/>
									</Column>
								</Row>
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
 */
class TaskListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			showTaskInfo: false
		};

		this.textClick = this.textClick.bind(this);
	}
	textClick() {
		let {task} = this.props;

		observe_isNeedShowTaskInfo.setting = {
			isShowTaskInfo: true,
			taskInfoMode: globalTaskInfoMode.edit,
			task: task,
			isTransporting: true
		}
	}
	render() {
		let {task} = this.props;

		const {editMode, showTaskInfo} = this.state;

		const {name: taskName, taskType, isTaskCompleted} = task;

		return( 
			<Item>
				<Grid>
					{!editMode ? (
						// normal mode
						<Row >
							<Column width={3}>
								<Checkbox className="CompleteBtn" />
							</Column>
							{/* <p className="TaskNameText" onClick={this.textClick}></p> */}
							
							<Column width={8}>
								<span onClick={this.textClick}>
									{taskName}
								</span>
							</Column>
							<Column width={5}>
								...
							</Column>
						</Row>
					) : (
						// edit mode
						<Row>
							<Column width={3} textAlign='center' verticalAlign='middle'>
								<Icon size='large' color='grey' name='remove' />
							</Column>							
							<Column width={13}>
								<Input fluid className="Tasklist_TaskNameInput" defaultValue={taskName} />
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
 */
class TaskList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {taskType, isTaskCompleted} = this.props;

		const filterdTasks = tasks.filter(task => {
			const {taskType: t, isTaskCompleted: c} = task;
			return t === taskType && c === isTaskCompleted;
		});
		const isfilterdTasksNotEmpty = filterdTasks.length > 0;
		return (
				isfilterdTasksNotEmpty ? (
					<Menu fluid vertical>
						{filterdTasks.map((task, index) => (<TaskListItem key={index} task={task}/>))}
					</Menu>
				) : null
			);
	}
}

/**
 * class TaskTypeSelector
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {string} taskTypes - current taskTypes
 * @receiveProps {function} taskTypeCallback - return current taskType
 * @receiveProps {function} isTaskCompletedCallback - return current isTaskCompleted
 */
class TaskTypeSelector extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const taskTypes = this.props.taskTypes;
		const taskTypesOptions = taskTypes.map((item) => ({text: item, value: item}));
		const taskType = this.props.taskType;
		const selectValue = taskType || 0;
		const dropDown = <Dropdown fluid selection defaultValue={selectValue} options={taskTypesOptions}></Dropdown>
		let singleText = <p>{taskTypes[0]}</p>
		const showContent = taskTypes.length > 1 ? dropDown : singleText;
		return (
			<div>
				{showContent}
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
			isTaskCompleted: false 
		}	
	}
	taskTypeChanged(changedTaskType) {
		this.setState({
			taskType: changedTaskType
		});
	}
	isTaskCompletedChanged(changedTaskIsCompleted) {
		this.setState({
			isTaskCompleted: changedTaskIsCompleted
		});
	}
	render() {	
		const {taskType, isTaskCompleted} = this.state;	
		const {taskTypes} = this.props;
		return (
			<div>
				<Grid padded>
					<Row>
						<Column width={6}>
							<TaskTypeSelector taskType={taskType} taskTypes={taskTypes} taskTypeCallback={this.taskTypeChanged} isTaskCompletedCallback={this.isTaskCompletedChanged}/>
						</Column>
						<Column width={6}>
							<Dropdown />
						</Column>
						<Column width={4} textAlign='center' verticalAlign='middle'>
							{/*<a style={{
								textDecoration: 'none'
							}}>编辑</a>*/}
							<Label color='blue'>
								编辑
							</Label>
						</Column>
					</Row>

				</Grid>
				<TaskList taskType={taskType} isTaskCompleted={isTaskCompleted} />
			</div>
		);
	}
}

/**
 * class DayTaskContainer
 */
class DayTaskContainer extends React.Component {
	render() {
		const taskTypes = globalDayTaskTypes;		
		return <TaskListContainer taskType={taskTypes[0]} taskTypes={taskTypes} />;
	}
}

/**
 * class LongTaskContainer
 */
class LongTaskContainer extends React.Component {
	render() {
		const taskTypes = globalLongTaskTypes;
		return <TaskListContainer taskType={taskTypes[0]} taskTypes={taskTypes}/>;
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
			isShowMenu: false
		}

		this.handleClickFunctionBtn = this.handleClickFunctionBtn.bind(this);
		this.handleClickAddBtn = this.handleClickAddBtn.bind(this);
		this.handleClickExportBtn = this.handleClickExportBtn.bind(this);
		this.handleClickSettingBtn = this.handleClickSettingBtn.bind(this);
	}
	handleClickFunctionBtn() {
		this.setState((prevState) => ({
			isShowMenu: !prevState.isShowMenu
		}));
	}
	handleClickAddBtn() {
		this.props.multiFunctionBtnCallback({
			isAddBtnClicked: true
		});
		this.state = {
			isShowMenu: false
		}
	}
	handleClickExportBtn() {
		this.state = {
			isShowMenu: false
		}
	}
	handleClickSettingBtn() {
		this.state = {
			isShowMenu: false
		}
	}
	render() {
		const {isShowMenu} = this.state;
		return (
			<div className='MultiFunctionBtn'>
				<Draggable>
					<div>
						
						<div style={getShowOrHideDomStyle(isShowMenu)}>
							<p>
								<Button className='ovalButton' size='huge' icon='setting' circular color='brown' onClick={this.handleClickSettingBtn} />
							</p>
							<p>
								<Button className='ovalButton' size='huge' icon='sign out' circular color='violet' onClick={this.handleClickExportBtn} />
							</p>
							<p>
								<Button className='ovalButton' size='huge' icon='plus' circular color='blue' onClick={this.handleClickAddBtn} />
							</p>
							<p>
							</p>
						</div>
						<p>
							<Button className='ovalButton' size='huge' icon='ellipsis horizontal' circular color='twitter' onClick={this.handleClickFunctionBtn} />
						</p>
					</div>
				</Draggable>
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
			taskInfoMode: globalTaskInfoMode.add,
			isShowTaskInfo: false,
			task: null
		};

		this.observeIsNeedShowTaskInfo();

		this.multiFunctionBtnCallback = this.multiFunctionBtnCallback.bind(this);
		this.taskInfoCallback = this.taskInfoCallback.bind(this);
	}
	multiFunctionBtnCallback(o) {
		const {isAddBtnClicked} = o;

		if (isAddBtnClicked != undefined && isAddBtnClicked) {
			this.setState({
				taskInfoMode:  globalTaskInfoMode.add,
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
				taskInfoMode: globalTaskInfoMode.add
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
		observe(observe_isNeedShowTaskInfo, (key, setting) => {
			let {task, taskInfoMode, isShowTaskInfo, isTransporting} = setting;

			if (isTransporting) {
				observe_isNeedShowTaskInfo.setting.isTransporting = false;
				this.setState({
					isShowTaskInfo: isShowTaskInfo,
					taskInfoMode: taskInfoMode,
					task: task
				});	
				observe_isNeedShowTaskInfo.setting.task = null;
			}
			
		});
	}
	render() {
		const {taskInfoMode, isShowTaskInfo, task} = this.state;

		return (
			<div className='ToDoList' style={{
				width: '100%',
				height: '100%'
			}}>
				{isShowTaskInfo ? (
					<TaskInfo mode={taskInfoMode} task={task} taskInfoCallback={this.taskInfoCallback}/> 
				) : ''}

				{/*<Grid>
				    <Row>
				      <Column width={8}>
				        
				      </Column>
				      <Column width={8}>
				        
				      </Column>
				    </Row>
				</Grid>*/}
				<Tabs justified={true} initialSelectedIndex={1}>
		            <Tab label="长期目标">
		            	<LongTaskContainer />
		            </Tab>
		            <Tab label="今日目标">
		            	<DayTaskContainer />
		            </Tab>
		        </Tabs>
				<MultiFunctionBtn multiFunctionBtnCallback={this.multiFunctionBtnCallback}/>
			</div>
			);
	}
}
















module.exports = ToDoList;