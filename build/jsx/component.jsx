import React,  { Component } from 'react';
import {render} from 'react-dom';
import { Button, Grid, Dropdown } from 'semantic-ui-react'
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
		return <ul>
			{tasks.map((task, index) => (<li key={index}>{task.level}&nbsp;&nbsp;{task.name}</li>))}
		</ul>;
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
		const taskType = this.props.taskType;
		const selectValue = taskTypes.indexOf(taskType) || 0;
		const dropDown = <Dropdown fluid selection value={selectValue} options={taskTypes.map((item, index) => ({text: item, value: index}))}></Dropdown>
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


// ToDoList
class ToDoList extends React.Component {
	render() {
		return (
			<div>
				<Grid>
				    <Grid.Row>
				      <Grid.Column width={8}>
				        <LongTaskContainer />
				      </Grid.Column>
				      <Grid.Column width={8}>
				        <DayTaskContainer />
				      </Grid.Column>
				    </Grid.Row>
				  </Grid>
			</div>
			);
	}
}
















module.exports = ToDoList;