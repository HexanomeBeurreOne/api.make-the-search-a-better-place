"use strict";

var express = require('express');
var gCrawler = require('./helpers/google_crawler.js');
var spotlight = require('./helpers/spotlight_use.js');
var sparql = require('./helpers/sparql.js');
var urlToText = require('./helpers/urlToText.js');

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

	// 10 is the number of links to crawl by default
  	gCrawler.getGoogleResult(searchQuery, num?num:10, function (error, links) {
  		console.log(links.length + " links found");
  		res.contentType('application/json');
		res.send(JSON.stringify(links));
  	});
});

app.get('/getTextfromUrl', function(req, res) {
	// gestion des parametres de la requete
	// Exemple, on doit recevoir une url de la forme :
	// uneAdresse?url=uneUrlAAnalyser
	// websiteUrl contient uneUrlAAnalyser
	var websiteUrl = req.query.url;

	urlToText.getTextFromUrl(websiteUrl, function(err, result){
		if(err){
			console.err(err);
		}
		else {
			console.log("APP", result);
			// On affiche le resultat a l'excran
			res.send(result);
		}
	});
});

//------------------------------------ Test the use of spotlight
app.get('/spotlight', function (req, res) {
	var data = spotlight.spotlightSearch(req.query.text, function(err, results)
  {
    

    //*************************************************
    //    CALL SPARQL WITH THE RESULTS OF SPOTLIGHT
    //**************************************************

    //-------------------------------Set synthaxe of URIs for query
    if (results.length != 0)
    {
      var parse = "<";
      parse += results[0];
      parse+= ">";

      for (var i = 1; i <= results.length - 1; i++) 
      {
          parse += ",<";
          parse += results[i];
          parse += ">";
      };

      //---------------------------------Call sparql localhost URL
      var request = require("request")

      var uriList = [];
      var url = 'http://localhost:3000/sparql?uri=' + parse;
      console.log(url);
      request({
          url: url,
          json: true
      }, function (error, response, body) 
      {
        if (!error && response.statusCode === 200) 
        {
          //Display result on the web page   
          res.send('Triplets : ' + JSON.stringify(body));
        }
      })
    }
	});
});

//------------------------------------ Test the use of sparql
app.get('/sparql', function (req, res) {
  var data = sparql.sparqlSearch(req.query.uri, function(err, results){
    //Display results which is a URI list
    res.send('Triplets : ' + JSON.stringify(results));
  });
});


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Expert System Search app listening at http://%s:%s', host, port);
});
