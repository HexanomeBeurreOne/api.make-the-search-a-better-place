var maxOfPage = 20;
var numOfPage = 10;

$(function() {
    // Get the form.
    var form = $('#searchForm');

    // Get List element
    var list = $('#resultList');
    updateNumberOfPage(50);
    $(form).submit(function(event) {

        /* stop form from submitting normally */
        event.preventDefault();

	    // Get input query
	    var query = $('#query').val();

        /* Send the data using get */
        $.get('/getUriFromQuery', {q: query, num: Math.round(numOfPage)}, function (data) {
        	list.text("");
        	console.log(data);
        	for(var i = 0, l = numOfPage; i< l; i++)	{
        		var link = data[i];
        		list.append("<li class='list-group-item'>" + link.title + " : " + link.uri + "</li>");
        	}
        });
    });

	var volumeDrag = false;

	$('.volume').on('mousedown', function (e) {
	    volumeDrag = true;
	    updateVolume(e.pageX);
	});

	$(document).on('mouseup', function (e) {
	    if (volumeDrag) {
	        volumeDrag = false;
	        updateVolume(e.pageX);
	    }
	});

	$(document).on('mousemove', function (e) {
	    if (volumeDrag) {
	        updateVolume(e.pageX);
	    }
	});
});

var updateVolume = function (x, vol) {
    var volume = $('.volume');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if (vol) {
        percentage = vol * 100;
    } else {
        var position = x - volume.offset().left;
        percentage = 100 * position / volume.width();
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar and video volume
    updateNumberOfPage(percentage);
};

var updateNumberOfPage = function(percentage) {
	$('.volumeBar').css('width', percentage + '%');
    numOfPage = Math.round(percentage*maxOfPage/100);
    $('#numOfLink').text("Nombre de pages : "+numOfPage);
}