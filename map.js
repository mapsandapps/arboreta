mapboxgl.accessToken = mapboxToken;

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000,
  timeout           : 27000
};

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    // output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var lat  = position.coords.latitude;
    var lng = position.coords.longitude;
   
    map.panTo([lng, lat]);

    // TODO: draw person at [lng, lat]
  };

  function error() {
    // TODO: error handling
  };

  navigator.geolocation.watchPosition(success, error, geo_options);
}

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-84.3931875,33.7753208],
  pitch: 45, // pitch in degrees
  // bearing: 0, // bearing in degrees
  zoom: 17
});

var nav = new mapboxgl.Navigation({position: 'top-left'}); // position is optional
map.addControl(nav);

window.onload = geoFindMe;
