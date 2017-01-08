import React from 'react';

import TaskInfo from './TaskInfo.jsx';
import DayTaskContainer from './DayTaskContainer.jsx';
import LongTaskContainer from './LongTaskContainer.jsx';
import MultiFunctionBtn from './MultiFunctionBtn.jsx';

import { 
	Message
} from 'semantic-ui-react';

import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

import observe from '../js/observe.js';

import tool from '../js/tool.js';

import moment from 'moment';

import G from '../js/globalVarible.js';

import storekeeper from '../js/storekeeper.js';
let tasks = storekeeper.tasks;
let defaultSetting = storekeeper.settings[0].defaultSetting;


/**
 * class ToDoList
 */
class ToDoList extends React.Component {
	constructor(props) {
		super(props);

		// init data
		if (tasks.length === 0) {
			tasks.push({
				name: '第一个今日目标',
				taskType: 'today',
				taskLevel: G.taskLevels.a,
				isTaskCompleted: false,
				isTaskNeedTimer: true,
				isTaskNeedRepeat: false,
				startDate: moment(),	
				endDate: moment().endOf('day'),
				sortNum: 0
			});
			tasks.push({
				name: '第一个长期目标',
				taskType: 'long',
				taskLevel: G.taskLevels.b,
				isTaskCompleted: false,
				isTaskNeedTimer: true,
				isTaskNeedRepeat: false,
				startDate: moment(),	
				endDate: moment().add(6, 'months'),
				sortNum: 1
			});
		}

		this.state = {
			taskInfoMode: G.taskInfoMode.add,
			isShowTaskInfo: false,
			// Message
			isShowMessage: false,
			message: '',
			messageColor: 'red',
			task: null			
		};

		this.observeIsNeedShowTaskInfo();
		this.observeIsNeedShowMessage();

		this.tabChange = this.tabChange.bind(this);
		this.multiFunctionBtnCallback = this.multiFunctionBtnCallback.bind(this);
		this.taskInfoCallback = this.taskInfoCallback.bind(this);
	}
	tabChange(index) {
		defaultSetting.tabIndex = index;

		// set taskTypeToAdd
		if (index === 0) {
			G.taskTypeToAddObj.target = G.taskTypeToAddObj.long;
		}
		if (index === 1) {
			G.taskTypeToAddObj.target = G.taskTypeToAddObj.day;
		}
	}
	multiFunctionBtnCallback(o) {
		const {isAddBtnTaped} = o;

		if (isAddBtnTaped != undefined && isAddBtnTaped) {
			this.setState({
				taskInfoMode:  G.taskInfoMode.add,
				isShowTaskInfo: true,
				task: null
			});
		}
	}
	taskInfoCallback(o) {
		const {isShowTaskInfo, isContinueToAddTask, isBackTask} = o;

		if (isShowTaskInfo != undefined  && !isShowTaskInfo) {
			this.setState({
				isShowTaskInfo: false
			});
		}
		if (isContinueToAddTask != undefined && isContinueToAddTask) {
			this.setState({
				isShowTaskInfo: false,
				task: null,
				taskInfoMode: G.taskInfoMode.add
			},  () => {
					this.setState({
						isShowTaskInfo: true
					});
				});
		}
		if (isBackTask != undefined && isBackTask) {
			this.setState({
				isShowTaskInfo: false,
				task: null
			}); 
		}
	}
	observeIsNeedShowTaskInfo() {
		observe(tool.observe_taskInfo, (key, setting) => {
			let {task, taskInfoMode, isShowTaskInfo, isTransporting} = setting;

			if (isTransporting) {
				tool.observe_taskInfo.setting.isTransporting = false;
				this.setState({
					isShowTaskInfo: isShowTaskInfo,
					taskInfoMode: taskInfoMode,
					task: task
				});	
				tool.observe_taskInfo.setting.task = null;
			}
			
		});
	}
	observeIsNeedShowMessage() {
		observe(tool.observe_message, (key, setting) => {
			let {isShowMessage, message, color} = setting;

			// animation
			this.setState({
				isShowMessage: isShowMessage,
				message: message,
				messageColor: color
			});
			setTimeout(() => {
				this.setState({
					isShowMessage: false,
					message: '',
					messageColor: color
				});
			},2000);			
		});
	}
	render() {
		const {taskInfoMode, isShowTaskInfo, task, isShowMessage, message, messageColor} = this.state;

		return (
			<div className='ToDoList' style={{
				width: '100%',
				height: '100%'
			}}>
				{isShowMessage ? (
					<div className='message' style={{
						position: 'fixed',
						width: G.windowWidth
					}}>
						<Message color={messageColor} content={message} />
					</div>
				) : null}
				  
				{isShowTaskInfo ? (
					<TaskInfo mode={taskInfoMode} task={task} taskInfoCallback={this.taskInfoCallback}/> 
				) : ''}
				<Tabs justified={true} initialSelectedIndex={defaultSetting.tabIndex} onChange={this.tabChange}>
		            <Tab label="长期目标">
		            	<LongTaskContainer />
		            </Tab>
		            <Tab label="今日目标">
		            	<DayTaskContainer />
		            </Tab>
		        </Tabs>
				<MultiFunctionBtn multiFunctionBtnCallback={this.multiFunctionBtnCallback}/>

			</div>
			);
	}
}


export default ToDoList;