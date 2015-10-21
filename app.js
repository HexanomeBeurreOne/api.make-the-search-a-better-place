"use strict";

var express = require('express');
var gCrawler = require('./helpers/google_crawler.js');

var app = express();

app.get('/', function (req, res) {
  res.send('Welcome to make-the-search-a-better-place engine!');
});

app.get('/sayHello', function (req, res) {
  res.send('Hello World!');
});

app.get('/search', function (req, res) {
	var searchQuery = req.query.q;
	// 10 is the number of links to crawl
  	gCrawler.getGoogleResult(searchQuery, 10, function (error, links) {
  		console.log(links);
  		res.contentType('application/json');
		res.send(JSON.stringify(links));
  	});
});

//------------------------------------ Test the use of spotlight
app.get('/spotlight', function (req, res) {
	var data = spotlight.spotlightSearch(req.query.text, function(err, results){
		//Display results which is a URI list
		res.send('URI list : ' + results);
	});
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Expert System Search app listening at http://%s:%s', host, port);
});
