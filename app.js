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
  	res.send('Fill the page with results of request ' + req.query.q);
  	gCrawler.getGoogleResult(req.query.q);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});