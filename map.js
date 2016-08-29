mapboxgl.accessToken = mapboxToken;

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000,
  timeout           : 27000
};

function geoFindMe() {
  console.log('geolocation init');

  if (!navigator.geolocation){
    // output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    console.log('geolocation success');
    var lat  = position.coords.latitude;
    var lng = position.coords.longitude;
   
    map.panTo([lng, lat]);

    // TODO: remove before drawing
    // remove .person-marker
    // TODO: draw person at [lng, lat]
    if (document.querySelectorAll(".person-marker").length > 0) {
      var existingPersonMarker = document.querySelectorAll(".person-marker")[0];
      existingPersonMarker.parentNode.removeChild(existingPersonMarker);
    }
    var person = document.createElement('div');
    person.className = 'person-marker';
    person.style.width = '40px';
    person.style.height = '40px';
    person.style.backgroundImage = 'url("icons/stick-man-walking.svg")';
    person.style.backgroundSize = 'cover';
    new mapboxgl.Marker(person, {offset: [-20, -20]})
      .setLngLat([lng, lat])
      .addTo(map);
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
  zoom: 15 // TODO: change to 17
});

var nav = new mapboxgl.Navigation({position: 'top-left'}); // position is optional
map.addControl(nav);

console.log('map loaded');

// window.onload = geoFindMe;
geoFindMe();
