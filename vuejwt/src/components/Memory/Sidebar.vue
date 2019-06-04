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
        <br><br><br><br><br><br>
        Kaartkleuren:<br><br>
        <div class="color-bar">
            <span class="color-label">Achterkant:</span>
            <input class="color-input" type="color" name="cardcolor" id="cardcolor" v-model="cardColor">
            <span class="color-label">Open:</span>
            <input class="color-input" type="color" name="opencolor" id="opencolor" v-model="openColor">
            <span class="color-label">Gevonden:</span>
            <input class="color-input" type="color" name="foundcolor" id="foundcolor" v-model="foundColor">
        </div>
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
      boardSize: 6,
      cardColor: "#42b983",
      openColor: "#d24ed6",
      foundColor: "#b95e42"
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

.color-bar{
    display: grid;
    grid-template-columns: 150px auto;
    grid-row-gap: 15px;
}

.color-input{
    width: 50%;
    cursor: pointer;
    border: none;
    -webkit-appearance: none;
    padding: 0;
    margin: 0;
    border-radius: 5px;
}
</style>
