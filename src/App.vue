<template>
  <div id="app">
    <google-map name="heatMap"></google-map>
    <!-- <router-view></router-view> -->
  </div>
</template>

// <script>
import GoogleMap from './components/GoogleMap';

export default {
  name: 'app',
  components: { GoogleMap },
};
</script>

<style>

</style>
