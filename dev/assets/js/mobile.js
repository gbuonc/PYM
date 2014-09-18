app.mobile ={
    init: function(){
    //    app.touch.init();
    // app.common.getTwitter(app.desktop.initTwitter);
       //app.mobile.initMapSlider();
       console.warn('Init mobile');
    },
    // mappa -------------------------------------------------------------
    initMapSlider: function(){
       var w= (90 / 100) * ($(document).width()); // 90% of document width
       $('.swiper-container-map').find('.swiper-slide').css('width', w);
       var mapSwiper = new Swiper('.swiper-container-map',{
         slidesPerView: 'auto',
         onSlideClick : function(slide) {
            if(slide.activeIndex <= 0){
               mapSwiper.swipeNext();
            }else{
               mapSwiper.swipePrev();
            }
         }
      });
    },
    clear: function(){
       console.log('mobile clear');
    }
}
