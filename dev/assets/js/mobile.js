app.mobile ={
    init: function(){
        app.touch.init();
        app.common.initTooltip();
        if($('#map').size() > 0){
        	app.common.initMap();
        }
        $('.back').on('click', function(e){
            history.back();
            e.preventDefault();
        });
    }
};
$(function(){
    salvattore.init();
});
//setInterval(function(){
// $('.js-masonry').each(function(){
// 	var $el = $(this);
// 	$el.masonry();
// 	});
// }, 500);
	
