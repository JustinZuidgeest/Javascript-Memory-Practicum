<template>
  <td v-on:click='$emit("cardClicked", data)' v-bind:class="data.class">
    {{tileChar}}
  </td>
</template>

<script>
export default {
  name: 'Tile',
  props: ["data"],
  data: function() {
    return {

    }
  },
  computed: {
    tileChar: function(){
      let char = "";
      if(this.data.class === "inactive"){
        char = this.data.backside;
      }else if(this.data.class === "active" || this.data.class === "found"){
        char = this.data.frontside;
      }
      return char;
    },
  },
}
</script>

<style scoped>
td.inactive {
  cursor: pointer;
  background-color: #42b983;
  border-radius: 10px;
}

td.active {
  cursor: pointer;
  background-color: rgb(210, 78, 214);
  border-radius: 10px;
}

td.found {
  background-color: #b95e42;
  cursor: default;
  border-radius: 10px;
}
</style>
