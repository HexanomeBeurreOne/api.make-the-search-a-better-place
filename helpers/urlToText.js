'use strict';

var request = require('request');
var async = require('async');


var getTextFromUrl = function(url, callback) {
	var KEY = 'e959fb1dd503eaded99080309c9777f8b8fc52c8';

	// Url correspondant a l'appel a la web API
	var urlRequest = 'http://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords?apikey='+KEY+'&url='+url+'&keywordExtractMode=normal&outputMode=json';

	request({
	    url: urlRequest
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			body=JSON.parse(body);
			callback(null, body.keywords);
  		}
  		else {
  			callback(error);
  		}
	});
};
module.exports.getTextFromUrl = getTextFromUrl;

var getTextFromGoogleLinks = function(googleLinks, maincallback) {
	var KEY = '42dba9afb8537050348b9488ef9245edb3e4a9c6';

	// Create an asynch stack of request exectuted in parallel
	// value is the object in the array and key is its index
	async.forEachOf(googleLinks, function (value, key, callback) {
		var urlRequest = 'http://gateway-a.watsonplatform.net/calls/url/URLGetRankedKeywords?apikey='+KEY+'&url='+value.url+'&keywordExtractMode=normal&outputMode=json';

		// Request for an URL
		request(urlRequest, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// Add URL text to the main object googleLinks
				body=JSON.parse(body);
				console.log("*******************body*******************");
				console.log(body);
				console.log("******************* end body*******************");
				var keywords = body.keywords;
				googleLinks[key].keywords = keywords;
				if (keywords) {
					for(var i = 0; i < keywords.length; i++)	{
						googleLinks[key].text = (googleLinks[key].text?googleLinks[key].text:"") + keywords[i].text + ((i+1!=keywords.length)?' ':'');
						// console.log("keyword for key " + key + " : ", keywords[i].text);
					}
				}

				//googleLinks[key].text = body;
				callback();
  			}
  			else {
  				callback(error);
  			}
		});
	}, function (err) {
	  if (err) console.error(err.message);
		// Returns to maincallback googleLinks with URLs text
	  maincallback(null, googleLinks);
	});
};
module.exports.getTextFromGoogleLinks = getTextFromGoogleLinks;
