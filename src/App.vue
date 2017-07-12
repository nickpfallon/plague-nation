<template>
  <div id="app">
    <button><img src="./assets/logo.png" id="logo"></button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 10rem;
}
#logo {
  height: 50vh;
}
</style>
