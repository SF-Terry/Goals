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
			// console.log("something changed");
			that.filterdObj.settings = that.settings;
			that.filterdObj.tasks = that.tasks;
			localStorage[name] = JSON.stringify(that.filterdObj);
			// console.log("localStorage now is: ", localStorage[name]);
			// console.log("storekeeperis: ", that);
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
		var that = this;
		var iterateArray = (arr, callback2) => {
			arr.forEach((item) => {
				const isObj = item.constructor === {}.constructor;
				const isArr = item.constructor === [].constructor;
				if (isObj) {
					iterateObject(item, callback2);
				}
				if (isArr) {
					iterateArray(item, callback2);
				}
				if (isObj || isArr) {
					callback2(item);
				}
			});
		};
		var iterateObject = (obj, callback2) => {
			const arr = Object.keys(obj).map((item) => (obj[item]));
			iterateArray(arr, callback2);
		};
		iterateObject(that, (item) => {
			const isFilterdObj = Object.is(item, that.filterdObj);
			const isUniqueSaveLibrary = Object.is(item, that.uniqueSaveLibrary);
			if (!isUniqueSaveLibrary && !isFilterdObj) {
				const isObserving = that.uniqueSaveLibrary.some((libraryItem) => {return libraryItem === item;});
				if (!isObserving) {
					that.saveUniqueSaveLibrary(item);

					// Object.observe or Array.observe
					const isObj = item.constructor === {}.constructor;
					const isArr = item.constructor === [].constructor;
					var observeFunc = null;
					if (isObj) {
						observeFunc = Object.observe;
					}
					if (isArr) {
						observeFunc = Array.observe;
					}
					if (observeFunc) {
						observeFunc(item, (change) => {
							// sync when anything change
							changedCallback();		
							// reobserve if someting was added
							that.observeChange(changedCallback);			
						});
					}
				}
			}							
		});
	}

	saveUniqueSaveLibrary(obj) {
		this.uniqueSaveLibrary.push(obj);
	}
}

module.exports = new Storekeeper("todolistStorekeeper");