import React from 'react'

import { 
	Grid, 
	Checkbox, 
	Input, 
	Label, 
	Icon,
	Menu
} from 'semantic-ui-react'
const {Item} = Menu
const {Row, Column} = Grid

import tool from '../util/tool'

import moment from 'moment'

import GV from '../util/globalVarible'

import storekeeper from '../util/storekeeper'
let tasks = storekeeper.tasks




/**
 * class TaskListItem
 * @receiveProps {number} key - key
 * @receiveProps {object} task - one task
 * @receiveProps {function} taskListItemCallback
 	{bool} isDeleteTask
 */
class TaskListItem extends React.Component {
	constructor(props) {
		super(props)

		/*this.state = {

		}*/

		this.textClick = this.textClick.bind(this)
		this.inputChange = this.inputChange.bind(this)
		this.deleteBtnClick = this.deleteBtnClick.bind(this)
		this.completeCheckboxClick = this.completeCheckboxClick.bind(this)
		this.labelClick = this.labelClick.bind(this)
	}
	textClick() {
		let {task} = this.props

		tool.observe_taskInfo.setting = {
			isShowTaskInfo: true,
			taskInfoMode: GV.taskInfoMode.edit,
			task: task,
			isTransporting: true
		}
	}
	labelClick() {
		let {task} = this.props

		tool.observe_taskInfo.setting = {
			isShowTaskInfo: true,
			taskInfoMode: GV.taskInfoMode.edit,
			task: task,
			isTransporting: true
		}
	}
	inputChange(ev, result) {
		const {value} = result
		let {task} = this.props

		/* modify name */
		task.name = value
	}
	deleteBtnClick() {
		let {task} = this.props
		const index = tasks.indexOf(task)
		const {taskListItemCallback} = this.props

		/* delete item */
		tasks.splice(index, 1)

		if (taskListItemCallback) {
			taskListItemCallback({
				isDeleteTask: true
			})
		}
		
	}
	completeCheckboxClick() {
		let {task} = this.props
		const {isTaskCompleted} = task
		const {taskListItemCallback} = this.props

		/* modify task is completed or not */
		task.isTaskCompleted = !isTaskCompleted

		if (taskListItemCallback) {
			taskListItemCallback({
				isCompleteTask: true
			})
		}

	}
	render() {
		let {task, editMode} = this.props

		const {name: taskName, taskType, isTaskCompleted, taskLevel, isTaskNeedRepeat} = task

		const color = (() => {
			switch (taskLevel) {
				case 'a':
					return 'red'
				case 'b':
					return 'orange'
				case 'c':
					return 'yellow'
				case 'd':
					return 'blue'
				default:
					return 'orange'
			}
		})()

		return( 
			<Item>
				<Grid>
					{!editMode ? (
						// normal mode
						<Row>
							<Column width={!isTaskCompleted ? 8 : 14} verticalAlign='middle'>
								<div onClick={this.textClick}>
									{taskName}
								</div>
							</Column>
							{!isTaskCompleted ? (
								<Column width={6} textAlign='right' verticalAlign='middle'>
									<Label className='taskTimeLabel' color={color} onClick={this.labelClick}>
										{tool.getLabelTextByMoments(task)}
										&nbsp;
										{isTaskNeedRepeat ? (
											<Icon name='repeat' size='mini' />
										) : null}
									</Label>
								</Column>
							) : ''}
							<Column width={2} textAlign='center' verticalAlign='middle'>
								<Checkbox checked={isTaskCompleted} onClick={this.completeCheckboxClick}/>
							</Column>
							
						</Row>
					) : (
						// edit mode
						<Row>
							<Column width={3} textAlign='center' verticalAlign='middle'>
								<Icon size='large' color='red' name='minus circle' onClick={this.deleteBtnClick}/>
							</Column>							
							<Column width={13}>
								<Input fluid className="Tasklist_TaskNameInput" defaultValue={taskName} onChange={this.inputChange}/>
							</Column>
							{/* <1 basic icon='content' className="SortBtn" /> */}
						</Row>
					)}
				</Grid>
			</Item>)
	}
}


export default TaskListItem