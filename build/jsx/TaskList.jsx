import React from 'react';

import TaskListItem from './TaskListItem.jsx';

import { 
	Menu
} from 'semantic-ui-react';

import moment from 'moment';

import G from '../js/globalVarible.js';

import storekeeper from '../js/storekeeper.js';
let tasks = storekeeper.tasks;


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

	componentDidMount() {
	    // update list realtime in real time
	    window.setInterval(() => {
	    	this.setState({
	    		isShowTaskLists: true
	    	});

	    	// update future taskType and show or do not show based on the condition of task repeat
			tasks.forEach( task => {
				const {taskType, isTaskNeedRepeat, isTaskCompleted} = task;
				const isFutureTaskType = G.futureTaskTypes.includes(taskType);
				const isLongTask = taskType === 'long';

				// update future taskType
				if (isFutureTaskType) {
					const taskDateType = G.taskTypesDateType[taskType]
					const normalStartDate = moment(task.startDate).startOf(taskDateType);
					const isNeedChange = moment().isSameOrAfter(normalStartDate);
					let newTaskType = null;
					if (isNeedChange) {
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
				}
				
				// judge the condition of task repeat
				if (isTaskNeedRepeat && !isFutureTaskType && !isLongTask && isTaskCompleted) {
					const startDate = moment(task.startDate);
					const endDate = moment(task.endDate);
					const taskDateType = G.taskTypesDateType[taskType];
					const normalStartDate = moment(endDate.format()).endOf(taskDateType);
					const isNeedChange = moment().isSameOrAfter(normalStartDate)
					const timeInterval = moment().startOf(taskDateType).diff(moment(startDate.format()).startOf(taskDateType), taskDateType + 's');
					const newStartDate = moment(startDate.format()).add(timeInterval, taskDateType + 's');
					const newEndDate = moment(endDate.format()).add(timeInterval, taskDateType + 's');

					if (isNeedChange) {
						task.isTaskCompleted = false;
						task.startDate = newStartDate;
						task.endDate = newEndDate;

					}
				}
			} );

	    },3000);

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
	}

	render() {
		const {taskType, isTaskCompleted, editMode} = this.props;
		const {isShowTaskLists} = this.state;

		const filterdTasks = tasks.filter(task => {
			const {taskType: t, isTaskCompleted: c} = task;
			return t === taskType && c === isTaskCompleted;
		});
		const isfilterdTasksNotEmpty = filterdTasks.length > 0;


		return (
				<div className='TaskList'>
					{isShowTaskLists && isfilterdTasksNotEmpty ? (
						<Menu fluid vertical>
							{filterdTasks.map((task, index) => (<TaskListItem key={index} task={task} editMode={editMode} taskListItemCallback={this.taskListItemCallback}/>))}
						</Menu>
					) : null}
				</div>
			);
	}
}


export default TaskList;