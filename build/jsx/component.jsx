import React,  { Component } from 'react';
import {render} from 'react-dom';
import { Button, Grid, Dropdown } from 'semantic-ui-react'
var storekeeper = require('../js/storekeeper.js');

/* test storekeeper start */
console.dir(storekeeper);
let interval = 1000;

// email
// add, modify, delete
setTimeout(() => {storekeeper.settings.push({email: 'test1@todolist.com'}); console.log("email adding");}, interval + 1000);
setTimeout(() => {storekeeper.settings[0].email = 'test2@todolist.com'; console.log("email modifiing");}, interval + 1000);
setTimeout(() => {storekeeper.settings.splice(0,1); console.log("email deleting");  console.log("Testing email completed!"); }, interval + 1000);

// tasks
// add modify delete
setTimeout(() => {storekeeper.tasks.push({name: 'task1', level: 'a'}); console.log("task adding");}, interval + 1000);
setTimeout(() => {storekeeper.tasks[0].name = 'task2'; console.log("task modifiing");}, interval + 1000);
setTimeout(() => {storekeeper.tasks[0].level = 'b'; console.log("task modifiing");}, interval + 1000);
setTimeout(() => {storekeeper.tasks.splice(0,1); console.log("task deleting");  console.log("Testing task completed!"); }, interval + 1000);

/* test storekeeper end */



// ListContainer
class ListContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				ListContainer
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