import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = 

//Route guards
router.beforeEach((to, from, next) => {
 if (to.matched.some(record => record.meta.requiresVisitor)){
    if (store.getters.authenticated) {
      next({
        path: '/memory'
      }) // make sure to always call next()!
    } else{
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
