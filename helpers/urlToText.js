'use strict';

var request = require('request');


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

