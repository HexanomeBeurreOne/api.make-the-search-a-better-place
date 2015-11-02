'use strict';

var request = require('request');
var async = require('async');


var getTextFromUrl = function(url, callback) {
	var KEY = '7d23f40b7dfa15c3d424e0ee1ab2d2be7a288ef2';

	// Url correspondant a l'appel a la web API
	var text = 'http://gateway-a.watsonplatform.net/calls/url/URLGetRawText?apikey='+KEY+'&url='+url;

	request(text, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
			callback(null, body);
  		}
  		else {
  			callback(error);
  		}
	});
};
module.exports.getTextFromUrl = getTextFromUrl;

var getTextFromGoogleLinks = function(GoogleLinks, maincallback) {
	var API_KEY = '7d23f40b7dfa15c3d424e0ee1ab2d2be7a288ef2';

	async.forEachOf(GoogleLinks, function (value, key, callback) {
		console.log(value);
		var requestURL = 'http://gateway-a.watsonplatform.net/calls/url/URLGetRawText?apikey='+API_KEY+'&url='+value.url;
		request(requestURL, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				GoogleLinks[key].text=body;
				callback();
  		}
  		else {
  			callback(error);
  		}
		});
	}, function (err) {
	  //if (err) console.error(err.message);
	  // configs is now a map of JSON data
	  maincallback(null, GoogleLinks);
	});
};
module.exports.getTextFromGoogleLinks = getTextFromGoogleLinks;
