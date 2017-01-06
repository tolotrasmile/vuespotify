<template>
  <div>
    <div class="page-header">
      <h2>Need music?</h2>
      <p class="lead">Use the vueSpotify app to browse new releases and find your favorite songs</p>
      <p>Click <a href="https://developer.spotify.com/web-api/" target="_blank">here</a> to view Spotify Web API.</p>
    </div>
    <p>This project is a VueJS version of <a href="https://github.com/bradtraversy/ngspotify" target="_blank">ngSpotify</a> by <a href="https://github.com/bradtraversy" target="_blank">@bradtraversy</a>. Builded with
      <a href="https://github.com/vuejs/vue-router" target="_blank">vue-router</a>,
      <a href="https://github.com/pagekit/vue-resource" target="_blank">vue-resource</a>.
    </p>
    <br />
    <form>
      <div class="form-group">
        <input type="text" class="form-control" name="strSearch" v-model="searchStr" @keyup="searchMusic()"
               placeholder="Search music" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>
    </form>
    <div v-if="artists">
      <div v-for="artist of artists">
        <div class="row">
          <div class="col-md-12">
            <div class="search-res well">
              <a :href="getUrl(artist)" @click="saveIndex()">{{ artist.name }}</a>
              <div v-if="artist.genres.length">
                <strong>Genres: </strong>
                {{ artist.genres.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchStr: '',
        artists: []
      }
    },
    methods: {
      searchMusic () {
        if (this.searchStr) {
          this.$artists.query({query: this.searchStr, type: 'artist'}).then(
            response => {
              this.artists = response.data.artists.items
            },
            error => {
              console.error(error)
            }
          )
        }
      },
      getUrl (artist) {
        return '/artist/' + artist.id
      },
      saveIndex () {
        window.sessionStorage.setItem('oldSearchKey', this.searchStr)
      }
    },
    mounted () {
      this.$artists = this.$resource('search?{?q*}')
      this.searchStr = window.sessionStorage.getItem('oldSearchKey')
      if (this.searchStr) {
        this.$artists.query({query: this.searchStr, type: 'artist'}).then(
          response => {
            this.artists = response.data.artists.items
          },
          error => {
            console.error(error)
          }
        )
      }
    }
  }
</script>
