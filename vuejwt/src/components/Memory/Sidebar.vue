<template>
<div class='sidebar'>
  <table id="meta">
    <tr>
      <td>
        <b>Top vijf:</b>
        <ol id="topscores:">
          <li v-for="score in scores.slice(0,5)" :key="score.id">
            {{ score.name }} : {{ score.time }}
          </li>
        </ol>
        <b>Gemiddelde speeltijd:</b> {{avarageTime}}<br /><br />
        <b>Karakter op kaarten:</b>
        <select name="character" id="character" v-model="cardCharacter">
          <option value="*">*</option>
          <option value="#">#</option>
          <option value="@">@</option>
          <option value="%">%</option>
          <option value="X">X</option>
        </select>
        <br><br>
        <b>Afmeting bord:</b>
        <select name="size" id="size" v-model="boardSize">
          <option value=2>2</option>
          <option value=4>4</option>
          <option value=6 selected>6</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        <button id="opnieuw" @click='$emit("newGame", cardCharacter, boardSize)'>Nieuw Spel</button>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['scores', 'avarageTime'],
  data: function() {
    return {
      darkTheme: false,
      cardCharacter: "*",
      boardSize: 6
    }
  },
  mounted: function() {
    this.$emit("newGame", this.cardCharacter, this.boardSize);
  }
}
</script>

<style scoped>
table#meta {
  position: absolute;
  right:4vw;
  top:10vw;
  width: 25vw;
  height:70vh;
}

table#meta td {
  text-align: left;
  padding: 10px;
  height: 15vw;
}

button {
  width: 40%;
  height: 15%;
  font-size: 18px;
  font-weight: bold;
  background: #444444;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  transition-duration: 0.5s;
}

button:hover{
  background: #666666;
}
</style>
