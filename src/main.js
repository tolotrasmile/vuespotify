// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = 'https://api.spotify.com/v1'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['./components/SearchComponent.vue'], resolve)
    },
    {
      path: '/artist/:id',
      component: resolve => require(['./components/ArtistComponent.vue'], resolve)
    },
    {
      path: '/album/:id',
      component: resolve => require(['./components/AlbumComponent.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(require('./App.vue'))
})
