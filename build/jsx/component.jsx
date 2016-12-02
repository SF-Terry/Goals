import React,  { Component } from 'react';
import {render} from 'react-dom';
import { Button, Grid, Dropdown, Checkbox, Form, Input, Segment } from 'semantic-ui-react'
import observe from '../js/observe.js';
// datepicker
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import DatePicker from 'rmc-date-picker/lib/index.web';
import zhCn from 'rmc-date-picker/lib/locale/en_US';
import moment from 'moment';
import 'moment/locale/en-gb.js';

var storekeeper = require('../js/storekeeper.js');

var settings = storekeeper.settings;
var tasks = storekeeper.tasks;
	
// test
setTimeout(() => {
	// tasks.push({name: 'task2', level: 'a'});
	// tasks[0].name = 'task2';
	// tasks[0].level = 'b';
	// settings.push({email: 'test1@testEmail.com'});
}, 1000);


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

		const minDate = props.minDate || moment([2015, 8, 15, 0, 0, 0]);
		const maxDate = props.maxDate || moment([2018, 1, 1, 22, 0, 0]);
		const now = moment();
		minDate.locale('en-gb').utcOffset(8);
		maxDate.locale('en-gb').utcOffset(8);
		now.locale('en-gb').utcOffset(8);
		function format(date) {
		  return date.format('YYYY-MM-DD HH:mm');
		}
	    

	    return (<div style={{ margin: '10px 30px' }}>
	      <div>
	        <span>{date && format(date) || format(now)}</span>
	        <DatePicker
	          rootNativeProps={{'data-xx':'yy'}}
	          defaultDate={date || now}
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
		this.modes = ['add', 'edit'];
		this.state = {
			mode: 'add'
		};
	}
	render() {
		const modes = this.modes;
		const modesOptions = modes.map((item, index) => ({text: item, value: index}));
		const selectValue = modes.indexOf('add');
		return (
			<div>
				<div>
					<Button className='BackBtn' icon='angle left'/>
				</div>
            	<div>
                	<Input className='AddTask_TaskNameInput' label='Name' placeholder='Type the task' fluid />
            	</div>
            	<div>
            		<Button content='Type' />
                	<Dropdown className='TaskTypeSelector' defaultValue={selectValue}  selection options={modesOptions}></Dropdown>
                </div>
                <div>
                	<Button content='StartTime' />
                	<Timepicker />
                </div>
				
				

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
		return (
			<div>
				{tasks.map((task, index) => (<TaskListItem key={index} task={task}/>))}
			</div>);
	}
}

// ListContainer
class ListContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const taskTypes = this.props.taskTypes;
		const taskType = this.props.taskType;
		return (
			<div>
				<TaskList taskTypes={taskTypes} taskType={taskType}  />
			</div>
		);
	}
}

// TitleBar
class TitleBar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const taskTypes = this.props.taskTypes;
		const taskTypesOptions = taskTypes.map((item, index) => ({text: item, value: index}));
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
				<ListContainer />
			</div>
		);
	}
}

// DayTaskContainer
class DayTaskContainer extends React.Component {
	render() {
		const taskTypes = ['day'];		
		return <TaskListContainer taskType={taskTypes[0]} taskTypes={taskTypes} />;
	}
}

// LongTaskContainer
class LongTaskContainer extends React.Component {
	render() {
		const taskTypes = ['long', 'year', 'month', 'week'];
		return <TaskListContainer taskType={taskTypes[0]} taskTypes={taskTypes}/>;
	}
}

// MultiFunctionBtn
class MultiFunctionBtn extends React.Component {
	render() {
		const taskTypes = ['long', 'year', 'month', 'week'];
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