"use strict";

var Crawler = require("crawler");
var url = require('url');

var mainCallback;
var googleCallback = function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        var uriArray = [];
        $('h3.r > a').each(function(index, a) {
            var href;
            if (href = $(a).attr('href')) {
                var uri;
    
                if (href.indexOf("/url?q=") != -1) {
                    uri = href.replace("/url?q=", "");
                } else {
                    uri = href;
                }

                //var toQueueUrl = $(a).attr('href');
                //c.queue(toQueueUrl);
                
                if (uri.indexOf("http") == 0) {
                    uriArray.push(uri);
                };
            }
        });
        //console.log(uriArray);

        //Send to callback
        mainCallback(error, uriArray);
    };

var googleCrawler = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
});

var getGoogleResult = function(searchQuery, numOfResult, appCallback) {
    //Set app.js callback where array should be returned
    mainCallback = appCallback;
    //Call crawler
    googleCrawler.queue({
        uri: googleSearch(searchQuery, numOfResult),
        callback: googleCallback
    });
};
module.exports.getGoogleResult = getGoogleResult;

var googleSearch = function(query, numOfResult) {
  return 'http://www.google.fr/search?q=' + query + '&num=' + numOfResult;
};
