$(document).ready(function() {
	alert('ready');
	var center = new google.maps.LatLng(56, -96);
	var myOptions = {
		'zoom': 3,
		'center': center,
		'mapTypeId': google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), myOptions);	
	// var marker = new google.maps.Marker({
	// 	position: center, 
	// 	map: map, 
	// 	title:'Post Location'
	// });
	alert('mapped');

	$.get( "olympics.js", function(data) {
		console.log('success');
		var cities = JSON.parse( data );
		for (var i = 0; i < cities.length; i++) {
			var city = cities[i]
			console.log( city );

			var count = city.athletes.length,
			    scale = 1 + (count * 0.1);
			console.log( 'Scale: ' + scale );

			// Generate the pin's image
			var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + count + "|FE7569",
	            null, null, null,
	            new google.maps.Size(21 * scale, 34 * scale)
	        );

	        // Generate the pin's shadow
	        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
	            null, null, new google.maps.Point(12, 35));

	        var geocoder = new google.maps.Geocoder();
		    if (geocoder) {
				geocoder.geocode({"address": city.name}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						console.log( 'LL:' );
						console.log( results[0].geometry.location.d );
						console.log( results[0].geometry.location.e );
						var marker = new google.maps.Marker({
						    position: new google.maps.LatLng( results[0].geometry.location.d, results[0].geometry.location.e ),
						    animation: google.maps.Animation.DROP,
						    icon: pinImage,
						    shadow: pinShadow,
						    map: map
						});
					}
				});
			}
			


		};
	} )

});