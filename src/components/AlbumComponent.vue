<template>
  <div>
    <div class="page-header" v-if="album">
      <h4>{{album.name}}</h4>
      by <a :href="getArtistUrl(album.artists[0])">{{album.artists[0].name}}</a>
    </div>
    <div v-if="songs">
      <div v-for="song of songs">
        <div class="row">
          <div class="col-md-12">
            <div class="search-res well">
              <p><strong>Track {{ song.track_number }}</strong></p>
              <p><a :href="song.preview_url" target="_blank">{{ song.name }}</a></p>
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
        songs: [],
        album: null
      }
    },
    methods: {
      getUrl (song) {
        return '/tracks/' + song.id
      },
      getArtistUrl (artist) {
        return '/artist/' + artist.id
      }
    },
    mounted () {
      this.$songs = this.$resource('albums/{id}')
      this.$songs.query({id: this.$route.params.id}).then(
        response => {
          this.album = response.data
          this.songs = response.data.tracks.items
          console.log('name', response.data)
        },
        error => {
          console.error(error)
        }
      )
    }
  }
</script>
