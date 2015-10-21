"use strict";

var express = require('express');
var app = express();
var gCrawler = require('./helpers/google_crawler.js');

var spotlight = require('./helpers/spotlight_use.js');


app.get('/', function (req, res) {
  res.send('Welcome to make-the-search-a-better-place engine!');
});

app.get('/sayHello', function (req, res) {
  res.send('Hello World!');
});

app.get('/search', function (req, res) {
  	res.send('Fill the page with results of request ' + req.query.q);
  	gCrawler.getGoogleResult(req.query.q);
});


//------------------------------------ Test the use of spotlight
app.get('/spotlight', function (req, res) {
	var data = spotlight.spotlightSearch(req.query.text, function(err, results){
		//Display results which is a URI list
		res.send('URI list : ' + results);
	});
  	
  	
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});