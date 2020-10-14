import "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js";
const mapbox_token =
  "pk.eyJ1IjoiaG9uZ3l1bGkiLCJhIjoiY2tnOGhrdGtkMGhlMTJzcGdmeDR1dHpmeCJ9._qlZmG9Xr-XQo6ztXOfz3Q";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 1.5,
  center: [16, 33],
});


fetch("https://herbarium-map-server.herokuapp.com/herbarium")
  .then((response) => response.json())
  .then((data) => {
    const herbariums = data;
    console.log(data);
    herbariums.forEach((herbarium) => {
      const { Herbariumname, latitude, longitude } = herbarium;
      console.log(latitude);
      // console.log(herbarium)
      var marker = new mapboxgl.Marker({ color: "#7BAFD4" })
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
  });
