let myMap = L.map('mapid', {rotate:true});
myMap.setView([29.957588538774026, -90.06292144027744], 15);

let tilesbg = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}')
let tiles = L.tileLayer("https://mapwarper.net/maps/tile/58607/{z}/{x}/{y}.png")
tilesbg.addTo(myMap)
tiles.addTo(myMap);

$.getJSON("https://cdn.glitch.me/095c6d41-a3ec-49e6-a0eb-30d2394c0254%2FMutinousWomen5.geojson?v=1636589906502", function(data){
  
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
  
  if (feature.properties.Type=="street"||feature.properties.Type=="person"){
    
    
    

  
  let content = "<b>"+"Name: " + feature.properties.Name + "<br>" 
                + "Lot number: " + feature.properties.Lot + "<br>"
                + "Ship, Passenger number: " + feature.properties.Ship_number + "<br>"
                + "Birth: "+ feature.properties.Birth + "<br>"
                + "Death: "+ feature.properties.Death + "<br>"+"</b>"
                + "<br>"
                + feature.properties.Bio + "<br>"
                +"<br>"
                + "<img width=300 src='"+feature.properties.Image+"'>"
                + "<br>"
  
                 
 layer.bindPopup(content)   }
  
  else if (feature.properties.Type=="public building"){
  
  
    let content = "<b>"
                + "<b>"+ feature.properties.Name + "<br>" 
                +"<br>"
                + feature.properties.Bio + "<br>"
                +"<br>"
                + "<img width=300 src='"+feature.properties.Image+"'>"
                + "<br>"
  
                 
 layer.bindPopup(content)   }
  
   else if (feature.properties.Type=="other "){
 
 let content = "<b>"+"Name: " + feature.properties.Name + "<br>" 
                + "Lot number: " + feature.properties.Lot + "<br>"
                + "Ship, Passenger number: " + feature.properties.Ship_number + "<br>"
                + "Birth: "+ feature.properties.Birth + "<br>"
                + "Death: "+ feature.properties.Death + "<br>"+"</b>"
                + "<br>"
                + feature.properties.Bio + "<br>"
                +"<br>"
                + "<img width=300 src='"+feature.properties.Image+"'>"
                + "<br>"
  
      
               
  
                 
 layer.bindPopup(content)  
    
    
  }
  
  
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
  //L.marker(event.latlng).addTo(myMap);
});



function getcolor (feature) {
  if(feature.properties.Type == "person") {return '#1F618D'
    
  }
  else if (feature.properties.Type == "street") {return '#AF601A'}
  else if (feature.properties.Type == "public building") {return '#1D8348'}
  else {return 'black'}
};


