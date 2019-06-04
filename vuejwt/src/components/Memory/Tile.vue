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
  background-color: var(--inactive-color);
  border-radius: 10px;
}

td.active {
  cursor: pointer;
  background-color: var(--active-color);
  border-radius: 10px;
}

td.found {
  background-color: var(--found-color);
  cursor: default;
  border-radius: 10px;
}
</style>
