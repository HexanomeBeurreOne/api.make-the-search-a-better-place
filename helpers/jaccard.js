"use strict"

var calculateJaccardIndex = function(tab1, tab2) {
	var sameUri = 0;
	for (var i=0 ; i<tab1.length ; i++) {
		for (var j = 0; j < tab2.length; j++) {
			if(tab1[i]==tab2[j]) sameUri++;
		};
	};
	return sameUri/(tab1.length+tab2.length-sameUri);
};
module.exports.calculateJaccardIndex = calculateJaccardIndex;
