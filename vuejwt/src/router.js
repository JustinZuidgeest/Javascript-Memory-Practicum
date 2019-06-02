import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: "Login Page",
        requiresVisitor: true,
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ "./views/Logout.vue"),
    },
    {
      path: '/memory',
      name: 'memory',
      component: () => import(/* webpackChunkName: "memory" */ "./views/Memory.vue"),
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import(/* webpackChunkName: "resources" */ './views/Resources.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    }
  ],
})