import "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";
const mapbox_token =
  "pk.eyJ1IjoiaG9uZ3l1bGkiLCJhIjoiY2tnOGhrdGtkMGhlMTJzcGdmeDR1dHpmeCJ9._qlZmG9Xr-XQo6ztXOfz3Q";
mapboxgl.accessToken = mapbox_token;

var target_date = Date.parse("1900-01-01");
document.getElementById ("time_button").addEventListener ("click", findTime);

function findTime() {
  var target_date = new Date();
  // console.log(target_date)
  target_date.setMonth(target_date.getMonth() - 6);  
  // console.log(target_date) 
  document.getElementById("time_button").innerHTML = "Showing records in the past six month";
}

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 3,
  center: [-79.0558, 35.9132],
});

function calTimes(access, target_date) {
  var date = Date.parse(access.date);
  if (date < target_date){
    return 0
  } else {
    return access.cnt
  }
}

function getColorFromTimesofAccess(times){
  if(times<5){
    return "yellow"
  } else if (times<20) {
    return "orange"
  } else if (times < 30) {
    return "red"
  } else {
    return "blue"
  }
}

fetch("https://herbarium-map-server.herokuapp.com/herbarium")
  .then((response) => response.json())
  .then((data) => {
    console.log(target_date) 
    const plants = data;
    plants.forEach((plant) => {
    var { Access, occid, country, stateProvince, decimalLatitude, decimalLongitude } = plant;
    var sum_count = 0
    const counts = Access.map(calTimes, target_date)
      sum_count = counts.reduce(function(a, b){
        return a + b;
      }, 0);
    
    var marker = new mapboxgl.Marker({
      color:getColorFromTimesofAccess(sum_count)
    })
    
    const minPopup = new mapboxgl.Popup();

    minPopup.on("open", () => {
        // console.log(herbariumId);
      minPopup.setHTML(
        "<h2>" +
          occid +
          "</h2>" +
          "<h4>" +
          stateProvince + ', ' + country +
          "</h4>" +
          "<h4>" +
          'Accessed ' + sum_count + ' times' +
          "</h4>"
      );
    });
    marker.setPopup(minPopup);
    marker.setLngLat([decimalLongitude, decimalLatitude]);
    marker.addTo(map);
    });
  });

  
