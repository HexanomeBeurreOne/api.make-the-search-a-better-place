"use strict"

// calculate the jaccard index between two tabs
var calculateJaccardIndex = function(tab1, tab2) {
	var sameUri = 0;
	var lengthTab1 = tab1.length;
	var lengthTab2 = tab2.length;

	for (var i=0 ; i<lengthTab1 ; i++) {
		for (var j=0 ; j<lengthTab2 ; j++) {
			if(tab1[i]==tab2[j]) sameUri++;
		};
	};
	return sameUri/(lengthTab1+lengthTab2-sameUri);
};
module.exports.calculateJaccardIndex = calculateJaccardIndex;
