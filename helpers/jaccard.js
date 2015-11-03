"use strict"

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

var calculateMultipleJaccardIndex = function() {
	
}
