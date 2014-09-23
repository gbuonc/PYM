MBP.hideUrlBarOnLoad();
MBP.scaleFix();
// window.addEventListener('load', function() {
// 	FastClick.attach(document.body);
// }, false);
app.touch ={
init: function(){
	app.common.getTwitter(app.touch.initSocialSlider);
},
// 	// touch sliders ----------------------------------------------------
	initSliders: function(cat){
		if(sliderz.slide[cat]){
			sliderz.slide[cat].reInit();
		}else{
			var category = '.swiper-container-'+cat;
			var $caption = $(category).find('.bCaption');
			var setInfo = function(){
			var $current = $(sliderz.slide[cat].activeSlide());
			var captionContent = $current.find('.caption').html();
			$caption.html(captionContent);
		}
		sliderz.slide[cat] = new Swiper(category,{
			mode:'horizontal',
			loop: true,
			centeredSlides:true,
			slidesPerView: 3,
			onSlideChangeEnd:setInfo
		});
			setInfo();
		}
	},
	initSocialSlider: function(socialData, spinner){
	   var content = '';
	   var string = '<div class="swiper-slide"><a href="{url}" target="_blank"><p><strong class="date center"><span><i class="icon-tw"></i></span><br>{date}</strong>{content}</p></a></div>'
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
      jsSwiper.reInit();
	},
	clear: function(){
	   console.log('mobile clear');
	}
}
var sliderz ={
   slide:{},
   onload: ['cover', 'graphic', 'editing', 'adv']
}

$(function(){
	// main menu -----------------------------------------
	$('.main-wrap').on('click', 'header', function(){
		$(this).toggleClass('open');
		}).on('click', '#main-nav a', function(e){
		e.preventDefault();
		var el = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(el).offset().top-50
		}, 600);
	});
	// sliders
	for(var i =0, l = sliderz.onload.length; i<l; i++){
		app.touch.initSliders(sliderz.onload[i])
	}
});
