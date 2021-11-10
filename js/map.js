let myMap = L.map('mapid', {rotate:true});
myMap.setView([29.951065
, -90.071533], 15);

let tilesbg = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
let tiles = L.tileLayer("https://mapwarper.net/maps/tile/58607/{z}/{x}/{y}.png")
tilesbg.addTo(myMap)
tiles.addTo(myMap);

$.getJSON("https://cdn.glitch.com/095c6d41-a3ec-49e6-a0eb-30d2394c0254%2FMutinousWomen(1).geojson?v=1633112697275", function(data){
  
// let legend = L.control({position: 'bottomright'});
  
// legend.addTo(myMap);
  
  let rainCheckSites = L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:2,
        color: getcolor(feature)
      });
    },
    onEachFeature: addPopUp
    
    
  });
  
  
  
  rainCheckSites.addTo(myMap);
  
myMap.setBearing(52)
  
})




function addPopUp(feature,layer){
  
  let content = "Name:" + feature.properties.Name + "<br>" 
                + "Lot number:" + feature.properties.Lot;
  layer.bindPopup(content)
  
}

function getColor(feature){
  switch (feature.properties.TOOLS_INSTALLED) {
            case 'depaving':
              return  'orange';
            case 'downspout planter':
              return 'green';
            case 'Downspout planter':
              return 'green';
            case 'rain garden':
              return 'blue';
            case 'rain barrel':
              return 'purple';
            case 'Rain Barrel':
              return 'purple;'
            case 'permeable pavers':
              return 'pink';
            case 'Permeable pavers':
              return 'pink';
            default:
              return 'black';
          }
        }

myMap.on("contextmenu", function (event) {
  document.getElementById("title").innerText = event.latlng.toString();
  console.log("user right-clicked on map coordinates: " + event.latlng.toString());
  L.marker(event.latlng).addTo(myMap);
});



function getcolor (feature) {
  if(feature.properties.type == "person") {return 'blue'
    
  }
  else if (feature.properties.type == "street") {return 'orange'}
  else {return 'black'}
};


