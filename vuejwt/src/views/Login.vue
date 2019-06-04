<template>
  <div class="login">
    <h1>Login</h1>

    <form action="#" @submit.prevent="login">
      <label for="username">Username</label>
      <input type="text" name="username" id="username" v-model="email">

      <label for="username">Password</label>
      <input type="password" name="password" id="password" v-model="password">

      <button type="submit">Login</button>

      <transition name="fade">
        <span v-show="error != ''" class="error">{{error}}</span>
      </transition>
    </form>
  </div>
</template>

<script>

export default {
  name: 'login',
  data: function(){
    return{
      email: "",
      password: "",
      error: "",
    }
  },
  methods: {
    login(){
      this.error="";
      if(this.checkInput()){
        this.requestToken();
      }
    },
    checkInput(){
      if(!this.validateEmail()){
        this.error = "Not a valid email!"
        return false;
      }else if(this.password.length < 5){
        this.error = "Password must be more than 5 characters"
        return false;
      }else{
        return true;
      }
    },
    validateEmail(){
      //Based on RFC 5322. Credit to https://emailregex.com/
      let email = this.email;
      return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email ));
    },
    requestToken(){
      this.$store.dispatch('postLogin', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        this.$router.push({path: '/memory'})
      })
      .catch(error => {
        this.error = error.data.message;
      })
    },
  }
}
</script>

<style scoped>
  .login{
    margin-top: 200px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .error{
    color: rgb(168, 23, 23);
    padding-top: 40px;
    float: left; 
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  h1 {
    text-align: left;
  }

  label {
    font-weight: bold;
    display: block;
    float: left;
    padding-bottom: 15px;
    padding-top: 15px;
  }

  input {
      width: 100%;
      height: 40px;
      font-size: 16px;
      outline: 0;
      border-radius: 3px;
      border: 1px solid lightgrey;
  }

  button {
    width: 100%;
    margin-top: 40px;
    padding: 14px 12px;
    font-size: 18px;
    font-weight: bold;
    background: #42b983;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    transition-duration: .5s;
  }

  button:hover{
    background: #00bd68;
  }
</style>
