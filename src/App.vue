<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
      <!-- <router-view name="chart" class="chart-component"></router-view> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
  };
</script>

<style>
  .chart-component {
    margin-right: -33rem;
    margin-top: 20rem;
  }
  /*.main {
    display: flex;
    flex-direction: row-reverse;
  }*/
</style>
