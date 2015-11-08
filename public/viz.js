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

	var locationStarted = {
    Encyclopedias: 1,
    Articles: 2,
    Catalog: 3,
    ClassMaterials: 4,
    Google: 5,
    Wikipedia: 6
};

var selectedMajor = majorSet.business;
var chart;
var options = {
        width: 700,
        height: 400,
	title: 'Confidence of students based on where research is started',
        hAxis: {
            title: 'Research Start',
            
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
    bar: {
    	groupWidth: 20
    },
    };
    
function vizController(selectedMajor) {

	if(views[selectedMajor] === undefined){
		views[selectedMajor] = new google.visualization.DataView(data);
		console.log(data);
		views[selectedMajor].setRows(views[selectedMajor].getFilteredRows([{column: 1, value: selectedMajor}]));
		views[selectedMajor].setColumns(3);
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

	data = e.getDataTable();
	var rowInds = data.getSortedRows([{column: 0, value: selectedMajor}]);
	for (var i = 0; i < rowInds.length; i++) {
	  var v = data.getValue(rowInds[i], 2);
	  var s = data.getValue(rowInds[i], 1);
	  switch(s){
	  	case 1:
	  		data.setCell(rowInds[i], 1, 'Library-Encyclopedias');
	  		countEncylo += 1;
	  		totalEnyclo += v;
	  		break;
	  	case 2:
	  		data.setCell(rowInds[i], 1, 'Library-Articles');
	  		countArticles += 1;
	  		totalArticles += v;
	  		break;
	  	case 3:
	  		data.setCell(rowInds[i], 1, 'Library-Catalogs');
	  		countCatalogs += 1;
	  		totalCatalogs += v;
	  		break;
	  	case 4:
	  		data.setCell(rowInds[i], 1, 'Class Materials');
	  		countClassMats += 1;
	  		totalClassMats += v;
	  		break;
	  	case 5:
	  		data.setCell(rowInds[i], 1, 'Web-Google');
	  		countGoogle += 1;
	  		totalGoogle += v;
	  		break;
	  	case 6:
	  		data.setCell(rowInds[i], 1, 'Web-Wiki');
	  		countWiki += 1;
	  		totalWiki += v;
	  		break;
	  }
	}

	var averageEncylo = totalEnyclo/countEncylo;
	var averageArticles = totalArticles/countArticles;
	var averageCatalogs = totalCatalogs/countCatalogs;
	var averageClassMats = totalClassMats/countClassMats;
	var averageGoogle = totalGoogle/countGoogle;
	var averageWiki = totalWiki/countWiki;

	data.addColumn('number', 'averageEncylo');
	data.addColumn('number', 'averageArticles');
	data.addColumn('number', 'averageCatalogs');
	data.addColumn('number', 'averageClassMats');
	data.addColumn('number', 'averageGoogle');
	data.addColumn('number', 'averageWiki');

	data.setCell(0, 3, averageEncylo);
	data.setCell(0, 4, averageArticles);
	data.setCell(0, 5, averageCatalogs);
	data.setCell(0, 6, averageClassMats);
	data.setCell(0, 7, averageGoogle);
	data.setCell(0, 8, averageWiki);

	// Log the raw response to the console.
    console.log(data);
    
    //for now this will pull the data from the button.                                                           
    //var selectedMajor = document.getElementById('major').value;
                                   
    views[selectedMajor] = new google.visualization.DataView(data);

	views[selectedMajor].setRows(views[selectedMajor].getFilteredRows([{column: 0, value: selectedMajor}]));


    // Get a subset of the columns.                                                                            
    views[selectedMajor].setColumns([1, 3, 4, 5, 6, 7, 8]);

    // Draw the chart for the initial academic year. //had a .toDataTable() part after ]                                                          
    chart.draw(views[selectedMajor].toDataTable(), options);
	});
}