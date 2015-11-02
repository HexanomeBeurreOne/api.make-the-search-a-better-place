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
	var lengthTab1 = tab1.length;
	var lengthTab2 = tab2.length;
	var numerateur = 0;
	var denominateur = 0;

	for (var i=0 ; i<lengthTab1 ; i++) {
		for (var j=0 ; j<lengthTab2 ; j++) {
			if(tab1[i].uri==tab2[j].uri) {
				if (tab1[i].nbApparition < tab2[j].nbApparition) {
					numerateur += tab1[i].nbApparition;
					denominateur += tab2[j].nbApparition;
				} else {
					denominateur += tab1[i].nbApparition;
					numerateur += tab2[j].nbApparition;
				}
			}
		}
	}
	return numerateur/denominateur;
};
module.exports.calculateJaccardIndex = calculateJaccardIndex;
