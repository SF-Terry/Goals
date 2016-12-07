// import observe library to Adapt to IE
import observe from '../js/observe.js';

class Storekeeper {
	constructor(name) {
		// reset localStorage data
		// localStorage.removeItem("todolistStorekeeper");

		var that = this;

		this.name = name;

		this.uniqueSaveLibrary = [];

		this.filterdObj = {};

		this.init(name);

		// observe and sync localStorage
		observe(this.tasks, (a, b, c, d, e) => {
			// console.log('observed: tasks changed: ', a, b, c, d);

			that.sync();
		});
		observe(this.settings, () => {
			that.sync();
		});
	}

	init(name) {
		const value = localStorage[name];
		const isExsitName = Boolean(value);

		// init data
		this.settings = [];
		this.tasks = [];

		// load localStorage data 
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

	sync() {
		const name = this.name;
		this.filterdObj.settings = this.settings;
		this.filterdObj.tasks = this.tasks;
		localStorage[name] = JSON.stringify(this.filterdObj);
		// console.log("localStorage now is: ", localStorage[name]);
	}

	saveUniqueSaveLibrary(obj) {
		this.uniqueSaveLibrary.push(obj);
	}
}

module.exports = new Storekeeper("todolistStorekeeper");