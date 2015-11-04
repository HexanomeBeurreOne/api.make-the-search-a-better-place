

var async = require('async');

// convert an array to a sorted JSON : {"ArrayElement" : "Number of occurences"}
var arrayToSortedJSON = function(array) {
  var newJSON = {};
  for (var i = 0; i < array.length; i++) {
    newJSON[array[i]] = newJSON[array[i]] ? newJSON[array[i]]+1 : 1;
  }
  return newJSON;
};
module.exports.arrayToSortedJSON = arrayToSortedJSON;



var getSubjectsAndObjectsFromTriplets = function(pages, maincallback) {
	
	async.forEachOf(pages, function (value, key, callback) {

		var subjectsObjectsJSON = {};
		var keywordsUri;
		if (value.triplets) {
			for (var i = 0; i < value.triplets[0].results.bindings.length; i++) {
				var subject = value.triplets[0].results.bindings[i].s;
				var object = value.triplets[0].results.bindings[i].o;

				if(!subjectsObjectsJSON[subject.value]) {

	                var str = JSON.stringify(value.triplets[0].results.bindings[i].s.value);
	                var line = str.split("/");
	                keywordsUri = (keywordsUri?keywordsUri:"") + line[line.length-1]+" ";
	            }

				subjectsObjectsJSON[subject.value] = subjectsObjectsJSON[subject.value] ? subjectsObjectsJSON[subject.value]+1 : 1;
				subjectsObjectsJSON[object.value] = subjectsObjectsJSON[object.value] ? subjectsObjectsJSON[object.value]+1 : 1;
			}

			pages[key].SubjectsObjects = subjectsObjectsJSON;
			pages[key].KeywordsUri = keywordsUri;

			callback();
		}
		else	{
			pages[key].SubjectsObjects = [];
			callback();
		}

	}, function (err) {
		if (err) console.error(err.message);
		// Returns to maincallback googleLinks with URLs text
		maincallback(null, pages);
	});
};
module.exports.getSubjectsAndObjectsFromTriplets = getSubjectsAndObjectsFromTriplets;

var constructGraph = function(pages) {
	var graph = {};

	var nodes = [];
	var links = [];
	for(var i=0 ; i<pages.length ; i++) {
		nodes.push({"name":pages[i].title,"group":i});
		for(var j=i+1 ; j<pages.length ; j++) {
			links.push({"source":i,"target":j,"value":pages[i].Jaccard[j-i-1]});
		}
	}
	graph["nodes"] = nodes;
	graph["links"] = links;

	return graph;
}
module.exports.constructGraph = constructGraph;