app.desktop ={
	init: function(){
        app.common.getTwitter(app.desktop.initTwitter);
		app.common.toggleCloset('click');
        $('.back').on('click', function(e){
            history.back();
            e.preventDefault();
        });
        var s = skrollr.init({
            render: function(data) {
                $('.js-masonry').masonry();
                $('body').css('height', 'auto');
            }
        });
        var vh = ($.waypoints('viewportHeight')+200)+'px';
        $('.contatti').waypoint({
        	handler: function(d){
        		var el = $(this).find('.contatti-wrapper');
        		d == 'up' ? el.hide() : el.show();
        	},
        	offset: vh
        })
   },
	initAnimations: function(){
		new WOW().init();
	}, 
	logoAnimation: function(){
		var $body = $('body');
		var $logo = $('.logo');
      	$body.waypoint(function(dir){
	      	$body.toggleClass('shrink');
	      	if(dir == 'down'){
	      		$logo.hide();
	      	}else{
				$logo.show();
	      	}
	      },
			{offset: '-300px'
		});
	},
	setScrollSpy :function(){
		// http://jsfiddle.net/mekwall/up4nu/
		var lastId,
		topMenu = $("header"),
		topMenuHeight = topMenu.height(),
		menuItems = topMenu.find("nav.hp li a"),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});
		menuItems.click(function(e){
			var href = $(this).attr("href") || '#home',
			offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
			$('html, body').stop().animate({
			scrollTop: offsetTop
			}, 300);
			e.preventDefault();
		});
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
       var tk = $('#social-dk-content').html(content).newsTicker({
			 	row_height: 65,
				max_row: 1,
			   speed: 500,
			   duration: 4000
		 });
   },
	initSmoothState: function(){
      var $body    = $('html, body'),
       content  = $('#main').smoothState({
           prefetch: true,
           pageCacheSize: 4,
			  blacklist:'nav a',
           onStart: {
               duration: 250,
               render: function (url, $container) {
                   content.toggleAnimationClass('is-exiting');
                   $body.css('height', 'auto').animate({
                       scrollTop: 0
                   });
               }
           }
       }).data('smoothState');
	},
	initCarousel: function(){
		var $carousel = $('.gallery-content');
		$carousel.slick({
		  dots: true,
		  autoplay:true,
		  fade: true,
		  arrows:true,
		  speed: 600,
		  adaptiveHeight: true
		});
	}
};

app.desktop.setScrollSpy();
app.desktop.initAnimations();
app.common.initTooltip();

$(function(){
    app.desktop.logoAnimation();
    app.desktop.initNav();
    app.desktop.initCarousel();
});

