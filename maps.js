$(document).ready(function() {
	alert('ready');
	var center = new google.maps.LatLng(56, -96);
	var myOptions = {
		'zoom': 8,
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
		var olympians = JSON.parse( data );
		for (var i = 0; i < olympians.length; i++) {
			console.log( olympians[i] );
		};
	} )

});