"use strict";

var Crawler = require("crawler");
var url = require('url');

var mainCallback;
var googleCallback = function (error, result, $) {
        var uriArray = [];
        //URIs are in 'a' DOM element in 'h3' DOM of class 'r'
        $('h3.r > a').each(function(index, a) {
            var href;
            //Get link in 'a' DOM element
            if (href = $(a).attr('href')) {
                var uri;
                
                //Crop href result to find URI
                if (href.indexOf("/url?q=") != -1) {
                    uri = href.replace("/url?q=", "");
                    if (uri.indexOf("&sa=") != -1) {
                        uri = uri.substring(0, uri.indexOf("&sa="));
                    }
                } else {
                    uri = href;
                }

                //var toQueueUrl = $(a).attr('href');
                //c.queue(toQueueUrl);
                
                //Push in array every link which begin with 'http'
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

//Create Google URI string with query and number of results wanted
var googleSearch = function(query, numOfResult) {
  return 'http://www.google.fr/search?q=' + query + '&num=' + numOfResult;
};
