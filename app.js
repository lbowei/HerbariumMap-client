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
    // console.log(data);
    herbariums.forEach((herbarium) => {
      // console.log(herbarium)
      const { _id, Herbariumname, latitude, longitude } = herbarium;
      let herbariumId = _id;
      // console.log(herbariumId);

      const marker = new mapboxgl.Marker();
      const minPopup = new mapboxgl.Popup();

      minPopup.on("open", () => {
        // console.log(herbariumId);
        minPopup.setHTML(
          "<h2>" +
            Herbariumname +
            "</h2>" +
            "<h4>" +
            latitude +
            "</h4>" +
            "<h4>" +
            longitude +
            "</h4>"
        );
        fetch("http://localhost:5000/access/" + herbariumId)
          .then((resp) => resp.json())
          .then((data) => {
            const accessRecord = data;

            for (var i = 0; i < accessRecord.length; i++) {
              const HerbariumID = accessRecord[i].HerbariumID;
              const date = accessRecord[i].date;
              const herbariumLatitude = accessRecord[i].latitude;
              const herbariumLongitude = accessRecord[i].longitude;
              const herbariumMarker = new mapboxgl.Marker({ color: "#b40219" });
              herbariumMarker.setLngLat([
                herbariumLongitude,
                herbariumLatitude,
              ]);
              herbariumMarker.addTo(map);
              minPopup.on("close", () => {
                herbariumMarker.remove();
              });
            }
          });
      });

      marker.setPopup(minPopup);
      marker.setLngLat([longitude, latitude]);
      marker.addTo(map);
    });
  });
