window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1j1SCPHihhVxgW0wm5KM0TNQ4WEK_iI91JJtYqvXu8Ok&output=html';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                  callback: showInfo } )
}

var arboreta = [];

function showInfo(data, tabletop) {
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      var arboretum = data[i];
      arboreta.push(arboretum.name);
    }
  }
  console.log(arboreta);
  console.log(tabletop.sheets("GT"));
  mapData(tabletop);
  console.log('done');
}

function mapData(data) {
  for (var i in arboreta) {
    if (arboreta.hasOwnProperty(i)) {
      var arboretumName = arboreta[i];
      var arboretum = data.sheets(arboretumName);
      // TODO: make sure map is loaded before adding to it
      for (var j in arboretum.elements) {
        if (arboretum.elements.hasOwnProperty(j)) {
          var tree = arboretum.elements[j];
          addTreeToMap(tree);
        }
      }
    }
  }
}

function addTreeToMap(tree) {

  var el = document.createElement('div');
  el.className = 'marker';
  var icon = tree.icon === '' || typeof(tree.icon) === 'undefined' ? 'pine-tree' : tree.icon;
  el.style.backgroundImage = 'url("icons/' + icon + '.svg")';
  el.style.backgroundSize = 'cover';
  el.style.fill = '#9FBF62';
  el.style.width = '40px';
  el.style.height = '40px';

  el.addEventListener('click', function() {
    console.log(tree['Common name']);
    document.getElementById('tree-info').innerHTML = '<span class="tree-name">' + tree['Common name'] + '</span>';
  });

  new mapboxgl.Marker(el, {offset: [-20, -20]})
    .setLngLat([tree.longitude, tree.latitude])
    .addTo(map);

}
