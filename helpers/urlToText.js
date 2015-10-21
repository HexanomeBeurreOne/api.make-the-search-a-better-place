'use strict';

//http://gateway-a.watsonplatform.net/calls/url/URLGetText?apikey=7d23f40b7dfa15c3d424e0ee1ab2d2be7a288ef2&url=http://www.cnn.com/2009/CRIME/01/13/missing.pilot/index.html
var request = require('request');

var getTextFromUrl = function(url) {
	var key = '7d23f40b7dfa15c3d424e0ee1ab2d2be7a288ef2';
	var text = 'http://gateway-a.watsonplatform.net/calls/url/URLGetText?apikey='+key+'&url='+url;
	request(text, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body); // Print the google web page.
  		}
	});
};
module.exports.getTextFromUrl = getTextFromUrl;

