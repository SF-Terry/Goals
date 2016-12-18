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
			return G.taskTypesLabel[taskType];
		}
		if (isTaskNeedTimer) {
			// timeMode
			const isBefore = moment().isSameOrBefore(startDate);
			const isDoing = moment().isAfter(startDate) && moment().isSameOrBefore(endDate);
			const isAfter = moment().isAfter(endDate);

			if (isBefore) {
				const s = moment().to(startDate, true);
				return s.replace(/ /g,"") + '后开始';
			}
			if (isDoing) {
				const s = moment().to(endDate, true);
				return s.replace(/ /g,"") + '后结束';
			}
			if (isAfter) {
				const s = moment().to(endDate, true);
				return '超时' + s.replace(/ /g,"");
			}
		}
	},

	// copy content to clipboard
	copyToClipboard(el, callback) {
	    // Copy textarea, pre, div, etc.
		if (document.body.createTextRange) {
	        // IE 
	        var textRange = document.body.createTextRange();
	        textRange.moveToElementText(el);
	        textRange.select();
	        textRange.execCommand("Copy");   
			// tooltip(el, "Copied!");  
			callback(true);
	    }
		else if (window.getSelection && document.createRange) {
	        // non-IE
	        var editable = el.contentEditable; // Record contentEditable status of element
	        var readOnly = el.readOnly; // Record readOnly status of element
	       	el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
	       	el.readOnly = false; // iOS will not select in a read only form element
	        var range = document.createRange();
	        range.selectNodeContents(el);
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	        sel.addRange(range); // Does not work for Firefox if a textarea or input
	        if (el.nodeName == "TEXTAREA" || el.nodeName == "INPUT") 
	        	el.select(); // Firefox will only select a form element with select()
	        if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i))
	        	el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange
	        el.contentEditable = editable; // Restore previous contentEditable status
	        el.readOnly = readOnly; // Restore previous readOnly status 
		    if (document.queryCommandSupported("copy"))
		    {
				var successful = document.execCommand('copy');  
			    // if (successful) tooltip(el, "Copied to clipboard.");
			    if (successful) callback(true);
			    // else tooltip(el, "Press CTRL+C to copy");
			    else callback(false);
			}
			else
			{
				if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i))
					// tooltip(el, "Press CTRL+C to copy");	
					callback(false);
			}
	    }
	},

	// send mail 
	sendMail(address, subject, message) {
	    window.location.href = "mailto:"
	    		+ address + "?subject="
		        + subject
		        + "&body=" + message;
	}
};

module.exports = tool;