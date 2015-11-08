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
		var el = document.getElementById("major");

		console.log(el.value);
		vizController(el.value);

	};
	
	var initialize = function() {

		console.log('Initialize!');

		// Grab the 'About' button element, identified by the
		// 'about-btn' id.

		var button = document.getElementById('major');
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