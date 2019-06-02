<template>
  <div class="resources">
    <h1>Resources</h1>
    <div class="wrapper">
      <h3>/api</h3>
      <div class="box">
        <transition name="fade">
          <span v-show="apistring != ''">{{apistring}}</span>
        </transition>
      </div>
      <div class="buttonbox">
        <button @click="apiClicked">GET</button>
        <button @click="clearapi">clear</button>
      </div>
    </div>
    <div class="wrapper">
      <h3>/api/secret</h3>
      <div class="box">
        <transition name="fade">
          <span v-show="secretstring != ''">{{secretstring}}</span>
        </transition>
      </div>
      <div class="buttonbox">
        <button @click="apiSecretClicked">GET</button>
        <button @click="clearsecret">clear</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resources',
  data(){
    return {
      apistring: "",
      secretstring: "",
    }
  },
  methods: {
    apiClicked(){
      this.$store.dispatch('getApi')
      .then( response => {
        this.apistring = response.data.message;
      })
      .catch( error => {
        this.apistring = error.status + " " + error.statusText
      })
    },
    apiSecretClicked(){
      this.$store.dispatch('getApiSecret')
      .then( response => {
        this.secretstring = response.data.message;
      })
      .catch( error => {
        this.secretstring = error.status + " " + error.statusText
      })
    },
    clearapi(){
      this.apistring = '';
    },
    clearsecret(){
      this.secretstring = '';
    },
  },
}
</script>


<style scoped>
  .resources{
    margin-top: 50px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .wrapper{
    height: 25vh;
    display: flex;
    flex-direction: column;
    align-content: space-between;
  }

  .box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #616161;
    height: 7vh;
    margin-bottom: 5px;
    border-radius: 8px;
  }

  .buttonbox{
    display: flex;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  h3 {
    margin: 10px;
  }

  button{
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    padding: 14px 12px;
    font-size: 18px;
    font-weight: bold;
    background: #42b983;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition-duration: .5s;
  }

  button:hover{
    background: #00bd68;
  }
</style>
