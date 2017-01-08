import React from 'react';

import TaskListContainer from './TaskListContainer.jsx';

import G from '../js/globalVarible.js';

import storekeeper from '../js/storekeeper.js';
let defaultSetting = storekeeper.settings[0].defaultSetting;


/**
 * class LongTaskContainer
 */
class LongTaskContainer extends React.Component {
	render() {
		const taskTypes = G.longTaskTypes;
		const {longTask_taskType, longTask_isCompleted} = defaultSetting;
		return <TaskListContainer taskType={longTask_taskType} taskTypes={taskTypes} isCompleted={longTask_isCompleted} />;
	}
}


export default LongTaskContainer;