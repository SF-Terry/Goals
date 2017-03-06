import React from 'react'

import TaskListContainer from './TaskListContainer'

import GV from '../util/global'

import storekeeper from '../util/storekeeper'
let defaultSetting = storekeeper.settings[0].defaultSetting


/**
 * class DayTaskContainer
 */
class DayTaskContainer extends React.Component {
	render() {
		const taskTypes = GV.dayTaskTypes		
		const {dayTask_taskType, dayTask_isCompleted} = defaultSetting
		return <TaskListContainer taskType={dayTask_taskType} taskTypes={taskTypes} isCompleted={dayTask_isCompleted}/>
	}
}


export default DayTaskContainer