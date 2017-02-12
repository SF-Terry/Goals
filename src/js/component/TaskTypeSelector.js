import React from 'react'

import { 
	Dropdown
} from 'semantic-ui-react'

import tool from '../util/tool'

import moment from 'moment'

import GV from '../util/globalVarible'

import storekeeper from '../util/storekeeper'
let defaultSetting = storekeeper.settings[0].defaultSetting


/**
 * class TaskTypeSelector
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {string} taskTypes - current taskTypes
 * @receiveProps {function} taskTypeSelectorCallback
 	{string} value
 */
class TaskTypeSelector extends React.Component {
	constructor(props) {
		super(props)

		this.dropdownChange = this.dropdownChange.bind(this)
	}
	dropdownChange(ev, result) {
		const {value} = result
		const {taskTypeSelectorCallback} = this.props

		if (taskTypeSelectorCallback) {
			taskTypeSelectorCallback({
				value: value
			})
		}

		// set defaultSetting
		const isDayTaskType = GV.isDayTaskType(value)
		const isLongTaskType = GV.isLongTaskType(value)
		if (isDayTaskType) {
			defaultSetting.dayTask_taskType = value
		}
		if (isLongTaskType) {
			defaultSetting.longTask_taskType = value
		}
	}
	render() {
		const taskTypes = this.props.taskTypes
		const taskTypesOptions = taskTypes.map((item) => {
			let text = tool.getLanguageTextByTaskType(item)
			
			return ({text: text, value: item})
		})
		const selectValue = this.props.taskType || taskTypes[0]
		return (
			<div>
				<Dropdown fluid selection defaultValue={selectValue} options={taskTypesOptions} onChange={this.dropdownChange} />
			</div>
		)
	}
}


export default TaskTypeSelector