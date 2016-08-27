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

var geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "message": "Crepe Myrtle",
        "iconSize": [60, 60]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -84.4003,
          33.7775
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "message": "Overcup Oak",
        "iconSize": [50, 50]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -84.4006,
          33.7761
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "message": "White Oak",
        "iconSize": [40, 40]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -84.3947,
          33.7722
        ]
      }
    }
  ]
};

// add markers to map
geojson.features.forEach(function(marker) {
  // create a DOM element for the marker
  var el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = 'url("https://mapsandapps.github.io/arboreta/icons/romantic-tree-shape-with-heart-shaped-leaves.svg")';
  el.style.width = marker.properties.iconSize[0] + 'px';
  el.style.height = marker.properties.iconSize[1] + 'px';

  el.addEventListener('click', function() {
    window.alert(marker.properties.message);
  });

  // add marker to map
  new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
});
