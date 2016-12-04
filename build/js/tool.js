	const tool = {
		// singleton design mode
		getSingle:  fn => {
		    var result = null;
		    return (
				() => (result || ( result = fn .apply(this, arguments ) ))
			)
		}
	};

	module.exports = tool;