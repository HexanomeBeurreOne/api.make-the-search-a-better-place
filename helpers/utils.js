// convert an array to a sorted JSON : {"ArrayElement" : "Number of occurences"}
var arrayToSortedJSON = function(array) {
  var newJSON = {};
  for (var i = 0; i < array.length; i++) {
    newJSON[array[i]] = newJSON[array[i]] ? newJSON[array[i]]+1 : 1;
  }
  return newJSON;
};
module.exports.arrayToSortedJSON = arrayToSortedJSON;
