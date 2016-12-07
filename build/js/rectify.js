
// To circle MultiFunctionBtn really
const circleOvalButton = () => {
	let ovalButtons = document.getElementsByClassName('ovalButton');
	Array.prototype.forEach.call(ovalButtons, (btn) => {
		const {offsetWidth, offsetHeight} = btn;
		const value = Math.max(offsetWidth, offsetHeight);
		btn.style.width = value;
		btn.style.height = value;
	});
	
};

// forbid the default dragging event of safari 
const forbidSafariDefaultDragEvent = () => {
	document.addEventListener('touchmove', (ev) => {
		// ev.preventDefault()
	}, false)
};


// reactify dom
circleOvalButton();
forbidSafariDefaultDragEvent();