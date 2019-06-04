<template>
  <div class="if-guard" v-if="allowed">
    <div class="memory">
      <TopPanel
        v-bind:timePassed="timePassed"
        v-bind:cardsFound="cardsFound" />
      <div class="middle">
        <GameField
          v-on:cardClicked="cardClicked"
          v-bind:boardCards="boardCards" />
        <Sidebar 
          v-on:newGame="newGame"
          v-bind:avarageTime="avarageTime"
          v-bind:scores="topScores" />
      </div>
    </div>
  </div>
  <div class="else-guard" v-else>
    <h3>{{errormsg}}</h3>
  </div>
</template>

<script>
import TopPanel from '../components/Memory/TopPanel.vue'
import GameField from '../components/Memory/GameField.vue'
import Sidebar from '../components/Memory/Sidebar.vue'
import { setTimeout } from 'timers';

export default {
  name: 'Memory',
  components: {
    TopPanel,
    GameField,
    Sidebar
  },
  data: function(){
    return{
      allowed: false,
      errormsg: "401: You are not authorized to see this content",
      cardColor: "#42b983",
      openColor: "#d24ed6",
      foundColor: "#b95e42",

      startTime: null,
      totalTime: 0,
      gamesAmount: 0,
      timePassed: 0,
      avarageTime: '0s (0s)',

      firstCard: null,
      secondCard: null,
      flippedCards: 0,
      numberOfCards: 0,
      numberOfCardsLeft: 0,
      cardsFound: 0,

      cardChar: null,
      boardSize: null,
      topScores: [
                 {id: 0, name:"Barack Obama", time:200},
                 {id: 1, name:"Bernie Sanders", time:300},
                 {id: 2, name:"Hillary Clinton", time:400},
                 {id: 3, name:"Jeb Bush", time:500},
                 {id: 4, name:"Donald Trump", time:600}
                 ],
      boardCards: [],
      nextLetter: function(size){
        var letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0,size*size).split('');
        var idx=0;
        letterArray=this.shuffle(letterArray);
        return function() {
          var letter = letterArray[idx++]; 
          return letter;
        }
      },
    }
  },
  created(){
    this.$store.dispatch('checkAuth')
    .then( response => {
      this.allowed = true;
    })
    .catch( error => {
      this.allowed = false;
    })
  },
  methods: {
    newGame(char, size){
      $("#timeLeftDiv").stop();
      $("#timeLeftDiv").css("width", 185);
      this.timePassed = 0;
      this.setAvarageTime();
      this.startTime = null;
      this.firstCard = null;
      this.secondCard = null;
      this.flippedCards = 0;
      this.cardsFound = 0;
      this.cardChar = char;
      this.boardSize = size;
      this.numberOfCards = this.boardSize * this.boardSize;
      this.numberOfCardsLeft = this.boardSize * this.boardSize;
      this.generateBoard();
    },
    generateBoard(){
      this.boardCards = [];
      let id = 0;
      let getLetter = this.nextLetter(this.boardSize);
      for (let i = 0; i < this.boardSize; i++){
        this.boardCards.push({id: i, data: []});
        for (let j = 0; j < this.boardSize; j++) {
          let card = {
            id: id,
            backside: this.cardChar,
            frontside: getLetter(),
            class: "inactive"
          }
          id++;
          this.boardCards[i].data.push(card);
        }
      }
    },
    cardClicked(card){
      if(card.class === "found") return;

      this.checkStartTime();
      this.checkThirdCard();
      this.turnCard(card);
      if (this.flippedCards === 2){
        this.checkCards();
      }
    },
    checkThirdCard(){
      if (this.flippedCards === 2){
        this.deactivateCards();
      }
    },
    checkCards(){
      if(this.firstCard.frontside === this.secondCard.frontside){
        this.firstCard.class = "found";
        this.secondCard.class = "found";
        this.numberOfCardsLeft -= 2;
        this.cardsFound = (this.numberOfCards - this.numberOfCardsLeft)/2;
        this.firstCard, this.secondCard = null;
        this.flippedCards = 0;
      }else{
        $("#timeLeftDiv").animate({width: '0px'}, 2000, this.deactivateCards);
      }
    },
    deactivateCards(){
      // Functie om de twee omgedraaide kaarten weer terug te draaien
      this.toggleCard(this.firstCard);
      this.toggleCard(this.secondCard);
      this.firstCard, this.secondCard = null;
      this.flippedCards = 0;
      $("#timeLeftDiv").stop();
      $("#timeLeftDiv").css("width", 185);
    },
    turnCard(card){
      if(card.class === "active" || card.class === "found") return;

      this.toggleCard(card);

      if(this.flippedCards === 0) this.firstCard = card;
      else if(this.flippedCards === 1) this.secondCard = card;
      this.flippedCards++;
    },
    toggleCard(card){
      // Draai de kaart om, als de letter getoond wordt, toon dan de achterkant en 
      // vice versa. switch dus van active naar inactive of omgekeerd.
      let activeSide = card.class;

      if(activeSide === "active"){
        card.class = "inactive";
      }else if(activeSide === "inactive"){
        card.class = "active";
      }
    },
    checkStartTime(){
      // Controleer of de startijd van het spel gezet is, i.e. het spel al gestart was.
      // Als dat niet zo is doe dat nu, en start de timeOut voor het bijhouden van de tijd.
      if(this.startTime === null){
        this.startTime = this.getSeconds();
        this.setTimes();
        this.keepTime();
      }
    },
    setTimes(){
      this.setTimePassed();
      this.setAvarageTime();
    },
    setTimePassed(){
      this.timePassed = this.getSeconds() - this.startTime;
    },
    setAvarageTime(){
      let tempAvarageTime = 0; 
      if(this.gamesAmount !== 0){
        tempAvarageTime = this.totalTime / this.gamesAmount;
      }
      this.avarageTime = `${tempAvarageTime}s (${this.timePassed - tempAvarageTime}s)`;
    },
    keepTime(){
      if (this.numberOfCardsLeft === 0) {
        this.endGame();
      }
      else{
        if(this.startTime !== null){
          this.setTimes();
          // Roep hier deze functie over 500 miliseconden opnieuw aan		
          setTimeout(this.keepTime, 500);
        }
      }
    },
    getSeconds(){
      // Een functie om de Systeemtijd in seconden in plaats van miliseconden 
      // op te halen. Altijd handig.
      return Math.round(new Date().getTime()/1000);
    },
    addScore(score){
      this.topScores.push(score);
      this.topScores.sort(function(a, b){
        let timeA = a.time;
        let timeB = b.time;

        if(timeA > timeB) return 1;
        else if(timeA < timeB) return -1;
        else return 0;
      });
    },
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    endGame(){
      // Bepaal de speeltijd, check topscores en doe de overige
      // administratie.
      this.gamesAmount++;
      let timePlayed = this.getSeconds() - this.startTime;
      this.totalTime += timePlayed;
      let userInput = prompt("U heeft gewonnen!", "Typ hier uw naam");
      if(userInput === "Typ hier uw naam" || userInput === null){
        userInput = "Anoniem";
      }
      let tempId = this.topScores.size;
      let score = {id: tempId, name:userInput, time:timePlayed};
      this.addScore(score);
    },
    setColor(stylesheetId) {
      var valueLocation = '#value'+stylesheetId.substring(3);
      var color = $(valueLocation).val();
      $(stylesheetId).css('background-color', '#'+color );
    },
  },
}
</script>

<style scoped>
  .memory-dark{
    background-color: #222222;
    color: #ddd;
  }

  .else-guard{
    color: rgb(255, 0, 0);
    padding-top: 40px;
  }
</style>
