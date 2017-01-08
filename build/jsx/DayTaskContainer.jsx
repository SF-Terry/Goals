import React from 'react';

import TaskListContainer from './TaskListContainer.jsx';

import G from '../js/globalVarible.js';

import storekeeper from '../js/storekeeper.js';
let defaultSetting = storekeeper.settings[0].defaultSetting;


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


export default DayTaskContainer;