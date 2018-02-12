<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand">VueSpotify</router-link>
        </div>
      </div>
    </nav>
    <vue-progress-bar></vue-progress-bar>
    <div class="container" style="margin-top: 5rem">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" src="./assets/app.scss"></style>
