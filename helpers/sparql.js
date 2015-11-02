//Avoid issues calling non-existing variables
"use strict";

var sparql = require('jsparql');

var client = new sparql('http://dbpedia.org/sparql', 'http://dbpedia.org');

var sparqlSearch = function(search, callback) {
		
		//---------------------------------------------Sparql query
		client.query(' SELECT * WHERE { ?s ?p ?o. FILTER(?s in ('+search+')) } LIMIT 100', function (err, results) {
			if (err) throw err;
			  
			//Callback for synchronous http request
			callback(null, results);
		});
	
};
//Make the spotlight method visible when requiring the spotlight_use.js file
module.exports.sparqlSearch = sparqlSearch;
