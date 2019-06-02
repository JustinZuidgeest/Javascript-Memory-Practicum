import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    JWT_Token: localStorage.getItem("JWT_Token") || null,
  },
  getters: {
    token(state){
      return state.JWT_Token;
    },
    authenticated(state){
      return state.JWT_Token !== null;
    },
  },
  mutations: {
    setToken(state, token){
      state.JWT_Token = token;
    },
    unsetToken(state){
      state.JWT_Token = null;
    }
  },
  actions: {
    getApi(context){
      return new Promise((resolve, reject) => {
        axios.get('')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        })
      })
    },
    getApiSecret(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.JWT_Token;
      return new Promise((resolve, reject) => {
        axios.get('/secret')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        })
      })
    },
    postLogin(context, vars){
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          name: vars.username,
          password: vars.password,
        })
        .then(response => {
          let JWT_Token = response.data.token;
          localStorage.setItem('JWT_Token', JWT_Token);
          context.commit('setToken', JWT_Token);
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        })
      })
    },
    checkAuth(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.JWT_Token;
      return new Promise((resolve, reject) => {
        axios.get('/auth')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          context.dispatch('unsetToken')
          .then(response => {
            console.log("Token removal response: " + response)
          })
          .catch(error => {
            console.log("Token removal error: " + error)
          })
          reject(error.response);
        })
      })
    },
    unsetToken(context){
      return new Promise((resolve, reject) => {
        if(context.getters.authenticated){
          context.commit('unsetToken');
          localStorage.removeItem("JWT_Token");
          resolve("Token destroyed");
        }else{
          localStorage.removeItem("JWT_Token");
          reject("Trying to unset token, but user was not authenticated");
        }
      })
    },
  }
})
