/*
 * viz.js
 *
 * Defines:
 * - The data to be visualized in the chart.
 * - The options for the look of the chart to be drawn.
 * - How to draw the chart.
 *
 * @author: Tanya L. Crenshaw
 * @contributor: Sean J. Pierson
 * @since: Jan 6, 2015
 */

var librs = librs || {};

google.load('visualization', '1', {packages: ['corechart']});

//when the page is done loading, call 'drawChart'
google.setOnLoadCallback(vizInit);
//variables from step 5
var data;
var views = {};
var totals = {};
var majorSet = {
		business: 1,
		humanities_history: 2,
		arts: 3,
		bio_chem: 4,
		engineer_math: 5,
		health: 6,
		social_sciences: 7,
		education: 8
	};
var chart;
var options = {
        width: 700,
        height: 400,
	title: 'Confidence of students based on where research is started',
        hAxis: {
            title: 'Research Start',
            gridlines: {count: 12}
        },
        vAxis: {
            title: 'Confidence'
        },
	legend: { 
	    position: 'none' 
	},
	animation: {
            "startup" : true,
            "duration" : 500
        },
    };
    
function vizController(selectedMajor) {

	if(views[selectedMajor] === undefined){
		views[selectedMajor] = new google.visualization.DataView(data);
		console.log(data);
		views[selectedMajor].setRows(views[selectedMajor].getFilteredRows([{column: 2, value: selectedMajor}]));
		views[selectedMajor].setColumns([0, 3]);
		chart.draw(views[selectedMajor].toDataTable(), options);
	}
}

function vizInit() {

// Create a new viz object using the google API -- specifically,                                                                                                         
// in the html file
chart = new google.visualization.ColumnChart(document.getElementById('ex0'));

var opts = {sendMethod: 'auto'};
var queryObj = new google.visualization.Query('https://www.google.com/fusiontables/data?docid=1fxvCbqTZgT21sArvYIp6zXBQzgCmVNUSwBZtu-BX#rows:id=1', opts);


// Send the query and handle the response by logging the data
// to the console.                                                                
queryObj.send(function(e) {
       
	data = e.getDataTable();

	// Log the raw response to the console.
    console.log(data);
    
    //for now this will pull the data from the button.                                                           
    var selectedMajor = document.getElementById('major').value;

    // Next, create the object and get the rows 
	// corresponding to "selectedMajor".                                   
    views[selectedMajor] = new google.visualization.DataView(data);
   
	views[selectedMajor].setRows(views[selectedMajor].getFilteredRows([{column: 0, value: selectedMajor}]));
	
    // Get a subset of the columns.                                                                            
    views[selectedMajor].setColumns([1, 2]);

    // Draw the chart for the initial academic year.                                                           
    chart.draw(views[selectedMajor].toDataTable(), options);
	});
}