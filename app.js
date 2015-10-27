"use strict";

var express = require('express');
var gCrawler = require('./helpers/google_crawler.js');
var spotlight = require('./helpers/spotlight_use.js');
var sparql = require('./helpers/sparql.js');

var app = express();

app.get('/', function (req, res) {
  res.send('Welcome to make-the-search-a-better-place engine!');
});

app.get('/sayHello', function (req, res) {
  res.send('Hello World!');
});

app.get('/search', function (req, res) {
	var searchQuery = req.query.q;
	var num = req.query.num;

	// 10 is the number of links to crawl
  	gCrawler.getGoogleResult(searchQuery, num?num:10, function (error, links) {
  		console.log(links.length + " links found");
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

//------------------------------------ Test the use of sparql
app.get('/sparql', function (req, res) {
  var data = sparql.sparqlSearch(req.query.uri, function(err, results){
    //Display results which is a URI list
    res.send('Triplets : ' + results);
  });
});


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Expert System Search app listening at http://%s:%s', host, port);
});
