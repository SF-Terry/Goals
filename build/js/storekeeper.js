import observe from './observe.js';

class Storekeeper {
	constructor(name) {
		// temp add
		localStorage.removeItem("todolistStorekeeper");

		var that = this;

		this.uniqueSaveLibrary = [];

		this.filterdObj = {};

		this.init(name);

		// observe change and sync data
		var _changedCallback = () => {
			console.log("something changed");
			that.filterdObj.settings = that.settings;
			that.filterdObj.tasks = that.tasks;
			localStorage[name] = JSON.stringify(that.filterdObj);
			console.log("localStorage now is: ", localStorage[name]);
			console.log("storekeeperis: ", that);
		};
		this.observeChange(_changedCallback);
	}

	init(name) {
		const value = localStorage[name];
		const isExsitName = Boolean(value);

		// init data
		this.settings = [];
		this.tasks = [];

		// load localStorage's data to 
		if (isExsitName) {
			var data = JSON.parse(localStorage[name]);
			const isDataCorrect = Array.isArray(data.settings) && Array.isArray(data.tasks);
			if (isDataCorrect) {
				this.settings = data.settings;
				this.tasks = data.tasks;
			}
			if (!isDataCorrect) {
				throw "localStorage data error: Name: " + name + "  Localstorage data:" + localStorage[name].toString();
			}			
		}
		// active localStorage
		if (!isExsitName) {
			const initData = {
				settings: this.settings,
				tasks: this.tasks
			};
			localStorage[name] = JSON.stringify(initData);
		}
	}

	observeChange(changedCallback) {
		observe(this, () => {
			changedCallback();
		});
	}

	saveUniqueSaveLibrary(obj) {
		this.uniqueSaveLibrary.push(obj);
	}
}

module.exports = new Storekeeper("todolistStorekeeper");