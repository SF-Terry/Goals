const tool = {
	// singleton design mode
	getSingle:  fn => {
	    var result = null;
	    return (
			() => (result || ( result = fn .apply(this, arguments ) ))
		)
	},

	// 
	getShowOrHideDomStyle: b => ({
		width: b ? '100%' : '0px', 
		height: b ? 'auto' : '0px', 
		overflow: 'hidden'
	})
					
};

module.exports = tool;