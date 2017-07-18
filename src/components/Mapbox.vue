<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Plague Nation
          </h1>
          <p>Tracking flu symptoms on Twitter</p>
        </div>
      </div>
    </section>
    <div class="mapbox">
      <div id="heatMap"></div>
    </div>
    <div class="button-row">
      <div class="buttons">
        <div class="instruction-div">
          <p class="instruction">Click a symptom to see a map of the occurrences of the word on Twitter.</p>
        </div>
        <a id="fever" class="button" @click="getSymptom('fever')">Fever</a>
        <a id="cough" class="button" @click="getSymptom('cough')">Cough</a>
        <a id="sore-throat" class="button" @click="getSymptom('sore+throat')">Sore Throat</a>
        <a id="chills" class="button" @click="getSymptom('chills')">Chills</a>
        <a id="headache" class="button" @click="getSymptom('headache')">Headache</a>
        <a id="runny-nose" class="button" @click="getSymptom('runny+nose')">Runny Nose</a>
        <a id="get-all" class="button" @click="getAll">See All</a>
      </div>
    </div>
  </div>
</template>

<script>
var GeoJSON = require('geojson');

export default {
  name: 'heatMap',
  // props: ['name'],
  methods: {
    load: function(geojson) {
      var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

      mapboxgl.accessToken = 'pk.eyJ1IjoibWlsM2hpZ2giLCJhIjoiY2o1MnEzd2R6MGlhbDJxcDEzZ3Q0aHh3YyJ9.nmPpnj0A5-pTse4AIS_izg';
      var map = new mapboxgl.Map({
        container: 'heatMap',
        style: 'mapbox://styles/mapbox/dark-v9',
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
          data: geojson,
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
                      [0, "#ffa7a0"],
                      [5, "#e06757"],
                      [10, "#d11a02"],
                  ]
              },
              "circle-radius": {
                  property: "point_count",
                  type: "interval",
                  stops: [
                      [0, 20],
                      [5, 30],
                      [10, 40]
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
              "circle-color": "#ffd6d3",
              "circle-radius": 4,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff"
              }
          });
      });
    },
    getSymptom: function(symptom) {
      var coords = [];
      var geoSymptom;
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?s=' + symptom)
      .then(function(response) {
        for (var i = 0; i < response.body.length; i++) {
          coords.push({lat: Number(response.body[i].latitude), lng: Number(response.body[i].longitude)})
        }
        geoSymptom = GeoJSON.parse(coords, {Point: ['lat', 'lng']});
        console.log(geoSymptom)
        this.load(geoSymptom);
      })
    },
    getAll: function() {
      var coords = [];
      var geoSymptom;
      this.$http.get('https://galvanize-cors-proxy.herokuapp.com/http://api.flutrack.org/?limit=100')
      .then(function(response) {
        for (var i = 0; i < response.body.length; i++) {
          coords.push({lat: Number(response.body[i].latitude), lng: Number(response.body[i].longitude)})
        }
        geoSymptom = GeoJSON.parse(coords, {Point: ['lat', 'lng']});
        this.load(geoSymptom);
      })
    },
  },
  mounted() {
    this.load({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [0, 0]
      },
      "properties": {
        "name": "null island"
      }
    })
  }
};
</script>

<style scoped>
#heatMap {
  width: 750px;
  height: 450px;
  margin: 3em 0;
  background: gray;
  border: solid 3px #666;
  border-radius: 2%;
  box-shadow: 0px 0px 5em #343434;
}
.mapbox {
  display: flex;
  justify-content: center;
}
.button-row {
  display: flex;
  justify-content: center;
  padding-bottom: 2em;
}
.buttons {
  padding: 1.25em;
  border-radius: 10px;
  background-color: #191A1A;
}
.button {
  margin: 0 .5em;
  font-family: "Special Elite", Helvetica, sans-serif;
  box-shadow: 0px 0px 1em #FFF;
}
.button:hover {
  background-color: #191A1A;
  color: #D11A02;
  box-shadow: 0px 0px 3em #D11A02;
}
h1 {
  font-family: "Special Elite", Helvetica, sans-serif;
}
.title {
  font-size: 2.5rem;
}
p {
  font-family: "Special Elite", Helvetica, sans-serif;
  font-size: 1.5rem;
}
.hero-body {
  width: 100vw;
}
.instruction {
  font-size: 1rem;
  color: white;
}
.instruction-div {
  margin-left: .75rem;
  padding: 1rem 0;
}
</style>
