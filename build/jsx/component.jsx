import React,  { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import { Button, Grid, Dropdown, Checkbox, Form, Input, Label, Segment, Icon, Menu } from 'semantic-ui-react'
import Draggable, {DraggableCore} from 'react-draggable'; 
import observe from '../js/observe.js';
import {getSingle, getShowOrHideDomStyle} from '../js/tool.js';

// datepicker
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import DatePicker from 'rmc-date-picker/lib/index.web';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn.js';

let storekeeper = require('../js/storekeeper.js');

let settings = storekeeper.settings;
let tasks = storekeeper.tasks;

let rootDom = document.getElementById('app');
 
// Top varibles
const globalTaskTypes = ['today', 'long', 'thisWeek', 'thisMonth', 'thisYear', 'tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
const globalFutureTaskTypes = ['tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
const globalDayTaskTypes = ['today', 'tomorrow'];
const globalLongTaskTypes = ['long', 'thisYear', 'thisMonth', 'thisWeek', 'nextWeek', 'nextMonth', 'nextYear'];
const globalDefaultTaskType = 'today';

const globalDefaultLevel = 'b';

const globalTaskInfoMode = {
	add: 'add',
	edit: 'edit'
}

const globalInitialTask = {
	name: '',
	taskType: globalDefaultTaskType,
	taskLevel: 'b',
	isTaskNeedTimer: false,
	isTaskNeedRepeat: false,
	createDate: null,	// use moment(...) to initial string to moment object
	startDate: null,	// use moment(...) to initial string to moment object
	endDate: null,	// use moment(...) to initial string to moment object
};
const globalTimeSetterTimeType = {
	start: 'start',
	end: 'end'
}
// test
setTimeout(() => {
	// tasks.push({name: 'task1', level: 'a'});
	// tasks[0].name = 'task3';
	// console.dir(tasks[0]);
	// tasks[0].level = 'd';
	// settings.push({email: 'test1@testEmail.com'});
}, 1000);


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
		const {Column, Row} = Grid;	
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
 * @receiveProps {object} task - current task
 */
class TaskTypePanel extends React.Component {
 	constructor(props) {
 		super(props);

 		let {task} = this.props;

 		// set taskTypeMomentsMap
 		let getCurrentMoments = dateType => ([moment().startOf(dateType), moment().add(1, dateType + 's').startOf(dateType)]); 
 		let getNextMoments = dateType => ([moment().add(1, dateType + 's').startOf(dateType), moment().add(2, dateType + 's').startOf(dateType)]); 
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

 		this.state = {
 			taskType: task.taskType || globalDefaultTaskType,
 			taskLevel: task.taskLevel || globalDefaultLevel,
 			isTaskNeedTimer: task.isTaskNeedTimer || false,
 			isTaskNeedRepeat: task.isTaskNeedRepeat || false,
 			isNeedTimeSetter: false,
 			timeSetterTimeType: globalTimeSetterTimeType.start,
 			/* parse task's string startdate and end date */
 			startDate: task.startDate ? moment(task.startDate) : defaultTaskTypeMoments[0],
 			endDate: task.endDate ? moment(task.endDate) : defaultTaskTypeMoments[1],
 		};

		this.taskTypeDropdownChange = this.taskTypeDropdownChange.bind(this);
		this.isTaskNeedTimerCheckboxClick = this.isTaskNeedTimerCheckboxClick.bind(this);
		this.isTaskNeedRepeatClick = this.isTaskNeedRepeatClick.bind(this);
		this.timeSetterCallback = this.timeSetterCallback.bind(this);
		this.startDatePanelClick = this.startDatePanelClick.bind(this);
		this.endDatePanelClick = this.endDatePanelClick.bind(this);
	}	
	componentDidMount() {

	}
	taskTypeDropdownChange(e, result) {
		const {taskTypeMomentsObj} = this;
		const value = result.value;
		let {task} = this.props;
		const {taskType, timeSetterTimeType, isNeedTimeSetter, isTaskNeedTimer} = this.state;
		const isLongTask = value == 'long';
		const isValueDifferent = value != taskType;

		// save task
		// task.taskType = value;

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
		let {task} = this.props;

		this.setState({
			isTaskNeedRepeat: !checked
		});
		// save task
		// task.isTaskNeedRepeat = !checked;
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
		let {task} = this.props;
		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, timeSetterTimeType, startDate, endDate} = this.state;
		const {Row, Column} = Grid;
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

		task.taskType = taskType;
		task.isTaskNeedTimer = isTaskNeedTimer;
		task.isTaskNeedRepeat = isTaskNeedRepeat;
		task.isNeedTimeSetter = isNeedTimeSetter;
		task.timeSetterTimeType = timeSetterTimeType;
		task.startDate = startDate;
		task.endDate = endDate;

		return (
			<div>
				{  isNeedTimeSetter ? <TimeSetter timeType={timeSetterTimeType} minDate={minDate} maxDate={maxDate} startDate={startDate} endDate={endDate} timeSetterCallback={this.timeSetterCallback} isNeedShow={isNeedTimeSetter}   /> : ''  }
				<Grid style={{border: '1px solid orange', display: isNeedTimeSetter ? 'none' : 'block'}}>
					<Row centered>
						<Column width={14}>
							<Dropdown fluid selection className='TaskTypeSelector' value={taskType} options={taskTypesOptions} onChange={this.taskTypeDropdownChange} ></Dropdown>
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
			</div>
		);
	}
}



/**
 * class TaskLevelButtons
 * @receiveProps {object} task - current task
 * @receiveProps {string} mode - current mode
 */
class TaskLevelButtons extends React.Component {
	constructor(props) {
		super(props);

		let {task} = this.props;

		console.log('TaskLevelButtons\'s level', task.taskLevel);

		this.state = {
			level: task.taskLevel || 'b'
		}

		this.setLevel = this.setLevel.bind(this);
	}
	setLevel(level) {
		this.setState({
			level: level
		});
	}
	render() {
		const {level} = this.state;
		let {task} = this.props;

		task.taskLevel = level;

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
			<div style={{textAlign: 'center', border: '1px solid red'}}>
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
 	{object} task
 */
class TaskInfo extends React.Component {
	constructor(props) {
		super(props);

		this.task = this.props.task || ( ( () => {tasks.push(Object.assign({}, globalInitialTask));return tasks[ 	tasks.length - 1 ];} )() );

		this.state = {
			mode: this.props.mode || globalTaskInfoMode.add,
			task: this.task
		};

		// this.backBtnClick = this.backBtnClick.bind(this);
		this.completeBtnClick = this.completeBtnClick.bind(this);
		// add mode
		this.continueToAddBtn = this.continueToAddBtn.bind(this);
	}
	/*backBtnClick() {
		this.setState({
			isShow: false
		});
	}*/
	completeBtnClick() {
		const {taskInfoCallback} = this.props;

		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isShowTaskInfo: false,
				task: this.task
			});
		}
	}
	// add mode
	continueToAddBtn() {
		const {taskInfoCallback} = this.props;

		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isContinueToAddTask: true,
				task: this.task
			});
		}
	}
	render() {
		const {mode, task} = this.state;
		// let {task} = this;

		const {Row, Column} = Grid;

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
							<Input className='AddTask_TaskNameInput' placeholder='Task Content' fluid />
						</Column>	
					</Row>
					<Row centered>
						<Column width={14}>
							<TaskLevelButtons task={task} />
						</Column>	
					</Row>
					<Row centered>
						<Column width={16}>
							<TaskTypePanel task={task} />
						</Column>
					</Row>
					<Row></Row>
					<Row>
						<Column width={16}>
							<Grid padded>
								<Row centered>
									<Column width={12} textAlign='right'>
										<Button content='完成' fluid color='blue' onClick={this.completeBtnClick}/>
									</Column>
								</Row>
								{/* addmode */}
								{mode === globalTaskInfoMode.add ? (
									<Row centered>
										<Column width={12} textAlign='right'>
											<Button content='继续添加' fluid color='teal' onClick={this.continueToAddBtn} />
										</Column>
									</Row>
								) : ''}
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
	}
	itemClick() {
		this.setState({
			showTaskInfo: true
		});
	}
	render() {
		let task = this.props.task;

		const {editMode, showTaskInfo} = this.state;

		const {taskType, taskIsCompleted} = task;

		const content_normal =  (
								<div>
									<Checkbox className="CompleteBtn" />
									<span className="TaskNameText" onClick={this.itemClick}>{task.name}</span>
									<span className="Remark">Remark</span>
								</div>
								);
		const content_editMode = (
								<div>
									<Button basic icon='remove circle' className="DeleteBtn" />
									<input className="Tasklist_TaskNameInput" defaultValue={task.name} />
									<Button basic icon='content' className="SortBtn" />
								</div>
								);
		return( 
			<div>
				{showTaskInfo ? <TaskInfo task={task} /> : ''}
				{editMode ? content_editMode : content_normal}
			</div>);
	}
}

/**
 * class TaskList
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {bool} taskIsCompleted - taskIsCompleted
 */
class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: tasks
		}
		this.observeChange();
	}

	observeChange() {
		let that = this;
		observe(tasks, () => {
			// storekeeper.sync();
			that.setState({
				tasks: tasks
			});
		});	
	}

	render() {
		const {taskType, taskIsCompleted} = this.props;

		let tasks = this.state.tasks;
		let filterdTasks = tasks.filter(task => {
			const {taskType: theTaskType, taskIsCompleted: theTaskIsCompleted} = task;
			return theTaskType === taskType && theTaskIsCompleted === taskIsCompleted;
		});
		return (
			<div>
				{filterdTasks.map((task, index) => (<TaskListItem key={index} task={task}/>))}
			</div>);
	}
}

/**
 * class TitleBar
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {string} taskTypes - current taskTypes
 * @receiveProps {function} taskTypeCallback - return current taskType
 * @receiveProps {function} taskIsCompletedCallback - return current taskIsCompleted
 */
class TitleBar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const taskTypes = this.props.taskTypes;
		const taskTypesOptions = taskTypes.map((item) => ({text: item, value: item}));
		const taskType = this.props.taskType;
		const selectValue = taskTypes.indexOf(taskType) || 0;
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
			taskIsCompleted: false 
		}
		
	}
	taskTypeChanged(changedTaskType) {
		this.setState({
			taskType: changedTaskType
		});
	}
	taskIsCompletedChanged(changedTaskIsCompleted) {
		this.setState({
			taskIsCompleted: changedTaskIsCompleted
		});
	}
	render() {	
		const {taskType, taskIsCompleted} = this.state;	
		const {taskTypes} = this.props;
		return (
			<div>
				<TitleBar taskType={taskType} taskTypes={taskTypes} taskTypeCallback={this.taskTypeChanged} taskIsCompletedCallback={this.taskIsCompletedChanged}/>
				<TaskList taskType={taskType} taskIsCompleted={taskIsCompleted} />
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
		const {isShowTaskInfo, isContinueToAddTask, task} = o;

		if (isShowTaskInfo != undefined  && !isShowTaskInfo) {
			this.setState({
				isShowTaskInfo: false,
				task: task
			});
		}
		if (isContinueToAddTask != undefined && isContinueToAddTask) {
			this.setState({
				isShowTaskInfo: true,
				task: null
			});
		}
	}
	render() {
		const {taskInfoMode, isShowTaskInfo, task} = this.state;
		console.log('task: ', task);
		return (
			<div className='ToDoList' style={{
				width: '100%',
				height: '100%'
			}}>
				{isShowTaskInfo ? (
					<TaskInfo mode={taskInfoMode} task={task}   taskInfoCallback={this.taskInfoCallback}/> 
				) : ''}
				{/*<TaskInfo mode={taskInfoMode} taskInfoCallback={this.taskInfoCallback}/>*/}

				<Grid>
				    {/*<Grid.Row>
				      <Grid.Column width={8}>
				        <LongTaskContainer />
				      </Grid.Column>
				      <Grid.Column width={8}>
				        <DayTaskContainer />
				      </Grid.Column>
				    </Grid.Row>*/}
				</Grid>
				<MultiFunctionBtn multiFunctionBtnCallback={this.multiFunctionBtnCallback}/>
			</div>
			);
	}
}
















module.exports = ToDoList;