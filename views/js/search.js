$(function() {
    // Get the form.
    var form = $('#searchForm');

    // Get List element
    var list = $('#resultList');

    $(form).submit(function(event) {

        /* stop form from submitting normally */
        event.preventDefault();

	    // Get input query
	    var query = $('#query').val();

        /* Send the data using get */
        $.get('/search', {q: query}, function (data) {
        	console.log(data);
        	for(var i = 0, l = data.length; i< l; i++)	{
        		var link = data[i];
        		list.append("<li class='list-group-item'>" + link.title + " : " + link.uri + "</li>");
        	}
        });
      });
});