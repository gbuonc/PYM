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
var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
g.src='//www.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));
