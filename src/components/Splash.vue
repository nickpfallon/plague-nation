<template>
  <div class="splash-main" id="splashPage">
    <div class="main-title">
      <router-link to="/map"><button class="title-button">Plague Nation</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'splashPage'
}
</script>

<style scoped>
  .title-button {
    width: 50vw;
    height: 10vw;
    font-size: 1em;
    /*border-radius: 10px;*/
    box-shadow: 0px 0px 2em #FFF;
    font-family: "Special Elite", Helvetica, sans-serif;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
  }
  .title-button:hover {
    cursor: pointer;
    background-color: #191A1A;
    color: #D11A02;
    box-shadow: 0px 0px 3em #D11A02;
  }
  .title-button:focus {
    outline: 0;
  }
  .main-title {
    text-align: center;
    font-size: 5rem;
    font-family: "Special Elite", Helvetica, sans-serif;
    padding-top: 40vh;
    padding-bottom: 60vh;
    background-color: #191A1A;
    color: white;
  }
  body {
    width: 100vw;
  }
</style>
