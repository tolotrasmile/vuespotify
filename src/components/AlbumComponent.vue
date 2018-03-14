<template>
  <div>
    <div class="page-header" v-if="album">
      <h4>{{album.name}}</h4>
      by <a :href="getArtistUrl(album.artists[0])">{{album.artists[0].name}}</a>
    </div>
    <div class="row" v-if="currentSong">
      <div class="col-md-12">
        <p><strong>Preview : Track {{ currentSong.track_number }}</strong> - {{ currentSong.name }}</p>
        <audio ref="player" controls="controls" @play="togglePlayer(true)" @pause="togglePlayer(false)" style="width: 100%;">
          <source :src="currentSong.preview_url">
        </audio>
      </div>
    </div>
    <div v-if="songs.length > 0" class="song-list">
      <hr>
      <div v-for="song of songs" :key="song.track_number">
        <div class="row">
          <div class="col-md-12">
            <div :class="getStyle(song)" @click.prevent="switchSong(song)">
              <a href="#">{{ song.track_number }} : {{ song.name }}</a>
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
        album: null,
        currentSong: '',
        play: false
      }
    },
    methods: {
      getUrl (song) {
        return '/tracks/' + song.id
      },
      getArtistUrl (artist) {
        return '/artist/' + artist.id
      },
      switchSong (song) {
        this.currentSong = song
      },
      togglePlayer (state) {
        this.play = state
      },
      getStyle (song) {
        return song === this.currentSong ? 'song well selected' : 'song well'
      }
    },
    mounted () {
      this.$songs = this.$resource('albums/{id}', {}, {}, {
        before: () => {
          this.$Progress.start()
        },
        after: () => {
          this.$Progress.finish()
        }
      })
      this.$songs.query({id: this.$route.params.id}).then(
        response => {
          this.album = response.data
          if (response.data.tracks.items && response.data.tracks.items.length > 0) {
            this.songs = response.data.tracks.items
            this.switchSong(this.songs[0])
            document.title = 'VueSpotify | ' + this.album.name
          }
        }
      )
      this.$watch('currentSong', () => {
        this.$refs.player.load()
        if (this.play) {
          this.$refs.player.play()
        }
      })
    }
  }
</script>
