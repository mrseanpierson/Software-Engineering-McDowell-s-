/**
 * ui.js
 *
 * Defines functionality for instrumenting the user-interface.
 *
 */

//Declare a global variable called librs.
//Initialize it to be whatever it was before
//OR initialize it to an empty JavaScript object.
var librs = librs || {};
librs.ui = {};

librs.ui = function() {

	var fetch = function() {

		var dropDown = document.getElementById("major");
		//can have .text at the end
		var selected = dropDown.options[dropDown.selectedIndex].value;
		console.log(selected);
		vizController(selected);
	};



	var initialize = function() {

		var button = document.getElementById('submit-btn');
		// From this point forward, when the button is clicked, the
		// toggle function shall be invoked.
		button.onclick = fetch;


	};

	// When this file is included at the bottom of the page,
	// the js is loaded after the DOM is loaded.  It is a
	// good time to initialize the UI elements in the page.
	initialize();
};
// end module

// Invoke module. After invocation, the module’s code is now added to
// the namespace and is accessible through the librs object.
librs.ui(); 