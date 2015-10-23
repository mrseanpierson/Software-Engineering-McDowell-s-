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
var chart;
var year = [2013, 2014];
var options = {
        width: 700,
        height: 400,
	title: 'Session Hours Provided by University of Portland Librarians',
        hAxis: {
            title: 'Month',
            gridlines: {count: 12}
        },
        vAxis: {
            title: 'People Hours'
        },
	legend: { 
	    position: 'none' 
	},
	animation: {
            "startup" : true,
            "duration" : 500
        },
    };
    
function vizController(thisYear) {

	if(views[thisYear] === undefined){
		views[thisYear] = new google.visualization.DataView(data);
		console.log(data);
		views[thisYear].setRows(views[thisYear].getFilteredRows([{column: 2, value: thisYear}]));
		views[thisYear].setColumns([0, 3]);
		chart.draw(views[thisYear].toDataTable(), options);
	}
}

function vizInit() {

// Create a new viz object using the google API -- specifically,                                                                                                         
// in the html file
chart = new google.visualization.ColumnChart(document.getElementById('ex0'));

// 9/19/2015 Corrected typo
// Make the initial query to get the whole Fusion table. The Fusion
// table’s ID is listed ingit o red.                                                            
var query = "SELECT Month, Year, AY, Sessions FROM 1P23PE35fnBA8V9Bf4u2C3jqqwr-O0i-s8pjrSEjD";

var opts = {sendMethod: 'auto'};
var queryObj = new google.visualization.Query('https://www.google.com/fusiontables/gvizdata?tq=', opts);


// Send the query and handle the response by logging the data
// to the console.                                                                
queryObj.setQuery(query);
queryObj.send(function(e) {
       
	data = e.getDataTable();

	// Log the raw response to the console.
    console.log(data);
    // Create a view for academic year 2013-2014 that                                                          
            // is the first two columns of the data, just the                                                          
            // rows that have 2013-2014 for the value.                                                                 

            // First, get the textualized range of the year.                                                           
            var thisYear = "" + year[0] + "-" + year[1];

            // Next, create the object and get the rows 
// corresponding to "thisYear".                                   
            views[thisYear] = new google.visualization.DataView(data);
           
views[thisYear].setRows(views[thisYear].getFilteredRows([{column: 2, value: thisYear}]));

            // Get a subset of the columns.                                                                            
            views[thisYear].setColumns([0, 3]);

            // Draw the chart for the initial academic year.                                                           
            chart.draw(views[thisYear].toDataTable(), options);
});
}