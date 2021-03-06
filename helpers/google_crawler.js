"use strict";

var Crawler = require("crawler");
var url = require('url');

var mainCallback;
var googleCallback = function (error, result, $) {
        var urlArray = [];
        //URLs are in 'a' DOM element in 'h3' DOM of class 'r'
        $('h3.r > a').each(function(index, a) {
            var href;
            var link = {title:"", url:""};
            //Get link in 'a' DOM element only if not null
            if (href = $(a).attr('href')) {

                //Crop href result to find URL
                if (href.indexOf("/url?q=") != -1) {
                    href = href.replace("/url?q=", "");
                }
                if (href.indexOf("&sa=") != -1) {
                    href = href.substring(0, href.indexOf("&sa="));
                }

                //Add URL and title to link object
                link.url = href;
                link.title = $(a).text()?$(a).text():"";

                //var toQueueUrl = $(a).attr('href');
                //c.queue(toQueueUrl);

                //Push in array every link which begin with 'http'
                if (link.url.indexOf("http") == 0) {
                    urlArray.push(link);
                };
            }
        });
        //console.log(urlArray);

        //Send to callback
        mainCallback(error, urlArray);
    };

var googleCrawler = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
});

var getGoogleResult = function(searchQuery, numOfResult, lang, appCallback) {
    //Set app.js callback where array should be returned
    mainCallback = appCallback;
    //Call crawler

    if (lang != 'fr' && lang != 'en') {
        lang = 'en';
    }
    googleCrawler.queue({
        uri: googleSearch(searchQuery, numOfResult, lang),
        callback: googleCallback
    });
};
module.exports.getGoogleResult = getGoogleResult;

//Create Google URI string with query and number of results wanted
var googleSearch = function(query, numOfResult, lang) {
  var uri = 'http://www.google.com/search?ie=utf-8&oe=utf-8&hl=' + lang + '&q=' + query + '&num=' + numOfResult;
  console.log("Google URI called: " + uri);
  return uri;
};
