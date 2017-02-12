import React from 'react'

import TaskTypePanel from './TaskTypePanel'
import TaskLevelButtons from './TaskLevelButtons'

import {Button, Grid, Input} from 'semantic-ui-react'
const {Row, Column} = Grid

import tool from '../util/tool'

import G from '../util/globalVarible'

import storekeeper from '../util/storekeeper'
let tasks = storekeeper.tasks


/**
 * class TaskInfo
 * @receiveProps {object} task - task
 * @receiveProps {bool} isShow	
 * @receiveProps {function} taskInfoCallback	
 	{bool} isContinueToAddTask
 	{bool} isShowTaskInfo
 	{bool} isBackTask
 */
class TaskInfo extends React.Component {
	constructor(props) {
		super(props)

		const {mode} = this.props

		this.tempTask = mode === G.taskInfoMode.add ? Object.assign({}, G.initialTask) : Object.assign({}, this.props.task)

		// add task sortNum
		if (mode === G.taskInfoMode.add) {
			this.tempTask.sortNum = tasks.length + 1
		}

		this.taskNameInputChange = this.taskNameInputChange.bind(this)
		this.completeBtnClick = this.completeBtnClick.bind(this)
		this.backBtnClick = this.backBtnClick.bind(this)

		// add mode
		this.continueToAddBtn = this.continueToAddBtn.bind(this)

		this.taskLevelButtonsCallback = this.taskLevelButtonsCallback.bind(this)
		this.taskTypePanelCallback = this.taskTypePanelCallback.bind(this)
	}
	taskNameInputChange(ev, result) {
		const {value} = result

		this.tempTask.name = value
	}
	completeBtnClick() {
		const {taskInfoCallback} = this.props
		const {mode} = this.props
		const isAddMode = mode === G.taskInfoMode.add
		const isEditMode = mode === G.taskInfoMode.edit
		let task = this.props.task
		const {name} = this.tempTask

		// check
		if (!name) {
			tool.observe_message.setting = {
				isShowMessage: true,
				message: '任务内容为空，请重新输入！',
				color: 'red'
			}
			return
		}

		// save
		if (isAddMode) {
			tasks.push(this.tempTask)
		}
		if (isEditMode) {
			Object.assign(task, this.tempTask)
		}


		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isShowTaskInfo: false
			})
		}
	}
	taskLevelButtonsCallback(o) {
		const {level} = o
		if (level) {
			this.tempTask.taskLevel = level
		}
	}
	taskTypePanelCallback(o) {
		const {taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, startDate, endDate} = o

		if (taskType) {
			this.tempTask.taskType = taskType
		}
		if (isTaskNeedTimer != undefined) {
			this.tempTask.isTaskNeedTimer = isTaskNeedTimer
		}
		if (isTaskNeedRepeat != undefined) {
			this.tempTask.isTaskNeedRepeat = isTaskNeedRepeat
		}
		if (startDate != undefined) {
			this.tempTask.startDate = startDate
		}
		if (endDate != undefined) {
			this.tempTask.endDate = endDate
		}
	}
	// add mode
	continueToAddBtn() {
		const {taskInfoCallback, mode} = this.props
		const isAddMode = mode === G.taskInfoMode.add
		let task = this.props.task
		const {name} = this.tempTask

		// check
		if (!name) {
			tool.observe_message.setting = {
				isShowMessage: true,
				message: '任务内容为空，请重新输入！',
				color: 'red'
			}
			return
		}

		// save
		// add mode
		if (isAddMode) {
			tasks.push(this.tempTask)
		}

		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isContinueToAddTask: true
			})
		}
	}
	// edit mode
	backBtnClick() {
		const {taskInfoCallback} = this.props
		if (taskInfoCallback != undefined) {
			taskInfoCallback({
				isBackTask: true
			})
		}
	}
	render() {
		const {mode} = this.props || G.taskInfoMode.add
		const {name, taskLevel, taskType, isTaskNeedTimer, isTaskNeedRepeat, isNeedTimeSetter, startDate, endDate} = this.tempTask

		return (
			<div className="TaskInfo" style={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: G.windowWidth,
				height: G.windowHeight
			}}>
				<Grid padded>
					{/*<Row>
						<Column>
							<Button className='BackBtn' icon='angle left' onClick={this.backBtnClick} />
						</Column>
					</Row>*/}
					<Row centered>
						<Column width={14}>
							<Input id='taskInfo_taskNameInput' defaultValue={name} placeholder='任务内容' onChange={this.taskNameInputChange} fluid ref={(o) => {
								if (o && o.props && o.props.id && mode == G.taskInfoMode.add) {
									let inputDom = document.getElementById(o.props.id).children[0]
									inputDom.focus()
								}
							}} />
						</Column>	
					</Row>
					<Row centered>
						<Column width={16}>
							<TaskLevelButtons level={taskLevel} taskLevelButtonsCallback={this.taskLevelButtonsCallback} />
						</Column>	
					</Row>
					<Row centered>
						<Column width={16}>
							<TaskTypePanel taskType={taskType} isTaskNeedTimer={isTaskNeedTimer} isTaskNeedRepeat={isTaskNeedRepeat} isNeedTimeSetter={isNeedTimeSetter} startDate={startDate} endDate={endDate} taskTypePanelCallback={this.taskTypePanelCallback}/>
						</Column>
					</Row>
					<Row></Row>
					<Row>
						<Column width={16}>
							<Grid padded>
								<Row centered>
									<Column width={12} >
										<Button content='完成' fluid color='blue' onClick={this.completeBtnClick}/>
									</Column>
								</Row>

								{/* add mode */}
								{mode === G.taskInfoMode.add ? (
									<Row centered>
										<Column width={12} >
											<Button content='继续添加' fluid color='teal' onClick={this.continueToAddBtn} />
										</Column>
									</Row>
								) : ''}

								<Row centered>
									<Column width={12} >
										<Button content='返回' fluid color='grey' onClick={this.backBtnClick} />
									</Column>
								</Row>
							</Grid>
						</Column>
					</Row>
				</Grid>
			</div>)
	}
}


export default TaskInfo