function getPinImage( count ) {
	var scale = 1 + (count * 0.1),
	    pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + count + "|FE7569",
		null, null, null, new google.maps.Size(21 * scale, 34 * scale)
	);
	return pinImage;
}

function getPinShadow() {
	var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		null, null, new google.maps.Point(12, 35));
	return pinShadow;
}

function addMarker( lat, lng ) {
	var marker = new google.maps.Marker({
			position: new google.maps.LatLng( lat, lng ),
			animation: google.maps.Animation.DROP,
			icon: pinImage,
			shadow: pinShadow,
			map: map
		});
	return marker;
}

$(document).ready(function() {
	var center    = new google.maps.LatLng(56, -96),
	    myOptions = {
			'zoom': 3,
			'center': center,
			'mapTypeId': google.maps.MapTypeId.ROADMAP
		},
	    map       = new google.maps.Map(document.getElementById('map'), myOptions),
	    geocoder  = new google.maps.Geocoder();
	
	$.get( "olympics.js", function(data) {
		var cities = JSON.parse( data );
		for (var i = 0; i < cities.length; i++) {
			var city      = cities[i],
			    count     = city.athletes.length,
			    pinImage  = getPinImage( count ),
			    pinShadow = getPinShadow();

			if ( city.lat && city.lng ) {
				addMarker( city.lat, city.lng );
			} else {
				geocoder.geocode( { "address": city.name }, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var location = results[0].geometry.location,
						    marker   = addMarker( location.d, location.e );
						console.log( city.name );
						console.log( location.d );
						console.log( location.e );
					}
				});
			}
		};
	} )

});