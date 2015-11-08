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
var majorSet = {
    business: 1,
    humanities: 2,
    arts: 3,
    bio_chem: 4,
    engineering: 5, 
    health_prof: 6,
    social_sciences: 7,
    education: 8
};

var locationStarted = {
    Encyclopedias: 1,
    Article_Databases: 2,
    Catalog: 3,
    ClassMaterials: 4,
    Google: 5,
    Wikipedia: 6
};

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
	title: 'Confidence In Writing A Thesis by Where Research Was Begun',
        hAxis: {
            title: 'Location Started'
            //gridlines: {count: }
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
        },
    bar: {
    	groupWidth: 20
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

    // Make the initial query to get the whole Fusion table. The Fusion
    // table’s ID is listed ingit o red.                                                            
    var query = "SELECT * FROM 1fxvCbqTZgT21sArvYIp6zXBQzgCmVNUSwBZtu-BX";

    var opts = {sendMethod: 'auto'};
    var queryObj = new google.visualization.Query('https://www.google.com/fusiontables/gvizdata?tq=', opts);


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
	  		countEncylo += 1;
	  		totalEnyclo += v;
	  		break;
	  	case 2:
	  		countArticles += 1;
	  		totalArticles += v;
	  		break;
	  	case 3:
	  		countCatalogs += 1;
	  		totalCatalogs += v;
	  		break;
	  	case 4:
	  		countClassMats += 1;
	  		totalClassMats += v;
	  		break;
	  	case 5:
	  		countGoogle += 1;
	  		totalGoogle += v;
	  		break;
	  	case 6:
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

	 var newData = google.visualization.arrayToDataTable([
         ['Location', 'Confidence', { role: 'style' }],
         ['Encyclopedia', averageEncylo, '#b87333'],
         ['Catalog', averageCatalogs, 'blue'],
         ['Articles', averageArticles, 'silver'],
         ['Class Materials', averageClassMats, 'gold'],
         ['Google', averageGoogle, 'color: #e5e4e2'],
         ['Wikipedia', averageWiki, 'red']
      ]);

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

	var view = new google.visualization.DataView(newData);
      view.setColumns([0, 1,
                       { sourceColumn: 1,
                         type: "string"},
                       2])

	// Log the raw response to the console.
    console.log(data);
    console.log(newData);

    //for now this will pull the data from the button.                                                           
    //var selectedMajor = document.getElementById('major').value;
                                   
    //views[selectedMajor] = new google.visualization.DataView(newData);

	//views[selectedMajor].setRows(views[selectedMajor].getFilteredRows([{column: 0, value: selectedMajor}]));


    // Get a subset of the columns.                                                                            
    //views[selectedMajor].setColumns([1, 3, 4, 5, 6, 7, 8]);

    // Draw the chart for the initial academic year. //had a .toDataTable() part after ]                                                          
    //chart.draw(views[selectedMajor].toDataTable(), options);
    chart.draw(view, options);
	});
}