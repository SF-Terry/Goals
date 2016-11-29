class Storekeeper {
	constructor(name) {
		// temp add
		// localStorage.removeItem("todolistStorekeeper");

		var that = this;

		this.uniqueSaveLibrary = [];

		this.filterdObj = {};

		this.init(name);

		// observe change and sync data
		this.observeChange(() => {
			console.log("something changed");
			that.filterdObj.settings = that.settings;
			that.filterdObj.tasks = that.tasks;
			localStorage[name] = JSON.stringify(that.filterdObj);
			console.log("localStorage now is: ", localStorage[name]);
		});
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

	observeChange(callback) {
		var that = this;
		var iterateArray = (arr, callback) => {
			arr.forEach((item) => {
				const isObj = item.constructor === {}.constructor;
				const isArr = item.constructor === [].constructor;
				if (isObj) {
					iterateObject(item, callback);
				}
				if (isArr) {
					iterateArray(item, callback);
				}
				if (isObj || isArr) {
					callback(item);
				}
			});
		};
		var iterateObject = (obj, callback) => {
			const arr = Object.keys(obj).map((item) => (obj[item]));
			iterateArray(arr, callback);
		};
		iterateObject(that, (item) => {
			// console.log('item is: ');
			// console.dir(item);
			const isUniqueSaveLibrary = Object.is(item, that.uniqueSaveLibrary);
			if (!isUniqueSaveLibrary) {
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
							console.log(change);
							callback();					
							that.observeChange(callback);
						});
					}
				}
			}
									
		});
	}

	saveUniqueSaveLibrary(obj) {
		// const id = (this.uniqueSaveLibrary.keys().length + 1).toString();		
		this.uniqueSaveLibrary.push(obj);
	}


}

module.exports = new Storekeeper("todolistStorekeeper");