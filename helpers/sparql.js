//Avoid issues calling non-existing variables
"use strict";

var sparqlSearch = function(search, callback) {

	var sparql = require('jsparql');
 
	var client = new sparql('http://dbpedia.org/sparql', 'http://dbpedia.org');
	 
	client.query('select * where { ?s ?p ?o } LIMIT 10', function (err, results) {
	  if (err) throw err;
	  
	  //Callback for synchronous http request
	  callback(null, JSON.stringify(results));
	});

};
//Make the spotlight method visible when requiring the spotlight_use.js file
module.exports.sparqlSearch = sparqlSearch;
