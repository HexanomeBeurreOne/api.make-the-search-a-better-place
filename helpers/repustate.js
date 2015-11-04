"use strict";
var request = require("request");
var async = require('async');

var getThemeFromKeyWord = function (pages, maincallback) {

	async.forEachOf(pages, function (value, key, callback) {
		var requestURL = 'https://api.repustate.com/v3/d026b7bd277a1e9d3ad3f639cdd985ab3b343983/entities.json';
		console.log(pages[key].KeywordsUri);
		request.post({
			url:requestURL,
			json: true,
			form: {text: pages[key].KeywordsUri}
		}, function(err,httpResponse,body){
			if (!err && body && httpResponse.statusCode === 200)
			{
				// body = JSON.parse(body);
				console.log(body);

				if (body) {

					pages[key].themes = body.themes;
					callback();
				}
				else	{
					pages[key].themes = [];
					callback();
				}
			}
			else {
				callback(err);
			}
		});

	}, function (err) {
		if (err) console.error(err.message);
		// Returns to maincallback googleLinks with URLs text
		maincallback(null, pages);
	});



};
module.exports.getThemeFromKeyWord = getThemeFromKeyWord;