var maxOfPage = 30;
var numOfPage;

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}



$(function() {
    $('.lang').click(function(){
       $('.lang').removeClass("active");
       $(this).addClass("active");
    });
    // Get the form.
    var form = $('#searchForm');

    // Get List element
    var list = $('#resultList');
    updateNumberOfPage(50);
    $(form).submit(function(event) {
        list.text("");
        /* stop form from submitting normally */
        event.preventDefault();
        $('input').blur();
        $('input').attr('disabled', true);
        
	    // Get input query
	    var query = $('#query').val();
        var lang = $('.lang.active').text();
        console.log("Language selected is " + lang);
        /* Send the data using get */
        $.get('/getUriFromQuery', {q: query, num: Math.round(numOfPage), lang:lang}, function (data) {
        	
        	console.log(data);
        	for(var i = 0, l = Math.min(numOfPage, data.list.length); i< l; i++)	{
        		var link = data.list[i];
        		list.append("<a class='list-group-item' href='" + link.url + "'>" + link.title + "</a>");
        	}
            console.log("Le graph vaut ");
            console.log(data.graph);
            if (data.graph) {
                console.log("Graph will be drawn");
                runD3Code(data.graph);
            }
            $('input').attr('disabled', false);
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
	
    numOfPage = Math.round(percentage*maxOfPage/100);
    $('.volumeBar').css('width', numOfPage*100/maxOfPage + '%');
    $('#numOfLink').text("Nombre de pages : "+numOfPage);
}
