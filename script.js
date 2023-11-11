'use strict';

// prettier-ignore

// console.log(coordinates.latitude, coordinates.longitude);

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 8);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ed9d20",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      };
      const markers = L.markerClusterGroup();


      //Loading geoJson
      L.geoJson(data,{onEachFeature: function (feature, layer) {

        const popupContent =
        `<img class="icon" src="Master-file-White.ico"/>`+
       '<h4 class = "text-primary">Shop Name</h4>' +
       feature.properties.Name;
       
       layer.bindPopup(popupContent,{maxWidth:250,
      minWidth:100,
    className:'running-popup'});

 },
        pointToLayer: function (feature,latlng){
          return markers.addLayer(L.circleMarker(latlng,geojsonMarkerOptions)) 
        }
      }).addTo(map);
      map.addLayer(markers);
      L.circleMarker(coords)
        .addTo(map)
        // .bindPopup('ME')
        .openPopup();
    },
    function () {
      alert('Could not get current position');
    }
  );
