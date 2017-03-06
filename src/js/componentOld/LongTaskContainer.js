import React from 'react'

import TaskListContainer from './TaskListContainer'

import GV from '../util/global'

import storekeeper from '../util/storekeeper'
let defaultSetting = storekeeper.settings[0].defaultSetting


/**
 * class LongTaskContainer
 */
class LongTaskContainer extends React.Component {
	render() {
		const taskTypes = GV.longTaskTypes
		const {longTask_taskType, longTask_isCompleted} = defaultSetting
		return <TaskListContainer taskType={longTask_taskType} taskTypes={taskTypes} isCompleted={longTask_isCompleted} />
	}
}


export default LongTaskContainer