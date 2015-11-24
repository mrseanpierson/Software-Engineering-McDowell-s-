/**
 * utility.js
 *
 * Defines generic helper functionality for instrumenting the
 * user-interface.  Based on the tutorials at:
 *
 * http://www.kirupa.com/snippets/add_class_and_remove_class_snippet.htm
 *    and
 * http://sonnyt.com/javascript-check-if-element-has-class/
 *
 */

// Extend namespace
var librs = librs || {};
librs.utility = {};

var setColumnNames = function(correspondence, aggTable) {
	for (var i = 0; i < correspondence.length; i++) {
			var startValue = parseInt(aggTable.getValue(correspondence[i], 1));
			
			// var s = "startValue at "+ i + " = " + startValue;
			// console.log(s);

			switch(startValue){
		  	case 1:
		  		aggTable.setCell(correspondence[i], 1, 'Library-Encyclopedias');
		  		
		  		break;
		  	case 2:
		  		aggTable.setCell(correspondence[i], 1, 'Library-Articles');
		  		break;
		  	case 3:
		  		aggTable.setCell(correspondence[i], 1, 'Library-Catalogs');
		  		break;
		  	case 4:
		  		aggTable.setCell(correspondence[i], 1, 'Class Materials');
		  		break;
		  	case 5:
		  		aggTable.setCell(correspondence[i], 1, 'Web-Google');
		  		break;
		  	case 6:
		  		aggTable.setCell(correspondence[i], 1, 'Web-Wikipedia');
		  		break;
		  }
		}
	return aggTable;
};

// The intention of this approach is to be framework-agnostic
// and to avoid namespace pollution by encapsulating the contents of
// this module in a function:
librs.utility = function() {


}; 
// Invoke module.                                                                                                                                                      
librs.utility();
