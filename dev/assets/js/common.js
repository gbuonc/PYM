app.common = {
   initMap: function(){
      var map = L.map('map', {
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl:true
    }).setView([45.4640, 9.1796], 15);
      L.tileLayer('http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png', {
      attribution: '&copy;2014 Esri & Stamen, Data from OSM and Natural Earth',
      subdomains: '0123',
      minZoom: 13,
      maxZoom: 17,
      detectRetina: true
      }).addTo(map);
      var pymIcon = L.icon({
         iconUrl: 'assets/img/marker.png',
         iconRetinaUrl: 'assets/img/marker.png',
         iconSize: [120, 100],
         iconAnchor: [60, 100],
      });
      L.control.zoom({position: 'topright'});
      var marker = L.marker([45.4633, 9.1796], {icon: pymIcon}).addTo(map);
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
   fancyboxConfig:{
      helpers : {
         overlay : {
            css : {
               'background' : 'rgba(255, 255, 255, 0.85)'
            }
         }
      }
   }
}

// Common helpers -------------------------------------------------------------
var fbPostsGraph = 'https://graph.facebook.com/letlovin/posts?access_token=390253567719306%7C-MSuVYmEpw5bLY-bsmopJd4ISS8&limit=3&callback=?';
var twitterStream = 'http://gianlucabuoncompagni.net/twitter/sample.php?callback=?';
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
