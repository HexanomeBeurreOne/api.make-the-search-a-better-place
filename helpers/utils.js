

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

		for (var i = 0; i < value.triplets[0].results.bindings.length; i++) {

			subjectsObjectsJSON[value.triplets[0].results.bindings[i].s.value] = subjectsObjectsJSON[value.triplets[0].results.bindings[i].s.value] ? subjectsObjectsJSON[value.triplets[0].results.bindings[i].s.value]+1 : 1;

			subjectsObjectsJSON[value.triplets[0].results.bindings[i].o.value] = subjectsObjectsJSON[value.triplets[0].results.bindings[i].o.value] ? subjectsObjectsJSON[value.triplets[0].results.bindings[i].o.value]+1 : 1;
		}
		pages[key].NTM = subjectsObjectsJSON;

		callback();
	}, function (err) {
		if (err) console.error(err.message);
		// Returns to maincallback googleLinks with URLs text
		maincallback(null, pages);
	});
};
module.exports.getSubjectsAndObjectsFromTriplets = getSubjectsAndObjectsFromTriplets;
