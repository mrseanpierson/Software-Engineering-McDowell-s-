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
var selectedMajor = majorSet.business;
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

//this gets the entire table
var query = "SELECT major, start, confidence FROM 1fxvCbqTZgT21sArvYIp6zXBQzgCmVNUSwBZtu-BX"
var opts = {sendMethod: 'auto'};
var queryObj = new google.visualization.Query('https://www.google.com/fusiontables/gvizdata?tq=', opts);
	//#rows:id=1

	// Send the query and handle the response by logging the data
	// to the console.
	queryObj.setQuery(query);                                                                
	queryObj.send(function(e) {
       
	data = e.getDataTable();


	
	// Log the raw response to the console.
    console.log(data);
    
    //for now this will pull the data from the button.                                                           
    //var selectedMajor = document.getElementById('major').value;

    // Next, create the object and get the rows 
	// corresponding to "selectedMajor".                                   
    views[selectedMajor] = new google.visualization.DataView(data);
   	//What i believe we should do is the following:
   	//1. get all rows of selectedMajor 
   	//2. get all rows for each start location from 1.'s 
    //3. add up all the values from 2.'s new DataView while counting how many there are
    //	 then divide the sum by the count number
    //somthing along the lines of this, but for each one
    //im unsure of if we have to do a new query for each of these.
	var rowsOfSelectedMajorEncyclo = views[selectedMajor].setRows(views[selectedMajor].getFilteredRows([{column: 0, value: selectedMajor}, {column: 1, value: 1}]));

    // Get a subset of the columns.                                                                            
    views[selectedMajor].setColumns([1]);

    // Draw the chart for the initial academic year.                                                           
    chart.draw(views[selectedMajor].toDataTable(), options);
	});
}