// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueProgressBar from 'vue-progressbar'
import progress from './config/progress.js'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueProgressBar, progress)

Vue.http.options.root = 'https://api.spotify.com/v1'
Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (request.after) {
      request.after.call(this, response)
    }
  })
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['./components/SearchComponent.vue'], resolve),
      name: 'root'
    },
    {
      path: '/artist/:id',
      component: resolve => require(['./components/ArtistComponent.vue'], resolve),
      name: 'article'
    },
    {
      path: '/album/:id',
      component: resolve => require(['./components/AlbumComponent.vue'], resolve),
      name: 'album'
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
