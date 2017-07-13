<template>
  <div class="mapbox" id="heatMap"></div>
</template>

<script>
export default {
  name: 'heatMap',
  props: ['name'],
  data() {
    return {
      heatMap: this.name,
      markerCoordinates: [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]
    };
  },
  mounted() {
    // const bounds = new google.maps.LatLngBounds();
    // const element = document.getElementById('heatMap')
    // const options = {
    //   zoom: 14,
    //   center: new google.maps.LatLng(39.755557,-105.006207)
    // }
    // const map = new google.maps.Map(element, options);
    // this.markerCoordinates.forEach((coord) => {
    //   const position = new google.maps.LatLng(coord.lat, coord.lng);
    //   const marker = new google.maps.Marker({
    //     position,
    //     map
    //   });
    //   var markerCluster = new MarkerClusterer(map, marker, {imagePath: '../assets'});
    //   map.fitBounds(bounds.extend(position))
    // });
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken = 'pk.eyJ1IjoibWlsM2hpZ2giLCJhIjoiY2o1MnEzd2R6MGlhbDJxcDEzZ3Q0aHh3YyJ9.nmPpnj0A5-pTse4AIS_izg';
    var map = new mapboxgl.Map({
      container: 'heatMap',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-77.38, 39],
      zoom: 3
    });

    map.on('load', function() {
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource("earthquakes", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "https://galvanize-cors-proxy.herokuapp.com/https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, "#51bbd6"],
                    [100, "#f1f075"],
                    [750, "#f28cb1"],
                ]
            },
            "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, 20],
                    [100, 30],
                    [750, 40]
                ]
            }
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes",
        filter: ["!has", "point_count"],
        paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
            }
        });
    });
  }
};
</script>

<style scoped>
#heatMap {
  width: 800px;
  height: 600px;
  margin: 20px auto;
  background: gray;
  border: solid 3px #666;
}
</style>
