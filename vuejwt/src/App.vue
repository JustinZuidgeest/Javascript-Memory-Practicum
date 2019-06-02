<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  },
}
</script>


<style>
/* Reset body spacings */
html, body
{
    padding: 0px;
    margin:0;
    background-color: #333333;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e9e9e9;
}
</style>
