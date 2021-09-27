
var map;



function myOwmMarker(data) {
	return L.marker([data.coord.Lat, data.coord.Lon]);
}

function myOwmPopup(data) {
	return L.popup().setContent(typeof data.name != 'undefined' ? data.name : data.id);
}

function initMap() {

	var standard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a>'
		});

	var humanitarian = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a> <a href="https://www.hotosm.org/" target="_blank">Tiles courtesy of Humanitarian OpenStreetMap Team</a>'
		});

	var esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
		maxZoom: 19, attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});

	// Get your own free OWM API key at https://www.openweathermap.org/appid - please do not re-use mine!
	// You don't need an API key for this to work at the moment, but this will change eventually.
	var OWM_API_KEY = '06aac0fd4ba239a20d824ef89602f311';

	var clouds = L.OWM.clouds({opacity: 0.8, legendImagePath: 'NT2.png', appId: OWM_API_KEY});
	var precipitation = L.OWM.precipitation( {opacity: 0.5, appId: OWM_API_KEY} );
	var rain = L.OWM.rain({opacity: 0.5, appId: OWM_API_KEY});
	var pressure = L.OWM.pressure({opacity: 0.4, appId: OWM_API_KEY});
	var temp = L.OWM.temperature({opacity: 0.5, appId: OWM_API_KEY});
	var wind = L.OWM.wind({opacity: 0.5, appId: OWM_API_KEY});


	var city = L.OWM.current({intervall: 15, imageLoadingUrl: 'owmloading.gif', minZoom: 5,
			appId: OWM_API_KEY});


	var useGeolocation = true;
	var zoom = 6;
	var lat = 18.03765;
	var lon = 102.41796

	map = L.map('map', {
		center: new L.LatLng(lat, lon), zoom: zoom,
		layers: [standard]
	});
	map.attributionControl.setPrefix("");



	var baseMaps = {
		"OSM Standard": standard
		, "OSM Humanitarian": humanitarian
		, "ESRI Aerial": esri
	};

	var overlayMaps = {
		'Clouds' : clouds,
		'Precipitation' : precipitation,
		'Rain' : rain,
		'Temperature' : temp,
		'Windspeed' : wind,
		'Pressure' : pressure,
		'City (Zoom)' : city

	};

	var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);
	map.addControl(new L.Control.Permalink({layers: layerControl, useAnchor: false, position: 'bottomright'}));

	// patch layerControl to add some titles

}
