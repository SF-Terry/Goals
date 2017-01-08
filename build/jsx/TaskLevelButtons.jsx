import React from 'react';

import {Button} from 'semantic-ui-react';


/**
 * class TaskLevelButtons
 * @receiveProps {object} level - current level
 * @receiveProps {function} taskLevelButtonsCallback
 	{string} level
 */
class TaskLevelButtons extends React.Component {
	constructor(props) {
		super(props);

		let {level} = this.props;


		this.state = {
			level: level || 'b'
		}

		this.setLevel = this.setLevel.bind(this);
	}
	setLevel(level) {
		const {taskLevelButtonsCallback} = this.props;
		
		this.setState({
			level: level
		});

		if (taskLevelButtonsCallback) {
			taskLevelButtonsCallback({
				level: level
			});
		}
	}
	render() {
		const {level} = this.state;

		let buttonsInfo = {
			a: {
				color: 'red',
				text: '重急'
			},
			b: {
				color: 'orange',
				text: '重要'
			},
			c: {
				color: 'yellow',
				text: '紧急'
			},
			d: {
				color: 'blue',
				text: '正常'
			}
		};
		let buttons = [];
		for (let buttonLevel in buttonsInfo) {
			buttons.push(
				<span key={buttonLevel}>
					&nbsp;&nbsp;
					<Button className='taskLevelButton' basic={buttonLevel != this.state.level} content={buttonsInfo[buttonLevel].text} color={buttonsInfo[buttonLevel].color} onClick={()=>{this.setLevel(buttonLevel)}} />
				</span>
			);
		}
		return (
			<div style={{
				textAlign: 'center'
			}}>
				{buttons}
			</div>
		);
	}
}


export default TaskLevelButtons;