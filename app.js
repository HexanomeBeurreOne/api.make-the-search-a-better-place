"use strict";

var express = require('express');
var waterfall = require('async-waterfall');
var path    = require('path');
var gCrawler = require('./helpers/google_crawler.js');
var jaccard = require('./helpers/jaccard.js');
var spotlight = require('./helpers/spotlight_use.js');
var sparql = require('./helpers/sparql.js');
var urlToText = require('./helpers/urlToText.js');
var utils = require('./helpers/utils.js');

var app = express();
app.use('/views',express.static(__dirname + '/views'));

/* Avoid CROSS Origin request */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/getUriFromQuery', function(req, res) {
  //parse query
  var query = req.query.q || "";
  var resultLength = req.query.num || 10;

  waterfall([
    // 1. Fetch Google urls
    function(callback){
      gCrawler.getGoogleResult(query, resultLength, function (error, googleLinks) {
        // Return Objects array : {title:"", url:""}
        callback(null, googleLinks);
    	});
    },
    // 2. Get text from Google URLs
    function(googleLinks, callback){
      urlToText.getTextFromGoogleLinks(googleLinks, function(err, linksWithText){
        callback(null, linksWithText);
    	});
    },
    // 3. Get spotlight URI from pages text
    function(linksWithText, callback){
      spotlight.spotlightSearchFromLinks(linksWithText, function(err, linksWithSpotlightURI){
        callback(null, linksWithSpotlightURI);
      });
    },
    // 4. Get triplets from spotlight URI
    function(linksWithSpotlightURI, callback){
      sparql.sparqlSearch(linksWithSpotlightURI, function(err, linksWithTriplets){
        callback(null, linksWithTriplets);
      });
    },
    // 5. Extract Objects and Subjects values from triplets
    function(linksWithTriplets, callback){
      utils.getSubjectsAndObjectsFromTriplets(linksWithTriplets, function(err, linksWithSubjectsObjects){
        callback(null, linksWithSubjectsObjects);
      });
    },
    // 6. calculate jaccard index
    function(linksWithSubjectsObjects, callback){
      jaccard.calculateMultipleJaccardIndex(linksWithSubjectsObjects, function(err, linksWithJaccard){
        callback(null, linksWithJaccard);
      });
    }
  ], function (err, result) {
    for(var i = 0; i < result.length; i++) {
      //console.log(result[i]);
    }
    // on obtient ici le Json de création du graph
    console.log(utils.constructGraph(result));

    var resultForFront = {list:[], graph:{}};
    resultForFront.list = result;
    resultForFront.graph = utils.constructGraph(result);
    console.log(resultForFront.graph);
	  res.contentType('application/json');
	  res.send(JSON.stringify(resultForFront));
    // result now equals 'done'
  });
});

app.get('/getSearchUrls', function (req, res) {
	var searchQuery = req.query.q;
  // default google results is set to 10
	var num = req.query.num || 10;

	gCrawler.getGoogleResult(searchQuery, num, function (error, links) {
    // Return Objects array : {title:"", url:""}
	  res.contentType('application/json');
	  res.send(JSON.stringify(links));
	});
});

app.get('/getTextfromUrl', function(req, res) {
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
    res.send('Spotlight search : ' + JSON.stringify(results));

    //*************************************************
    //    CALL SPARQL WITH THE RESULTS OF SPOTLIGHT
    //**************************************************

    //-------------------------------Set synthaxe of URIs for query
    /*
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
    */
	});
});

//----------------------------------- test jaccard index
app.get('/jaccard', function(req,res) {
  res.send("Test Jaccard index");
  var tab1 = {'A':1, 'B':2, 'C':4};
  var tab2 =  {'A':1, 'B':2, 'C':4, 'D':7};

  console.log(jaccard.calculateJaccardIndex(tab1,tab2));

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
