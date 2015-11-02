"use strict"

// extract entities from list of triplets
/*var extractEntities = function(json) {

	var tabOccurences =[];
	var found = false;

	}

	for (var i = 0; i < json.Triplets.results.bindings.length; i++) 
	{
		var item = json.Triplets.results.bindings[i].s["@value"];
		for (element in tabOccurences) {
			if (item == element.uri) {
				element.nbApparition++;
				found = true;
			}
		}
		if (!found) {
			tabOccurences.push(
				uri:,
				nbApparition: 1;
			)
		}
		while (item != tabItems[j].tabOccurences[0])
		tabOccurences.push(json.Triplets.results.bindings[i].s["@value"]);
	};

	return tabOccurence;
}*/

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
