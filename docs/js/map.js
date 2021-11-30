let myMap = L.map('mapid', {rotate:true});
myMap.setView([29.958232, -90.065136], 16);

let tilesbg = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}')
let tiles = L.tileLayer("https://mapwarper.net/maps/tile/58607/{z}/{x}/{y}.png")
tilesbg.addTo(myMap)
tiles.addTo(myMap);

$.getJSON("https://cdn.glitch.me/ff68c5af-6a66-41a2-892e-9495a1e61e6d%2FMutinousWomen-latest%20update-november%2010th%20-%20MutinousWomen-latest%20update-novembre%204th.geojson?v=1637690445076", function(data){
  
// let legend = L.control({position: 'bottomright'});
  
// legend.addTo(myMap);
  
  let rainCheckSites = L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:4,
        color: getcolor(feature)
      });
    },
    onEachFeature: function(feature,layer){
      layer.on({
        click: zoomToFeature});
      addPopUp(feature,layer);
    }
    
    
  });
  
  
  
  rainCheckSites.addTo(myMap);

let legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  let div = L.DomUtil.create("div", "legend");
  div.innerHTML += '<img src="https://cdn.glitch.me/ff68c5af-6a66-41a2-892e-9495a1e61e6d%2Fmutine-women-legend.jpg?v=1637694856933" style="width:200px">'
  

  return div;
};

legend.addTo(myMap);

  
myMap.setBearing(52)
  
})




function addPopUp(feature,layer){
  
  let content = "<b>";

  if (feature.properties.Name !== ""){
    content+="Name: " + feature.properties.Name + "<br>";

  }

  if(feature.properties.Lot !=="" && feature.properties.Lot !== "N/A" && feature.properties.Lot !== " "){
    content+= "Lot number: " + feature.properties.Lot + "<br>";

  }

  if (feature.properties.Ship_number !== ""){
    content+="Ship + Passenger number: " + feature.properties.Ship_number + "<br>";

  }

  if (feature.properties.Birth !== ""){
    content+="Birth: " + feature.properties.Birth + "<br>";

  }

  if (feature.properties.Death !== ""){
    content+="Death: " + feature.properties.Death + "<br>";

  }

  if (feature.properties.Bio !== ""){
    content+="</b>"+"<br>" + feature.properties.Bio + "<br>";

  }

    if (feature.properties.Image !== ""){
    content+= "<br>"+"<img width=300 src='"+feature.properties.Image+"'>"
                 + "<br>";

  }

  if(feature.properties.Image !== "" && feature.properties.Type!=="other "){
    content+="<br>"+"<i>" + "Image taken: 2018"+"</i>";
  }

 layer.bindPopup(content, 
      {
      'maxWidth': '300',
      'className' : 'popupCustom',
      'maxHeight':'200'
      }
)   }
  




function getcolor (feature) {
  if(feature.properties.Type == "person") {return 'blue'
    
  }
  else if (feature.properties.Type == "street") {return 'orange'}
  else if (feature.properties.Type == "public building") {return 'green'}
  else {return 'black'}
};

function highlightFeature(e) {

    var layer = e.target;
    rainCheckSites.resetStyle(this);

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    }

function zoomToFeature(e) {
    myMap.setView(e.target.getLatLng(),16);
}

