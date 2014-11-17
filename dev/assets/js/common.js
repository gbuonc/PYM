app.common = {
   initMap: function(){
		var mapOptions = {
			center: { lat: 45.4640, lng: 9.1796},
			zoom: 15,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [
		    {
		        "elementType": "geometry.fill",
		        "featureType": "landscape.natural",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "color": "#f2f2f2"
		            }
		        ]
		    },
		    {
		        "elementType": "geometry.fill",
		        "featureType": "poi",
		        "stylers": [
		            {
		                "visibility": "off"
						 }
		        ]
		    },
		    {
		        "elementType": "geometry.fill",
		        "featureType": "landscape.man_made"
		    },
		    {
		        "elementType": "geometry",
		        "featureType": "road",
		        "stylers": [
		            {
		                "lightness": 200
		            },
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "elementType": "labels",
		        "featureType": "road",
		        "stylers": [
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "stylers": [
		            {
		                "color": "#7dcdcd"
		            }
		        ]
		    },
		    {
		        "elementType": "geometry",
		        "featureType": "transit.line",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "lightness": 700
		            }
		        ]
		    }
		]};
	    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		var image = 'assets/img/marker.png';
		var myLatLng = new google.maps.LatLng(45.4634107, 9.179323);
		var pymMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image
		});
   },
   getTwitter: function(callback){
		var $social = $('#social');
		$social.spin();
        var getTweets = $.getJSON(twitterStream);
        $.when(getTweets)
        .then(function(twitterResponse){
         // success
         var TWR = twitterResponse[1];
         var socialArray = [];
			var l = TWR.length;
         for(var i = 0; i<l; i++){
            var TwObj = {};
            TwObj.site = 'twitter';
            TwObj.date = new Date(TWR[i].created_at).toLocaleDateString();
            TwObj.content = urlHyperlinks(TWR[i].text);
				TwObj.url = 	TWR[i].entities.urls[TWR[i].entities.urls.length-1].url;
            socialArray.push(TwObj);
         }
         // callback function
         if(callback) callback(socialArray, $social);
        }, function(){
         // error
			$social.spin(false);
         console.log('Error retrieving twitter stream');
        });
   },	
   toggleCloset: function(trigger){
		$('.main-wrap').on(trigger, '.toggle-label', function(e){
			e.preventDefault();
			app.common.initMap();
			$(this).closest('.toggle').toggleClass('open');
		});
	},
	initTooltip: function(){
		var targets = $( '[rel~=tooltip]' ),
		target  = false,
		tooltip = false,
		title   = false;
		targets.bind( 'mouseenter', function(){
			target  = $( this );
			tip     = target.attr( 'title' );
			tooltip = $( '<div class="tooltip"></div>' );
			if( !tip || tip == '' ) return false;
			target.removeAttr( 'title' );
			tooltip.css( 'opacity', 0 ).html( tip ).appendTo( 'body' );
			var init_tooltip = function(){
				if( $( window ).width() < tooltip.outerWidth() * 1.5 )
					tooltip.css( 'max-width', $( window ).width() / 2 );
				else
					tooltip.css( 'max-width', 340 );
				var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
				pos_top  = target.offset().top - tooltip.outerHeight() - 20;
				if( pos_left < 0 ){
					pos_left = target.offset().left + target.outerWidth() / 2 - 20;
					tooltip.addClass( 'left' );
				}
				else{
					tooltip.removeClass( 'left' );
				}
				if( pos_left + tooltip.outerWidth() > $( window ).width() ){
					pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
					tooltip.addClass( 'right' );
				}else{
					tooltip.removeClass( 'right' );
				}
				if( pos_top < 0 ){
					var pos_top  = target.offset().top + target.outerHeight();
					tooltip.addClass( 'top' );
				}
				else{
					tooltip.removeClass( 'top' );
				}
				tooltip.css( { left: pos_left, top: pos_top }).animate( { top: '+=10', opacity: 1 }, 50 );
			};
			init_tooltip();
			$(window).resize(init_tooltip);
			var remove_tooltip = function(){
				tooltip.animate( { top: '-=10', opacity: 0 }, 50, function(){
					$( this ).remove();
				});
				target.attr( 'title', tip );
			};
			target.bind( 'mouseleave', remove_tooltip );
			tooltip.bind( 'click', remove_tooltip );
		});
	}
};

// Common helpers -------------------------------------------------------------
var twitterStream = 'http://studiopym.com/twitter/proxy.php?callback=?';
function urlHyperlinks(str){
	//return str.replace(/\b((http|https):\/\/\S+)/g, '<a href="$1" target="_blank">$1</a>');
	return str.replace(/\b((http|https):\/\/t.co\S+)/g,'');
}
function microTemplate(s,d){
 for(var p in d)
   s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
 return s;
}

// Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-56589972-1', 'auto');
ga('send', 'pageview');

