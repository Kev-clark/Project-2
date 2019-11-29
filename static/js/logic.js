var LeafIcon = L.Icon.extend({
  options: {
      shadowUrl: 'leaf-shadow.png',
      iconSize:     [38, 95],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
  }
});

var goldMedalIcon = new LeafIcon({iconUrl: 'gold.png'}),
    silverMedalIcon = new LeafIcon({iconUrl: 'Silver.png'}),
    BronzeMedalIcon = new LeafIcon({iconUrl: 'Bronze.png'});

function buildMap(data)

    // Create a map object
const myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
}).addTo(myMap);

const countries = data;
// Loop through the cities array and create one marker for each city object
countries.forEach(country => {
    var location=[country.lat, country.long];
        if(country.long == null || country.lat == null){
            location=[25,-50]
        }
    // Conditionals for countries points
    let color = "";
    if (country.gold > country.silver &&country.gold > country.bronze) {
        color = "gold";
        L.marker(location, {
            icon: goldMedalIcon
            
           }).bindPopup("<h1>" + country.Name + "</h1> <hr> <br>Total events competed: "+country.count+"<h3>Medals:  <br>Gold: "+country.gold+"<br>Silver: "+country.silver+"<br>Bronze: "+country.bronze+"</h3>").addTo(myMap);
    }
    else if (country.silver > country.bronze) {
        color = "silver";
        L.marker(location, {
            icon: silverMedalIcon
            
           }).bindPopup("<h1>" + country.Name + "</h1> <hr> <br>Total events competed: "+country.count+"<h3>Medals:  <br>Gold: "+country.gold+"<br>Silver: "+country.silver+"<br>Bronze: "+country.bronze+"</h3>").addTo(myMap);
    }
    else if (country.bronze > 0) {
        color = "bronze";
        L.marker(location, {
            icon:  BronzeMedalIcon
            
           }).bindPopup("<h1>" + country.Name + "</h1> <hr> <br>Total events competed: "+country.count+"<h3>Medals:  <br>Gold: "+country.gold+"<br>Silver: "+country.silver+"<br>Bronze: "+country.bronze+"</h3>").addTo(myMap);
    }
    else {
        color = "red";
        L.circle(location, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            // Adjust radius
            radius: country.count * 1500
            
           }).bindPopup("<h1>" + country.Name + "</h1> <hr> <br>Total events competed: "+country.count+"<h3>Medals:  <br>Gold: "+country.gold+"<br>Silver: "+country.silver+"<br>Bronze: "+country.bronze+"</h3>").addTo(myMap);
    }

})
