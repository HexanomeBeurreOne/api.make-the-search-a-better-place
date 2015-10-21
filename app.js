"use strict";

var express = require('express');
var app = express();
var gCrawler = require('./helpers/google_crawler.js');


app.get('/', function (req, res) {
  res.send('Welcome to make-the-search-a-better-place engine!');
});

app.get('/sayHello', function (req, res) {
  res.send('Hello World!');
});

app.get('/search', function (req, res) {
	var q = req.query.q;
	var num = req.query.num;

	// 10 is the number of links to crawl
  	gCrawler.getGoogleResult(q, num?num:10, function (error, links) {
  		console.log(links.length + " links found");
  		res.contentType('application/json');
		res.send(JSON.stringify(links));
  	});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Expert System Search app listening at http://%s:%s', host, port);
});
