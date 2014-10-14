app.windowHeight = $.waypoints('viewportHeight');
app.desktop ={
    init: function(){
		 var s = skrollr.init();
        //$('#home').height(app.windowHeight);
        app.common.getTwitter(app.desktop.initTwitter);
        //app.common.initGrids();
    },
    initAnimations: function(anims){
       var $body = $('body');
       var h =  $body.height();
       var l = anims.length;
       for(var i=0; i<l; i++){
          (function(e){
             var k = anims[e].cls;
             var o = anims[e].offset
             $body.waypoint(function(){
                 $body.toggleClass(k);
              }, {offset: '-'+o+'px'});
          })(i);
       }
    },
	 
    setScrollSpy :function(){
      // http://jsfiddle.net/mekwall/up4nu/
      var lastId,
      topMenu = $("header"),
      topMenuHeight = topMenu.height(),
      menuItems = topMenu.find("nav li a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
         var item = $($(this).attr("href"));
         if (item.length) { return item; }
      });
      // fancy scroll animation
      menuItems.click(function(e){
         var href = $(this).attr("href") || '#home',
         offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
         $('html, body').stop().animate({
            scrollTop: offsetTop
         }, 300);
         e.preventDefault();
      });
      // Bind to scroll
      $(window).scroll(function(){
         var fromTop = $(this).scrollTop()+($(window).height()/2);
         var cur = scrollItems.map(function(i){
            // check if current scroll item is in page
            if ($(this).offset().top < fromTop){
               // return previous items if is fully visible in page (needs sonar.js)
               if($(scrollItems[i-1]).sonar(0, true)){
                  return scrollItems[i-1];
               }else{
                  return this;
               }
            }
         });
         // Get the id of the current element
         cur = cur[cur.length-1];
         var id = cur && cur.length ? cur[0].id : "";
         if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems.removeClass("active")
            .filter("[href=#"+id+"]").addClass("active");
         }
      });
   },
   /* doParallax : function(){
      var $window = $(window);
      var windowHeight = $window.height();
      var $tile= $('.parallax');
      $tile.each(function(){
         var $bgobj = $(this);
         var speed = 0.30; //$bgobj.data('speed') || 0.75;
         $window.scroll(function() {
            var scrollTop = $(window).scrollTop();
            var offset = $bgobj.offset().top;
            var height = $bgobj.outerHeight();
            // Check if above or below viewport
            if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
               return;
            }
            var yBgPosition = Math.round((offset - scrollTop) * speed);
            $bgobj.css('background-position', 'center ' + yBgPosition + 'px');
         });
      });
   }, */
   initNav : function(){
      var $navLinks = $('header').find('a');
      $navLinks.on('click', function(){
         $navLinks.removeClass('active');
         $(this).addClass('active');
      });
   },
   initTwitter: function(socialData, spinner){
      var content = '';
       var string = '<li class="tw-content"><i class="icon-tw"></i><strong class="date">{date}</strong><p><a href="{url}" target="_blank"> {content}</a></p></li>'
       var l = socialData.length;
       for(i=0; i<l; i++){
          var obj = socialData[i];
          var t = microTemplate(string, obj);
          content += t+'\n';
       }
        spinner.spin(false);
       var tk = $('#social-dk-content').html(content).newsTicker();
   },
    clear: function(){
       console.log('desktop clear');
    }
}

$(function(){
   app.common.initMap(16);
   app.common.toggleCloset('click');
   app.desktop.initAnimations(anims);
   app.desktop.initNav();
   app.desktop.setScrollSpy();
   // app.desktop.doParallax();
   // new WOW().init();
});

// waypoints animations ----------------------------------------------------------------
var anims = [
   {offset: app.windowHeight/1.8, cls: 'shrink'}
]
