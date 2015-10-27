//Avoid issues calling non-existing variables
"use strict";

var spotlightSearch = function(search, callback) {
	
	//--------------------------------- HTTP CALL
	var request = require("request")

	var uriList = [];
	var url = 'http://spotlight.dbpedia.org/rest/annotate?text=' + search + '&confidence=0.2&support=20'

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) 
	    {
	    	for (var i = body.Resources.length - 1; i >= 0; i--) 
	    	{
	    		uriList.push(body.Resources[i]["@URI"]);
	    	};
	        //console.log(uriList);
	        //Callback for synchronous http request
	        callback(null, uriList);
	    }
	})
	

};
//Make the spotlight method visible when requiring the spotlight_use.js file
module.exports.spotlightSearch = spotlightSearch;
