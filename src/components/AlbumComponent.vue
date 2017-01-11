<template>
  <div style="overflow: hidden">
    <div class="page-header" v-if="album">
      <h4>{{album.name}}</h4>
      by <a :href="getArtistUrl(album.artists[0])">{{album.artists[0].name}}</a>
    </div>
    <div class="row" v-if="currentSong">
      <div class="col-md-12">
        <p>Track {{ currentSong.track_number }} : {{ currentSong.name }}</p>
        <audio ref="player" controls="controls" @play="togglePlayer(true)" @pause="togglePlayer(false)" style="width: 100%;">
          <source :src="currentSong.preview_url">
        </audio>
      </div>
    </div>
    <div v-if="songs.length > 0" class="song-list">
      <hr>
      <div v-for="song of songs">
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
      getStyle (song) {
        return song === this.currentSong ? 'search-res well selected' : 'search-res well'
      },
      togglePlayer (state) {
        this.play = state
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
          }
        },
        () => {
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
