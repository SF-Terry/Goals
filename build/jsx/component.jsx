import React,  { Component } from 'react';
import {render} from 'react-dom';
import { Button, Grid, Dropdown, Checkbox, Form, Input, Label, Segment, Icon, Menu } from 'semantic-ui-react'
import observe from '../js/observe.js';
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

// test
setTimeout(() => {
	// tasks.push({name: 'task2', level: 'a'});
	// tasks[0].name = 'task2';
	// tasks[0].level = 'b';
	// settings.push({email: 'test1@testEmail.com'});
}, 1000);


// TimeSetter
class TimeSetter extends React.Component {
	constructor(props) {
		super(props);
		this.timeType_startTime = 'startTime';
		this.timeType_endTime = 'endTime';
		this.timeType = this.props.timeType || this.timeType_startTime;

		this.state = {
			timeType: this.timeType
		}
		this.startTimeBtnClick = this.startTimeBtnClick.bind(this);
		this.endTimeBtnClick = this.endTimeBtnClick.bind(this);
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
	render() {
		const {Column, Row} = Grid;	
		const {timeType} = this.state;	 
		const isStartTime = timeType === 'startTime';
		const isEndTime = timeType === 'endTime';
		return (
			<div>
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
								<StartTimepicker />
							</div>
							<div style={{width: isEndTime ? '100%' : '0px', height: isEndTime ? 'auto' : '0px', overflow: 'hidden'}}>
								<EndTimepicker />
							</div>
						</Column>
					</Row>
					<Row>
						<Column width={8} style={{textAlign: 'right'}}>
							<Button icon='remove' />
						</Column>
						<Column width={8} style={{textAlign: 'left'}}>
							<Button icon='checkmark' />
						</Column>
					</Row>
				</Grid>
			</div>);
	}
}

// endTimepicker
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
}

// Timepicker
class Timepicker extends React.Component {
	constructor(props) {
		super(props);
		var that = this;
		this.state = {
	        date: null,
	        test: 'empty'
	    };
	    // solve the problem: misleading 'this'
	    this.onDateChange = date => {
	    	that.setState({
	    		date: date
	    	});
	    };
	}

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


// TaskInfo
class TaskInfo extends React.Component {
	constructor(props) {
		super(props);
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
		

		this.modes = ['add', 'edit'];		
		/* temp types before citing this.props.taskType */
		this.defaultTaskType='today';
		this.state = {
			mode: 'add',
			taskType: this.defaultTaskType,
			/* temp set isNeedTimer to false*/
			isNeedTimer: false,
			isRepeat: false,
			/* temp set timeSetterOpening to true*/
			timeSetterOpening: true,
			startTimeDate: null,
			endTimeDate: null
		};

		this.currentTaskTypeMoments = this.taskTypeMomentsMap.get(this.state.taskType);

		this.taskTypeChange = this.taskTypeChange.bind(this);
		this.timeBtnClick = this.timeBtnClick.bind(this);
		this.isNeedTimerCheckboxClick = this.isNeedTimerCheckboxClick.bind(this);
		this.isRepeatCheckboxClick = this.isRepeatCheckboxClick.bind(this);
	}
	componentDidMount() {
		console.log('1', this.currentTaskTypeMoments);
		const {currentTaskTypeMoments: c} = this;
		this.setState({
			startTimeDate: c[0],
			endTimeDate: c[1]
		});
	}
	taskTypeChange(e, result) {
		const {value} = result;
		this.setState({
			taskType: value
		});
		// change isNeedTimer
		this.state.isNeedTimer = value === 'long' ? true : false;
		// set startTimeDate and endTimeDate
		const {currentTaskTypeMoments: c} = this;
	};
	timeBtnClick() {
		this.setState((prevState) => ({
			timeSetterOpening: !prevState.timeSetterOpening
		}));
	};
	isNeedTimerCheckboxClick(e, result) {
		this.setState((prevState) => ({
			isNeedTimer: !prevState.isNeedTimer
		}));
		
		// change startTimeDate and endTimeDate
		const {taskType: t, isNeedTimer} = this.state;
		const isNeedFromNow = (
				t === 'today' ||
				t === 'thisWeek' ||
				t === 'thisMonth' ||
				t === 'thisYear'
			);
		// isNeedTimer has changed, so use invertible value: !isNeedTimer
		if (!isNeedTimer && isNeedFromNow) {
			const m = moment();
			// set startTimeDate
			this.setState({
				startTimeDate: m
			}, () => {
				console.log('startTimeDate now: ' + this.state.startTimeDate.format());
			});
		}
		if (!isNeedTimer && !isNeedFromNow) {

		}
	};
	isRepeatCheckboxClick(e, result) {
		this.setState((prevState) => ({
			isRepeat: !prevState.isRepeat
		}));
	};
	render() {
		const {state, taskTypeMomentsMap} = this;
		const {taskType, isNeedTimer, isRepeat, startTimeDate, endTimeDate} = state;
		const taskTypesOptions = globalTaskTypes.map((item, index) => {
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
		const timeSetterOpening = state.timeSetterOpening;
		
		var timeContentTemplate = (moment) => (
			moment ? (
			<div style={{textAlign: 'center'}}>
				<h3>{moment.format('HH:mm')}</h3>
				<p>{moment.format('YYYY/M/D')}</p>
			</div>) : ''
		);

		const startTime = timeContentTemplate(startTimeDate);
		const endTime = timeContentTemplate(endTimeDate);

		console.log('startTimeDate in "Render": ', startTimeDate);

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
							<Dropdown fluid selection className='TaskTypeSelector' defaultValue={taskType} options={taskTypesOptions} onChange={this.taskTypeChange} ></Dropdown>
						</Column>	
					</Row>
					{taskType != 'long' ? (
						<Row centered>
							<Column width={5}>
								<Checkbox label='定时' checked={isNeedTimer} onClick={this.isNeedTimerCheckboxClick} />
							</Column>
							<Column width={5}>
								<Checkbox label='重复' checked={isRepeat} onClick={this.isRepeatCheckboxClick} />
							</Column>
							
						</Row>
						) : ''}
					{
						isNeedTimer ? (
							<Row centered>
								<Column width={6}>
									<Segment onClick={this.timeBtnClick}>
										{startTime}
									</Segment>
								</Column>
								<Column width={2} textAlign='center' verticalAlign='middle'>
								{ <Icon name='angle double right' size='large' /> }
								</Column>
								<Column width={6}>
									<Segment onClick={this.timeBtnClick}>
										{endTime}
									</Segment>
								</Column>
							</Row>
						) : ''
					}
					<Row centered>
						<Column width={6} textAlign='right'>
							<Button content='完成' />
						</Column>
						<Column width={6}>
							<Button content='继续添加' />
						</Column>
					</Row>
				</Grid>

                <div>
                </div>
                { timeSetterOpening ? <TimeSetter  /> : '' }
				
			</div>);
	}
}

// TaskListItem
class TaskListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false
		};
	}
	render() {
		var task = this.props.task;
		const taskTypes = this.props.taskTypes;
		const taskType = this.props.taskType;
		const content_normal =  <div>
									<Checkbox className="CompleteBtn" />
									<span className="TaskNameText">{task.name}</span>
									<span className="Remark">Remark</span>
								</div>;
		const content_editMode = <div>
									<Button basic icon='remove circle' className="DeleteBtn" />
									<input className="Tasklist_TaskNameInput" defaultValue={task.name} />
									<Button basic icon='content' className="SortBtn" />
								</div>;
		const content = this.state.editMode ? content_editMode : content_normal;
		return( 
			<div>
				{content}
				{this.props.children}
			</div>);
	}
}

// TaskList
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
		var tasks = this.state.tasks;
		const taskTypes = this.props.taskTypes;
		const taskType = this.props.taskType;
		return (
			<div>
				{tasks.map((task, index) => (<TaskListItem taskTypes={taskTypes} taskType={taskType} key={index} task={task}/>))}
			</div>);
	}
}


// TitleBar
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

// TaskListContainer
class TaskListContainer extends React.Component {
	constructor(props) {
		super(props);
		
	}
	render() {		
		return (
			<div>
				<TitleBar taskType={this.props.taskType} taskTypes={this.props.taskTypes} />
				<TaskList />
			</div>
		);
	}
}

// DayTaskContainer
class DayTaskContainer extends React.Component {
	render() {
		const taskTypes = globalDayTaskTypes;		
		return <TaskListContainer taskType={taskTypes[0]} taskTypes={taskTypes} />;
	}
}

// LongTaskContainer
class LongTaskContainer extends React.Component {
	render() {
		const taskTypes = globalLongTaskTypes;
		return <TaskListContainer taskType={taskTypes[0]} taskTypes={taskTypes}/>;
	}
}

// MultiFunctionBtn
class MultiFunctionBtn extends React.Component {
	render() {
		return <button>MultiFunctionBtn</button>;
	}
}


// ToDoList
class ToDoList extends React.Component {
	render() {
		return (
			<div>
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