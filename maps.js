var map, iw;

function getPinImage( count ) {
	var scale = 1 + (count * 0.05),
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

function addMarker( lat, lng, city ) {
	console.log('addMarker');
	console.log(lat);
	console.log(lng);
	console.log(city);
	console.log(map);

	var count = city.athletes.length,
	    marker = new google.maps.Marker({
			position: new google.maps.LatLng( lat, lng ),
			animation: google.maps.Animation.DROP,
			icon: getPinImage( count ),
			shadow: getPinShadow(),
			map: map
		});
	console.log('addListener');
	google.maps.event.addListener(marker, 'click', showInfoWindow( marker, city ));
	console.log('addListener done');
}

function geocode( geocoder, cityName, city ) {
	var count = city.athletes.length;

	geocoder.geocode( { "address": cityName }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var location = results[0].geometry.location;
			
			addMarker( location.d, location.e, city );
			console.log( cityName );
			console.log( location.d );
			console.log( location.e );
		}
	});
}

function showInfoWindow( marker, city ) {
	console.log('showInfoWindow');
	var text = "<strong>" + city.name + "</strong><ul>";
	for (var i = 0; i < city.athletes.length; i++) {
		text += "<li>" + city.athletes[i].name + "</li>";
	};
	text += "</ul>";
	console.log( text );

	return function() {
        if (iw) {
            iw.close();
            iw = null;
        }

        iw = new google.maps.InfoWindow({ content: text });
        iw.open(map, marker);
    };
}

$(document).ready(function() {
	var center    = new google.maps.LatLng(56, -96),
	    myOptions = {
			'zoom': 3,
			'center': center,
			'mapTypeId': google.maps.MapTypeId.ROADMAP
		},
	    geocoder  = new google.maps.Geocoder();
	map           = new google.maps.Map(document.getElementById('map'), myOptions),
	
	$.get( "olympics.js", function(data) {
		var cities = JSON.parse( data );
		for (var i = 0; i < cities.length; i++) {
			var city      = cities[i];

			if ( city.lat && city.lng ) {
				addMarker( city.lat, city.lng, city );
			} else {
				geocode( geocoder, city.name, city );
			}
		};
	});
});