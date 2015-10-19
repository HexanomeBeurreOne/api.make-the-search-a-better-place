"use strict";

var Crawler = require("crawler");
var url = require('url');

var uriArray = [];
var mainCallback;
var googleCallback = function (error, result, $) {
        // $ is Cheerio by default 
        //a lean implementation of core jQuery designed specifically for the server 
        $('h3.r > a').each(function(index, a) {
            var href = $(a).attr('href');
            var uri = href.replace("/url?q=", "");
            ///console.log(uri);
            //var toQueueUrl = $(a).attr('href');
            //c.queue(toQueueUrl);
            // if (uri.indexOf("http") = 1) {};
            uriArray.push(uri);
        });
        //console.log(uriArray);
        
        //Send to callback
        mainCallback(error, uriArray);
    };

var googleCrawler = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
});

var getGoogleResult = function(query, numOfResult, appCallback) {
    //Set app.js callback where array should be returned
    mainCallback = appCallback;
    //Call crawler
    googleCrawler.queue({
        uri: googleSearch(query, numOfResult),
        callback: googleCallback
    });
};
module.exports.getGoogleResult = getGoogleResult;

var googleSearch = function(query, numOfResult) {
  return 'http://www.google.fr/search?q=' + query + '&num=' + numOfResult;
};