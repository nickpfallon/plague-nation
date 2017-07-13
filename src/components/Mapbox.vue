<template>
  <div>
    <div class="mapbox" id="heatMap"></div>
    <div class="button-row">
      <button id="fever" @click="getFevers">Fever</button>
      <button id="cough" @clik="getCoughs">Cough</button>
      <button id="sore-throat" @click="getSoreThroats">Sore Throat</button>
      <button id="chills" @click="getChills">Chills</button>
      <button id="headache" @click="getHeadaches">Headache</button>
      <button id="runny-nose" @click="getRunnyNoses">Runny Nose</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'heatMap',
  props: ['name'],
  methods: {
    getFevers: function() {
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?s=fever')
      .then(function(response) {
        console.log(response.body)
      })
    },
    getCoughs: function() {
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?s=cough')
      .then(function(response) {
        console.log(response)
      })
    },
    getSoreThroats: function() {
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?s=sore+throat')
      .then(function(response) {
        console.log(response)
      })
    },
    getChills: function() {
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?s=chills')
      .then(function(response) {
        console.log(response)
      })
    },
    getHeadaches: function() {
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?s=headache')
      .then(function(response) {
        console.log(response)
      })
    },
    getRunnyNoses: function() {
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?s=runny+nose')
      .then(function(response) {
        console.log(response)
      })
    }
  },
  mounted() {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken = 'pk.eyJ1IjoibWlsM2hpZ2giLCJhIjoiY2o1MnEzd2R6MGlhbDJxcDEzZ3Q0aHh3YyJ9.nmPpnj0A5-pTse4AIS_izg';
    var map = new mapboxgl.Map({
      container: 'heatMap',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-77.38, 39],
      zoom: 3,
      pitchWithRotate: false
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
  margin: 2em auto;
  background: gray;
  border: solid 3px #666;
}
.button-row {
  display: flex;
  align-items: center;
}
</style>
