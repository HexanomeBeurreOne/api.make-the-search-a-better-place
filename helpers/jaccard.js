"use strict"

var async = require('async');

// calculate the jaccard index between two tabs
var calculateJaccardIndex = function(tab1, tab2) {
	var sameUri = 0;
	var lengthTab1 = Object.keys(tab1).length;
	var lengthTab2 = Object.keys(tab2).length;
	var numerateur = 0;
	var denominateur = 0;

	Object.keys(tab1).map(function(keys) {
		if(tab2[keys]) {
			sameUri++;
		}			
	});
	return (sameUri/(lengthTab1+lengthTab2-sameUri));
};
module.exports.calculateJaccardIndex = calculateJaccardIndex;

var calculateMultipleJaccardIndex = function(pages, maincallback) {
	
	async.forEachOf(pages, function (value, key, callback) {
		var jaccardTab = [];
		for (var i=key+1 ; i<pages.length ; i++){
				var jaccard = calculateJaccardIndex(value.SubjectsObjects,pages[i].SubjectsObjects);
				jaccardTab.push(jaccard);
		}
		pages[key].Jaccard=jaccardTab;
		callback();
	}, function (err) {
		if (err) console.error(err.message);
		// Returns to maincallback googleLinks with URLs text
		maincallback(null, pages);
	});
};
module.exports.calculateMultipleJaccardIndex = calculateMultipleJaccardIndex;
