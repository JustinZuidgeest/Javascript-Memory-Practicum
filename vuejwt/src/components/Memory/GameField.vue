<template>
<div class="gameField">
  <table id="speelveld">
    <tr v-for="row in boardCards" :key="row.id">
        <Tile v-on:cardClicked='$emit("cardClicked", $event)' v-for="tile in row.data" :key="tile.id" v-bind:data="tile"/>
    </tr>
  </table>
</div>
</template>

<script>
import Tile from "./Tile";

export default {
  name: 'GameField',
  components: {
    Tile,
  },
  props: ["boardCards"],
  data: function() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style scoped>
table#speelveld {
  table-layout:fixed;
  margin: 0 auto;
}

table#speelveld td {
  text-align: center;
  color: white;
  font-size: large;
  font-weight: bold;
} 

@media only screen and (orientation:landscape) {
  table#speelveld {
    width: 80vh;
    height: 80vh;
    border-spacing: 1vh;
  }
}

@media only screen and (orientation:portrait) {
  table#speelveld {
    width: 70vw;
    height: 70vw;
    border-spacing: 1vw;
  }
}
</style>
