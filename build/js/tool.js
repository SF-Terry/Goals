import G from '../js/globalVarible.js';
import moment from 'moment';

const tool = {
	// singleton design mode
	getSingle:  fn => {
	    var result = null;
	    return (
			() => (result || ( result = fn .apply(this, arguments ) ))
		)
	},

	// getShowOrHideDomStyle
	getShowOrHideDomStyle: b => ({
		width: b ? '100%' : '0px', 
		height: b ? 'auto' : '0px', 
		overflow: 'hidden'
	}),

	// getLanguageTextByTaskType 
	getLanguageTextByTaskType(taskType) {
		switch (taskType) {
			case 'today': 
				return '今日目标'; break;
			case 'long': 
				return '长期目标'; break;
			case 'thisWeek': 
				return '本周目标'; break;
			case 'thisMonth': 
				return '本月目标'; break;
			case 'thisYear': 
				return '本年目标'; break;
			case 'tomorrow': 
				return '明日目标'; break;
			case 'nextWeek': 
				return '下周目标'; break;
			case 'nextMonth': 
				return '下月目标'; break;
			case 'nextYear': 
				return '明年目标'; break;
			defaut: return ''; break;
		}
	},			

	// getLabelTextByMoments	
	getLabelTextByMoments(task) {
		const {taskType, isTaskNeedTimer, startDate, endDate} = task;
		const isFutureTaskType = G.futureTaskTypes.includes(taskType);

		if (!isTaskNeedTimer) {
			return G.taskTypesText[taskType];
		}
		if (isTaskNeedTimer) {
			// timeMode
			const isBefore = moment().isSameOrBefore(startDate);
			const isDoing = moment().isAfter(startDate) && moment().isSameOrBefore(endDate);
			const isAfter = moment().isAfter(endDate);

			if (isBefore) {
				const s = moment().to(startDate);
				const n = '后开始';
				return s.trim().replace('内', n).replace('前', n);
			}
			if (isDoing) {
				const s = moment().to(endDate);
				const n = '后结束';
				return s.trim().replace('内', n).replace('前', n);
			}
			if (isAfter) {
				const s = moment().to(endDate);
				return '已超时' + s.trim().replace('内', '').replace('前', '');
			}
		}

	}
};

module.exports = tool;