<template>
<div class="topPanel">
  <h2>Javascript memory</h2>
  <div class="topbar">
    Verlopen tijd: {{timePassed}} seconden.<br/>
    Gevonden kaart-paren: {{cardsFound}}<br>
    Resterende toontijd: <br>
    <button style="margin-top: 5px;" id="myTime"><div id="timeLeftDiv"></div></button><br/>
  </div>
</div>
</template>

<script>
export default {
  name: 'TopPanel',
  props: ["timePassed", "cardsFound"],
  data: function() {
    return {

    }
  },
}
</script>

<style scoped>
h2 {
  margin: 0;
  margin-bottom: 5px;
} 

.topbar{
  margin-bottom: 2px;
}

#myTime {
  position: relative;
  width: 200px;
  height: 30px;
  background-color: #ddd;
}

#timeLeftDiv {
	width: 185px;
	height: 20px;
	background-color: #42b983;
}
</style>
