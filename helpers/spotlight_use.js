//Avoid issues calling non-existing variables
"use strict";
var request = require("request");
var async = require('async');
var utils = require('./utils.js');

var spotlightSearch = function(search, callback) {

	//--------------------------------- HTTP CALL
	var uriList = [];
	var url = 'http://spotlight.dbpedia.org/rest/annotate?text=' + search + '&confidence=0.2&support=20'

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
	    if (!error && response.statusCode === 200 && body.Resources != null)
	    {
	    	for (var i = body.Resources.length - 1; i >= 0; i--)
	    	{
	    		uriList.push(body.Resources[i]["@URI"]);
	    	};
	        //console.log(uriList);
	        //Callback for synchronous http request
	        callback(null, uriList);
	    }
	    else
	    {
	    	console.log("vide : "+uriList);
	    	callback(null, uriList);
	    }
	});
};
//Make the spotlight method visible when requiring the spotlight_use.js file
module.exports.spotlightSearch = spotlightSearch;

var spotlightSearchFromLinks = function(linksData, maincallback) {
	async.forEachOf(linksData, function (value, key, callback) {
		var uriList = [];
		var requestURL = 'http://spotlight.dbpedia.org/rest/annotate?text=' + value.text + '&confidence=0.2&support=20';
		request({
		    url: requestURL,
		    json: true
		}, function (error, response, body) {
		    if (!error && body && response.statusCode === 200)
		    {
		    	for (var i = body.Resources.length - 1; i >= 0; i--)
		    	{
		    		uriList.push(body.Resources[i]["@URI"]);
		    	}
					// Add URL text to the main object googleLinks
					var sortedURIs = utils.arrayToSortedJSON(uriList);
					linksData[key].spotlightURI=sortedURIs;
					callback();
		    }
	  		else {
	  			callback(error);
	  		}
		});
	}, function (err) {
	  if (err) console.error(err.message);
		// Returns to maincallback linksData with spotlight URI
	  maincallback(null, linksData);
	});
};
module.exports.spotlightSearchFromLinks = spotlightSearchFromLinks;
