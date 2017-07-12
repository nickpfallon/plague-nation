<template>
  <div class="google-map" id="heatMap"></div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name'],
  data() {
    return {
      heatMap: this.name,
    };
  },
  mounted() {
    const element = document.getElementById(this.heatMap)
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(39.755557,-105.006207)
    }
    const map = new google.maps.Map(element, options);
  }
};
</script>

<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 20px auto;
  background: gray;
}
</style>
