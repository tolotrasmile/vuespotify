<template>
  <div>
    <div class="page-header">
      <h1>Need music?</h1>
      <p class="lead">Use the vueSpotify app to browse new releases and find your favorite songs</p>
    </div>
    <p>This project is a VueJS version of <a href="https://github.com/bradtraversy/ngspotify" target="_blank">ngSpotify</a> by <a href="https://github.com/bradtraversy" target="_blank">@bradtraversy</a>. Builded with
      <a href="https://github.com/vuejs/vue-router" target="_blank">vue-router</a>,
      <a href="https://github.com/pagekit/vue-resource" target="_blank">vue-resource</a>.
    </p>
    <p>Click <a href="https://developer.spotify.com/web-api/" target="_blank">here</a> to view Spotify Web API.</p>
    <br />
    <form @submit.prevent>
      <div class="form-group">
        <input type="text" class="form-control" name="searchStr" v-model="searchStr" @keyup.prevent.enter="searchMusic()"
               placeholder="Search artist" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>
    </form>
    <div v-if="artists.length > 0">
      <div v-for="artist of artists" :key="artist.name">
        <div class="row">
          <div class="col-md-12">
            <div class="artist-list well">
              <a :href="getUrl(artist)" @click="saveIndex()">{{ artist.name }}</a>
              <div>
                <strong>Genres: </strong>
                {{ artist.genres.length ? artist.genres.join(', ') : 'none' }}
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
              this.artists = []
              console.log(error)
            }
          )
          document.title = 'VueSpotify | Result for "' + this.searchStr + '"'
        } else {
          this.artists = []
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
      this.$artists = this.$resource('search?{?q*}', {}, {}, {
        before: () => {
          this.$Progress.start()
        },
        after: () => {
          this.$Progress.finish()
        }
      })
      this.searchStr = this.$route.query.searchStr || window.sessionStorage.getItem('oldSearchKey')
      this.searchMusic()
    }
  }
</script>
