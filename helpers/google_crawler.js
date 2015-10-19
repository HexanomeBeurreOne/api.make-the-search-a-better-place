"use strict";
//

var Crawler = require("crawler");
var url = require('url');

var googleCrawler = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, result, $) {
        // $ is Cheerio by default 
        //a lean implementation of core jQuery designed specifically for the server 
        $('h3.r > a').each(function(index, r) {
            
            //var toQueueUrl = $(a).attr('href');
            //c.queue(toQueueUrl);
            console.log($(r).attr('href'));
        });
    }
});

var getGoogleResult = function(r) {
    googleCrawler.queue({
        uri: googleSearch(r)
    });
};
module.exports.getGoogleResult = getGoogleResult;

var googleSearch = function(search) {
  return 'http://www.google.fr/search?q=' + search + '&num=10';
};