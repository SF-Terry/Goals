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
	}
					
};

module.exports = tool;