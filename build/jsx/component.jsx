import React,  { Component } from 'react';
import {render} from 'react-dom';
import { Button, Grid, Dropdown, Checkbox, Form, Input, Segment } from 'semantic-ui-react'
import observe from '../js/observe.js';
let storekeeper = require('../js/storekeeper.js');
let settings = storekeeper.settings;
let tasks = storekeeper.tasks;
	
// test
setTimeout(() => {
	// tasks.push({name: 'task2', level: 'a'});
	// tasks[0].name = 'task2';
	// tasks[0].level = 'b';
	// settings.push({email: 'test1@testEmail.com'});
}, 1000);



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
				<Grid>

				    <Grid.Column></Grid.Column>
				    <Grid.Column width={14}>
				        <Form>
				            <Form.Field inline>
				                <Input className='AddTask_TaskNameInput' label='Name' placeholder='Type the task' fluid />
				            </Form.Field>
				            <Form.Field inline>
				            	<Button content='Type' />
				                <Dropdown className='TaskTypeSelector' defaultValue={selectValue}  selection options={modesOptions}></Dropdown>
				            </Form.Field>
				        </Form>
				    </Grid.Column>
				    <Grid.Column></Grid.Column>
				  </Grid>
				
				

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