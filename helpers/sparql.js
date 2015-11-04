//Avoid issues calling non-existing variables
"use strict";

var sparql = require('jsparql');
var async = require('async');

var client = new sparql('http://dbpedia.org/sparql', 'http://dbpedia.org');

var sparqlSearch = function(pages, maincallback) {
	
	async.forEachOf(pages, function (value, key, callback) {

		var listUri = value.spotlightURI;

		//-------------------------------Set synthaxe of URIs for query
		if (listUri && listUri.length != 0)
	    {
			var parse = "<";
			parse += listUri[0];
			parse+= ">";

			for (var i = 1; i <= listUri.length - 1; i++)
			{
				parse += ",<";
				parse += listUri[i];
				parse += ">";
			}
		
			//---------------------------------------------Sparql query
			client.query(' SELECT * WHERE { ?s ?p ?o. FILTER(?s in ('+parse+')) } LIMIT 100', function (err, results) {
				if (err) throw err;
				var requestResults = [];
				requestResults.push(results);
				pages[key].triplets=requestResults;
				//Callback for synchronous http request
				callback(null, results);

			});
		}
		else
		{
			callback();
		}
	}, function (err) {
		if (err) console.error(err.message);
		// Returns to maincallback googleLinks with URLs text
		maincallback(null, pages);
	});

};
//Make the spotlight method visible when requiring the spotlight_use.js file
module.exports.sparqlSearch = sparqlSearch;