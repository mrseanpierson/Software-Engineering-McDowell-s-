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

google.load('visualization', '1', {packages: ['corechart', 'table']});
//when the page is done loading, call 'drawChart'
google.setOnLoadCallback(vizInit);
//variables from step 5
var ourData;
var views = {};
var totals = {};
var aggTable;
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

	

var selectedMajor;
var chart;
var options = {
        width: 700,
        height: 400,
		title: 'Confidence of students based on where research is started',
        hAxis: {
            title: 'Research Start'
        },
        vAxis: {
            title: 'Average Confidence'
        },
		legend: { 
	    	position: 'none' 
		},
		animation: {
            "startup" : true,
            "duration" : 500
        }
    };
    
function vizController(buttonMajor) {

	selectedMajor = parseInt(buttonMajor);
	getData();
}

function getData() {
	chart = new google.visualization.ColumnChart(document.getElementById('ex0'));
	chart.groupWidth = 100;
	//this gets the entire table
	var query = "SELECT major, start, confidence FROM 1fxvCbqTZgT21sArvYIp6zXBQzgCmVNUSwBZtu-BX"
	var opts = {sendMethod: 'auto'};
	var queryObj = new google.visualization.Query('https://www.google.com/fusiontables/gvizdata?tq=', opts);
		//#rows:id=1

		// Send the query and handle the response by logging the data
		// to the console.
		queryObj.setQuery(query);                                                                
		queryObj.send(function(e) {
	    
		var countEncylo = 0;
		var totalEnyclo = 0;

		var countArticles = 0;
		var totalArticles = 0;

		var countCatalogs = 0;
		var totalCatalogs = 0;

		var countClassMats = 0;
		var totalClassMats = 0;

		var countGoogle = 0;
		var totalGoogle = 0;

		var countWiki = 0;
		var totalWiki = 0;

		ourData = e.getDataTable();

		

		aggTable = google.visualization.data.group(
		  // input data
		  ourData,
		  // key columns (columns to group by)
		  [0, 1],
		  // third column (index 2) will be averaged and put in a column called "avg"
		  [{'column': 2, 'aggregation': google.visualization.data.avg, 'type': 'number', 'label': 'avg'}]);

		//the following for-loop-switch-statement is used to replace the number
		//representation of 'start' column with its corresponding string so that
		//the x-axis is properly labelled when it is graphed.
		var correspondingAverages = aggTable.getFilteredRows([{column: 0, value: selectedMajor}]);
		for (var i = 0; i < correspondingAverages.length; i++) {
			var startValue = parseInt(aggTable.getValue(correspondingAverages[i], 1));
			
			var s = "startValue at "+ i + " = " + startValue;
			console.log(s);

			switch(startValue){
		  	case 1:
		  		aggTable.setCell(correspondingAverages[i], 1, 'Library-Encyclopedias');
		  		console.log('renamed encylos');
		  		break;
		  	case 2:
		  		aggTable.setCell(correspondingAverages[i], 1, 'Library-Articles');
		  		break;
		  	case 3:
		  		aggTable.setCell(correspondingAverages[i], 1, 'Library-Catalogs');
		  		break;
		  	case 4:
		  		aggTable.setCell(correspondingAverages[i], 1, 'Class Materials');
		  		break;
		  	case 5:
		  		aggTable.setCell(correspondingAverages[i], 1, 'Web-Google');
		  		break;
		  	case 6:
		  		aggTable.setCell(correspondingAverages[i], 1, 'Web-Wikipedia');
		  		break;
		  }
		}
	    
	    //for now this will pull the data from the button.                                                           
	    //var selectedMajor = document.getElementById('major').value;
	                                   
	    views[selectedMajor] = new google.visualization.DataView(aggTable);

		views[selectedMajor].setRows(views[selectedMajor].getFilteredRows([{column: 0, value: selectedMajor}]));


	    // Get a subset of the columns.                                                                            
	    views[selectedMajor].setColumns([1, 2]);

	    // Draw the chart for the initial academic year. //had a .toDataTable() part after ]                                                          
	    chart.draw(views[selectedMajor].toDataTable(), options);
	});

}


function vizInit() {
	selectedMajor = majorSet.business;
	getData();
	//if need be, copy and paste getData() below 

}