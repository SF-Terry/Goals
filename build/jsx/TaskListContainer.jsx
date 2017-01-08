import React from 'react';

import TaskList from './TaskList.jsx';
import TaskTypeSelector from './TaskTypeSelector.jsx';

import { 
	Grid,
	Label, 
	Icon 
} from 'semantic-ui-react';
const {Row, Column} = Grid;

import Switch from 'react-flexible-switch';

import moment from 'moment';

import G from '../js/globalVarible.js';

import storekeeper from '../js/storekeeper.js';
let defaultSetting = storekeeper.settings[0].defaultSetting;


/**
 * class TaskListContainer
 * @receiveProps {string} taskType - current taskType
 * @receiveProps {string} taskTypes - current taskTypes
 */
class TaskListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskType: this.props.taskType,
			isTaskCompleted: this.props.isCompleted,
			editMode: false,
			isShowTaskList: true
		}	

		this.taskTypeSelectorCallback = this.taskTypeSelectorCallback.bind(this);
		this.handleIsCompleteSwitchChange = this.handleIsCompleteSwitchChange.bind(this);
		this.editBtnClick = this.editBtnClick.bind(this);
	}
	taskTypeSelectorCallback(o) {
		const {value} = o;

		if (value != undefined) {
			this.setState({
				taskType: value
			});
		}
	}
	handleIsCompleteSwitchChange(active) {
		this.setState({
			isTaskCompleted: active
		});

		// set defaultSetting
		const {taskType} = this.state;
		const isDayTaskType = G.isDayTaskType(taskType);
		const isLongTaskType = G.isLongTaskType(taskType);
		if (isDayTaskType) {
			defaultSetting.dayTask_isCompleted = active;
		}
		if (isLongTaskType) {
			defaultSetting.longTask_isCompleted = active;
		}
	}
	editBtnClick() {
		this.setState((prevState) => ({
			editMode: !prevState.editMode
		}));
	}
	render() {	
		const {taskType, isTaskCompleted, editMode, isShowTaskList} = this.state;	
		const {taskTypes} = this.props;

		const isCompletesOptions = [
			{value: 1, text: '已完成'},
			{value: 0, text: '未完成'}
		];
		const defalutIsComplete = this.props.isCompleted;

		// set taskTypeToAdd
		const isLongTaskType = G.longTaskTypes.includes(taskType);
		if (isLongTaskType) {
			G.taskTypeToAddObj.long = taskType;
		} else {
			G.taskTypeToAddObj.day = taskType;
		}
		G.taskTypeToAddObj.target = defaultSetting.tabIndex === 0 ? G.taskTypeToAddObj.long : G.taskTypeToAddObj.day;



		return (
			<div className='TaskListContainer'>
				<Grid padded>
					<Row>
						<Column width={7} verticalAlign='middle'>
							<TaskTypeSelector taskType={taskType} taskTypes={taskTypes} taskTypeSelectorCallback={this.taskTypeSelectorCallback} />
						</Column>
						<Column width={6} textAlign='right' verticalAlign='middle'>
							<Label className='isTaskCompletedSwitch'>
								<Switch value={isTaskCompleted}
										labels={{ on: '已完成', off: '未完成' }} 
										circleStyles={{ diameter: 24 }} 
										switchStyles={{ width: 90 }}
										onChange={this.handleIsCompleteSwitchChange} />
							</Label>
						</Column>
						<Column width={3} textAlign='center' verticalAlign='middle'>
							<Icon size='big' name={!editMode ? 'edit' : 'check'} color={!editMode ? 'blue' : 'green'} onClick={this.editBtnClick} />
						</Column>
					</Row>

				</Grid>
				{isShowTaskList ? (
					<div>
						<TaskList taskType={taskType} editMode={editMode} isTaskCompleted={isTaskCompleted} />
					</div>
				) : null}
			</div>
		);
	}
}


export default TaskListContainer;