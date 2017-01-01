import moment from 'moment';

class GlobalVarible {
	constructor() {
		this.taskTypes = ['today', 'long', 'thisWeek', 'thisMonth', 'thisYear', 'tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
		this.futureTaskTypes = ['tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
		this.dayTaskTypes = ['today', 'tomorrow'];
		this.longTaskTypes = ['long', 'thisWeek', 'thisMonth', 'thisYear', 'nextWeek', 'nextMonth', 'nextYear'];
		this.defaultTaskType = 'today';
		this.taskTypesText = {
			today: '今日目标',
			long: '长期目标',
			thisWeek: '本周目标',
			thisMonth: '本月目标',
			thisYear: '今年目标',
			tomorrow: '明日目标',
			nextWeek: '下周目标',
			nextMonth: '下月目标',
			nextYear: '明年目标'
		};
		this.taskTypesLabel = {
			today: '全天',
			long: '长期',
			thisWeek: '本周',
			thisMonth: '本月',
			thisYear: '今年',
			tomorrow: '明天',
			nextWeek: '下周',
			nextMonth: '下月',
			nextYear: '明年'
		};
		this.taskTypesDateType = {
			today: 'day',
			thisWeek: 'week',
			thisMonth: 'month',
			thisYear: 'year',
			tomorrow: 'day',
			nextWeek: 'week',
			nextMonth: 'month',
			nextYear: 'year'
		};

		this.taskLevels = {
			a: 'a',
			b: 'b',
			c: 'c',
			d: 'd'
		}
		this.defaultLevel = this.taskLevels.b;

		this.taskInfoMode = {
			add: 'add',
			edit: 'edit'
		}

		this.initialTask = {
			name: null,
			taskType: this.defaultTaskType,
			taskLevel: 'b',
			isTaskCompleted: false,
			isTaskNeedTimer: false,
			isTaskNeedRepeat: false,
			startDate: null,	// use moment(...) to initial string to moment object
			endDate: null,	// use moment(...) to initial string to moment object
			sortNum: null
		};
		this.timeSetterTimeType = {
			start: 'start',
			end: 'end'
		}


		// set taskTypeMomentsObj
		const getCurrentMoments = dateType => ([moment().startOf(dateType === 'week' ? 'isoWeek' : dateType), moment().add(1, dateType + 's').startOf(dateType === 'week' ? 'isoWeek' : dateType)]); 
		const getNextMoments = dateType => ([moment().add(1, dateType + 's').startOf(dateType === 'week' ? 'isoWeek' : dateType), moment().add(2, dateType + 's').startOf(dateType === 'week' ? 'isoWeek' : dateType)]); 
		const dayTaskTypeMoments = getCurrentMoments('day');
		const longTaskTypeMoments = [moment(), moment().add(2, 'days').startOf('day')];
		const weekTaskTypeMoments = getCurrentMoments('week');
		const monthTaskTypeMoments = getCurrentMoments('month');
		const yearTaskTypeMoments = getCurrentMoments('year');
		const tomorrowTaskTypeMoments =  getNextMoments('day');
		const nextWeekTaskTypeMoments =  getNextMoments('week');
		const nextMonthTaskTypeMoments = getNextMoments('month');
		const nextYearTaskTypeMoments =  getNextMoments('year');
		this.getTaskTypesMoment = (dateType) => {
			switch(dateType) {
				case 'today': return getCurrentMoments('day'); break;
				case 'long': return [moment(), moment().add(2, 'days').startOf('day')]; break;
				case 'thisWeek': return getCurrentMoments('week'); break;
				case 'thisMonth': return getCurrentMoments('month'); break;
				case 'thisYear': return getCurrentMoments('year'); break;
				case 'tomorrow': return getNextMoments('day'); break;
				case 'nextWeek': return getNextMoments('week'); break;
				case 'nextMonth': return getNextMoments('month'); break;
				case 'nextYear': return getNextMoments('year'); break;
				default: return getCurrentMoments('day'); break;
			} 
		};


		// window size
		this.windowWidth = document.body.clientWidth;
		this.windowHeight = document.body.clientHeight;
	}
	isDayTaskType(taskType) {
		return this.dayTaskTypes.includes(taskType);
	}
	isLongTaskType(taskType) {
		return this.longTaskTypes.includes(taskType);
	}
}


let G = new GlobalVarible();
module.exports = G;