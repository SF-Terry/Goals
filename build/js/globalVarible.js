class globalVarible {
	constructor() {
		this.taskTypes = ['today', 'long', 'thisWeek', 'thisMonth', 'thisYear', 'tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
		this.futureTaskTypes = ['tomorrow', 'nextWeek', 'nextMonth', 'nextYear'];
		this.dayTaskTypes = ['today', 'tomorrow'];
		this.longTaskTypes = ['long', 'thisYear', 'thisMonth', 'thisWeek', 'nextWeek', 'nextMonth', 'nextYear'];
		this.defaultTaskType = 'today';

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
		};
		this.timeSetterTimeType = {
			start: 'start',
			end: 'end'
		}
	}
}

let G = new globalVarible();
module.exports = G;