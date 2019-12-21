import {
	selectors,
	colors
} from './variables.js'

// DISPLAY FUNCTIONS
	// hideNavBarButtons
	// updateStatusDisplay

export const toggleNavBarBtns = () => {
  Array.from(document.querySelectorAll(selectors.navBarBtn)).forEach(btn => {
      btn.classList.toggle(selectors.inactive);
  });
};

export const updateStatusDisplay = function(element, status) {
	// console.log(`
	// 	element: ${element},
	// 	status: ${status}
	// `)
	switch(status) {
			case 'ok':
					document.querySelector(element).style.color = colors.standardTxt;
					break;
			case 'warning':
					document.querySelector(element).style.color = colors.warning;
					break;
			case 'alert':
					document.querySelector(element).style.color = colors.alert;
					break;
			case 'unknown':
					document.querySelector(element).style.color = colors.unknown;
					break
			default:
					document.querySelector(element).style.color = colors.standardTxt;
	}
};

export const toggleWideBtnDisabled = (parent, btn) => {
	document.getElementById(`${parent}-wideBtn-${btn}`).classList.toggle('wideBtnDisabled');
};