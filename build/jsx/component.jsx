import React,  { Component } from 'react';
import {render} from 'react-dom';
import { Button, Grid, Dropdown, Checkbox, Form, Input, Label, Segment, Icon, Menu } from 'semantic-ui-react'
import observe from '../js/observe.js';
import {getSingle} from '../js/tool.js';

// datepicker
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import DatePicker from 'rmc-date-picker/lib/index.web';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn.js';

var storekeeper = require('../js/storekeeper.js');

var settings = storekeeper.settings;
var tasks = storekeeper.tasks;
 
// Top varibles
const globalTaskTypes = ['today', 'long', 'thisWeek', 'thisMonth', 'thisYear', 'tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
const globalDayTaskTypes = ['today', 'tomorrow'];
const globalLongTaskTypes = ['long', 'thisYear', 'thisMonth', 'thisWeek', 'nextWeek', 'nextMonth', 'nextYear'];
const globalInitialTask = {
	name: '',
	taskType: 'day',
	taskLevel: 'b',
	isTaskNeedTimer: false,
	isTaskNeedRepeat: false
};

// test
setTimeout(() => {
	// tasks.push({name: 'task1', level: 'a'});
	// tasks[0].name = 'task3';
	console.dir(tasks[0]);
	// tasks[0].level = 'd';
	// settings.push({email: 'test1@testEmail.com'});
}, 1000);


/**
 * class TimeSetter
 * @receiveProps {moment} maxDate - current maxDate
 * @receiveProps {moment} minDate - current minDate
 * @receiveProps {moment} startDate - current startDate
 * @receiveProps {moment} endDate - current endDate
 * @receiveProps {function} timeSetterCallback 
 	@callback {moment} startDate - current startDate
 	@callback {moment} endDate - current endDate
 */
class TimeSetter extends React.Component {
	constructor(props) {
		super(props);
		this.timeType_startTime = 'startTime';
		this.timeType_endTime = 'endTime';
		this.timeType = this.props.timeType || this.timeType_startTime;

		this.state = {
			timeType: this.timeType,
			startDate: this.props.startDate,
			endDate: this.props.endDate
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
			timeType: this.timeType_startTime
		});
	}
	endTimeBtnClick() {
		this.setState({
			timeType: this.timeType_endTime
		});
	}
	cancelBtnClick() {
		
	}
	confirmBtnClick() {
		timeSetterCallback({
			startDate: this.state.startDate,
			endDate: this.state.endDate
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
		const {Column, Row} = Grid;	
		const {timeType} = this.state;	 
		const isStartTime = timeType === 'startTime';
		const isEndTime = timeType === 'endTime';

		const minDate = props.minDate;
		const maxDate = props.maxDate;
		const startDate = props.startDate;
		const endDate = props.endDate;
		return (
			<div style={{
				position: 'absolute',
				left: 0,
				top: 0,
				width: document.body.clientWidth,	
				height: document.body.clientHeight,
				background: 'white',
				border: '1px solid gray'
			}} ref={(div) => {
				let t = null; 
				if (div) { 
					t = div.getClientRects()[0].top;
				} 
				if (t) {
					div.style.top = -1 * t;
				}  
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
							<div style={{width: isStartTime ? '100%' : '0px', height: isStartTime ? 'auto' : '0px', overflow: 'hidden'}} >
								<Timepicker minDate={minDate} maxDate={maxDate} defaultDate={startDate} timepickerCallback={this.startTimepickerCallback}/>
							</div>
							<div style={{width: isEndTime ? '100%' : '0px', height: isEndTime ? 'auto' : '0px', overflow: 'hidden'}}>
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

/*// endTimepicker
class EndTimepicker extends React.Component{
	constructor(props) {
		super(props);
		this.defaultDate = moment().add(1,'hours').startOf('hour');
	}
	render() {
		const props = this.props;
		return <Timepicker defaultDate={this.defaultDate} />
	}
}

// startTimepicker
class StartTimepicker extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return <Timepicker />
	}
}*/

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
		var that = this;
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
 		var getCurrentMoments = dateType => ([moment().startOf(dateType), moment().add(1, dateType + 's').startOf(dateType)]); 
 		var getNextMoments = dateType => ([moment().add(1, dateType + 's').startOf(dateType), moment().add(2, dateType + 's').startOf(dateType)]); 
 		const dayTaskTypeMoments = getCurrentMoments('day');
 		const longTaskTypeMoments = [moment(), moment().add(2, 'days').startOf('day')];
 		const weekTaskTypeMoments = getCurrentMoments('week');
 		const monthTaskTypeMoments = getCurrentMoments('month');
 		const yearTaskTypeMoments = getCurrentMoments('year');
 		const tomorrowTaskTypeMoments =  getNextMoments('day');
 		const nextWeekTaskTypeMoments =  getNextMoments('week');
 		const nextMonthTaskTypeMoments = getNextMoments('month');
 		const nextYearTaskTypeMoments =  getNextMoments('year');
 		this.taskTypeMomentsMap = new Map([
 			['today', dayTaskTypeMoments],
 			['long', longTaskTypeMoments],
 			['thisWeek', weekTaskTypeMoments],
 			['thisMonth', monthTaskTypeMoments],
 			['thisYear', yearTaskTypeMoments],
 			['tomorrow', tomorrowTaskTypeMoments],
 			['nextWeek', nextWeekTaskTypeMoments],
 			['nextMonth', nextMonthTaskTypeMoments],
 			['nextYear', nextYearTaskTypeMoments]
 		]);

 		this.state = {
 			taskType: task.taskType || 'day',
 			taskLevel: task.taskLevel || 'b',
 			isTaskNeedTimer: task.isTaskNeedTimer || false,
 			isTaskNeedRepeat: task.isTaskNeedRepeat || false,
 			isNeedTimeSetter: true
 		};

		this.currentTaskTypeMoments = this.taskTypeMomentsMap.get(this.state.taskType);

		this.taskTypeDropdownChange = this.taskTypeDropdownChange.bind(this);
		this.isTaskNeedTimerCheckboxClick = this.isTaskNeedTimerCheckboxClick.bind(this);
		this.isTaskNeedRepeatClick = this.isTaskNeedRepeatClick.bind(this);
	}	
	taskTypeDropdownChange(e, result) {
		const value = result.value;
		let {task} = this.props;

		task.taskType = value;
	}
	isTaskNeedTimerCheckboxClick(e, result) {
		const checked = result.checked;
		let {task} = this.props;

		this.setState({
		isTaskNeedTimer: !checked
		});
		task.isTaskNeedTimer = !checked;
	}
	isTaskNeedRepeatClick(e, result) {
		const checked = result.checked;
		let {task} = this.props;

		this.setState({
		isTaskNeedRepeat: !checked
		});
		task.isTaskNeedRepeat = !checked;
	}
	render() {
		let {task} = this.props;
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
		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter} = this.state;
		const {Row, Column} = Grid;

		console.log(isNeedTimeSetter);
		return (
			<div>
				{  isNeedTimeSetter ? <TimeSetter  /> : ''  }
				<Grid style={{border: '1px solid orange', display: isNeedTimeSetter ? 'none' : 'block'}}>
	               

					<Row centered>
						<Column width={14}>
							<Dropdown fluid selection className='TaskTypeSelector' defaultValue={taskType} options={taskTypesOptions} onChange={this.taskTypeDropdownChange} ></Dropdown>
						</Column>
					</Row>
					<Row centered>
						<Column width={8} textAlign='right'>
							<Checkbox label='定时' defaultChecked={isTaskNeedTimer} onClick={this.isTaskNeedTimerCheckboxClick} />
						</Column>
						<Column width={8}>
							<Checkbox label='重复' defaultChecked={isTaskNeedRepeat} onClick={this.isTaskNeedRepeatClick} />
						</Column>
					</Row>
					<Row centered>
						<Column width={6}>
							<Segment>
								startTimeJsx...
							</Segment>
						</Column>
						<Column width={2} textAlign='center' verticalAlign='middle'>
						
						</Column>
						<Column width={6}>
							<Segment>
								endTimeJsx...
							</Segment>
						</Column>
					</Row>
				</Grid>
			</div>
		);
	}

}



/**
 * class TaskLevelButtons
 * @receiveProps {object} task - current task
 */
class TaskLevelButtons extends React.Component {
	constructor(props) {
		super(props);

		let {task} = this.props;
		this.state = {
			level: task.taskLevel || 'b'
		}
		this.setLevel = this.setLevel.bind(this);
	}
	setLevel(level) {
		let {task} = this.props;
		this.setState({
			level: level
		});
		task.taskLevel = level;
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
			<div style={{textAlign: 'center', border: '1px solid red'}}>
				{buttons}
			</div>
		);
	}
}


/**
 * class TaskInfo
 * @receiveProps {object} task - task
 */
class TaskInfo extends React.Component {
	constructor(props) {
		super(props);

		this.modes = ['add', 'edit'];		
		/* temp type before citing this.props.task.taskType */
		this.defaultTaskType='today';
		/* temp type before citing this.props.task.taskLevel */
		this.defaultTaskLevel='b';
		this.state = {
			mode: 'add',
			taskType: this.defaultTaskType,
			taskLevel: this.defaultTaskLevel,
			/* temp set isTaskNeedTimer to false*/
			isTaskNeedTimer: false,
			isTaskNeedRepeat: false,
			/* temp set isNeedTimeSetter to true*/
			isNeedTimeSetter: true,
			startTimeDate: null,
			endTimeDate: null
		};



		/* temp set task equals tasks[0] */
		// ====== init the first object of tasks ======
		// if there's no task, add one
		this.tempTask = tasks[0] || ( ( () => {tasks.push(globalInitialTask);return tasks[0];} )() );

		}
	componentDidMount() {
		/*const {currentTaskTypeMoments: c} = this;
		this.setState({
			startTimeDate: c[0],
			endTimeDate: c[1]
		});*/
	}
	render() {
		
		let {taskType, taskLevel, isTaskNeedTimer, isTaskNeedRepeat} = this.tempTask;
		// console.log(1, this.tempTask);

		/*const taskTypesOptions = globalTaskTypes.map((item, index) => {
			var text = '';
			switch (item) {
				case 'today': text = '今日目标';break;
				case 'long': text = '长期目标';break;
				case 'thisWeek': text = '本周目标';break;
				case 'thisMonth': text = '本月目标';break;
				case 'thisYear': text = '本年目标';break;
				case 'tomorrow': text = '明日目标';break;
				case 'nextWeek': text = '下周目标';break;
				case 'nextMonth': text = '下月目标';break;
				case 'nextYear': text = '明年目标';break;
				defaut: break;
			}
			return {text: text, value: item};
		});
		const isNeedTimeSetter = state.isNeedTimeSetter;
		
		var timeContentTemplate = (moment) => (
			moment ? (
			<div style={{textAlign: 'center'}}>
				<h3>{moment.format('HH:mm')}</h3>
				<p>{moment.format('YYYY/M/D')}</p>
			</div>) : ''
		);

		const startTime = timeContentTemplate(startTimeDate);
		const endTime = timeContentTemplate(endTimeDate);*/

		const {Row, Column} = Grid;
		return (
			<div>
				<Grid padded>
					<Row>
						<Column>
							<Button className='BackBtn' icon='angle left'/>
						</Column>
					</Row>
					<Row centered>
						<Column width={14}>
							<Input className='AddTask_TaskNameInput' placeholder='Task Content' fluid />
						</Column>	
					</Row>
					<Row centered>
						<Column width={14}>
							<TaskLevelButtons task={this.tempTask} />
						</Column>	
					</Row>
					{/*<Row centered>
						<Column width={14}>
							
						</Column>	
					</Row>*/}
					<Row centered>
						<Column width={16}>
							<TaskTypePanel task={this.tempTask} />
						</Column>
					</Row>
					{/*<Row centered>
						<Column width={6} textAlign='right'>
							<Button content='完成' />
						</Column>
						<Column width={6}>
							<Button content='继续添加' />
						</Column>
					</Row>*/}
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
		var task = this.props.task;

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
		var that = this;
		observe(tasks, () => {
			// storekeeper.sync();
			that.setState({
				tasks: tasks
			});
		});	
	}

	render() {
		const {taskType, taskIsCompleted} = this.props;

		var tasks = this.state.tasks;
		var filterdTasks = tasks.filter(task => {
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
		var singleText = <p>{taskTypes[0]}</p>
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
 */
class MultiFunctionBtn extends React.Component {
	render() {
		return <button>MultiFunctionBtn</button>;
	}
}


/**
 * class ToDoList
 */
class ToDoList extends React.Component {
	render() {
		return (
			<div style={{
				width: '100%',
				height: '100%'
			}}>
			    <TaskInfo />
				{/*<Grid>
				    <Grid.Row>
				      <Grid.Column width={8}>
				        <LongTaskContainer />
				      </Grid.Column>
				      <Grid.Column width={8}>
				        <DayTaskContainer />
				      </Grid.Column>
				    </Grid.Row>
				</Grid>
				<MultiFunctionBtn />*/}
			</div>
			);
	}
}
















module.exports = ToDoList;