<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                  aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">vueSpotify</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
    html,
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .main {
        border-bottom: #333 1px solid;
        padding: 30px 0;
    }

    h1 {
        color: #369;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 40px;
    }

    .artist-header {
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .artist-thumb {
        width: 80px;
        height: 80px;
        float: left;
        margin-right: 10px;
    }

    .artist-albums .well {
        margin-bottom: 20px;
        overflow: auto;
        min-height: 400px;
    }

    .album {
        text-align: center;
        background: #333;
        padding: 10px 20px;
        border: #666 1px solid;
    }

    .album h4 {
        min-height: 100px;
    }

    .album-thumb {
        width: 100%;
    }
</style>
