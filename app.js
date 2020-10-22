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

      const marker = new mapboxgl.Marker()
      const minPopup = new mapboxgl.Popup()

      minPopup.setHTML("<h2>" + Herbariumname + "</h2>")
      marker.setPopup(minPopup)
      marker.setLngLat([longitude,latitude])
      marker.addTo(map)
      // const popup = new mapboxgl.Popup();
      // popup.setLngLat([longitude, latitude]).setHTML(`<h1>Hello</h1>`).addTo(map);
    });
  });



// fetch("https://herbarium-map-server.herokuapp.com/access")
// .then((response) => response.json())
// .then((data) => {
//   const herbariums = data;
//   console.log(data);
//   herbariums.forEach((access) => {
//     const { HerbariumID, date, latitude, longitude } = access;
//     console.log(latitude);
//     // console.log(herbarium)
//     var marker = new mapboxgl.Marker({ color: "red" })
//       .setLngLat([longitude, latitude])
//       .addTo(map);
//   });
// });


//Click -> herbariumID -> host/access/{herbariumID} -> return list  of access record -> display these record on map.