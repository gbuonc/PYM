app.mobile ={
    init: function(){
        app.touch.init();
        app.common.initTooltip();
        app.common.initMap();
    }
}
setInterval(function(){
$('.js-masonry').each(function(){
	var $el = $(this);
	$el.masonry();
	});
}, 500);
	







