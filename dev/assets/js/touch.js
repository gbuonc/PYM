MBP.hideUrlBarOnLoad();
MBP.scaleFix();
app.touch ={
	init: function(){
		app.common.getTwitter(app.touch.initSocialSlider);
	},
	initSocialSlider: function(socialData, spinner){
	   var content = '';
	   var string = '<div class="swiper-slide"><a href="{url}" target="_blank"><p><strong class="date center"><span><i class="icon-tw"></i></span><br>{date}</strong>{content}</p></a></div>';
	   var l = socialData.length;
	   for(i=0; i<l; i++){
	      var obj = socialData[i];
	      var t = microTemplate(string, obj);
	      content += t+'\n';
	   }
		spinner.spin(false);
	   $('#social-content').html(content);
      // init social slider
	   var jsSwiper = new Swiper('.swiper-container-social',{
         mode:'horizontal',
         loop: true,
         centeredSlides:true,
         slidesPerView: 3,
         DOMAnimation:true,
         useCSS3Transforms: true,
         pagination: '.pager'
      });
      //if(jsSwiper) jsSwiper.reInit();
	}
};

$(function(){
	app.common.toggleCloset('tap');
	// main menu & Closets------------------------------
	$('.main-wrap')
	.on('tap', '.hp-header', function(){
		$(this).toggleClass('open');
	})
	.on('tap', '.hp a', function(e){
		e.preventDefault();
		var el = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(el).offset().top-50
		}, 600)
	.on('tap', '.back', function(e){
		console.log('dasd');
		history.back();
		e.preventDefault();
		});
	});
});
