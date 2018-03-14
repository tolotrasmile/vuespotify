<template>
  <div>
    <transition name="fade">
      <div v-if="errors.length > 0" class="alert alert-danger" style="margin-top: 20px">
        <div v-for="error in errors" :key="error.message">
          {{error.message}}
        </div>
      </div>
    </transition>
    <header class="artist-header" v-if="artist !== null">
      <div>
        <img v-if="artist.images.length > 0" class="artist-thumb" :src="getImage(artist)">
        <h2>{{artist.name}}</h2>
      </div>
      <div>
        <strong>Genres: </strong>
        {{ artist.genres.length ? artist.genres.join(', ') : 'none' }}
      </div>
    </header>
    <div class="artist-albums">
      <transition-group name="list" tag="div" class="row">
        <div v-for="album of albums" :key="album">
          <div class="col-xs-12 col-md-4 col-lg-3">
            <div class="well album">
              <img v-if="album.images.length > 0" class="album-thumb img-thumbnail" :src="getAlbumImage(album)">
              <h4>{{album.name}}</h4>
              <a :href="getAlbumUrl(album)" class="btn btn-default btn-block">Album details</a>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        artist: null,
        albums: [],
        errors: []
      }
    },
    methods: {
      getAlbumUrl (album) {
        return '/album/' + album.id
      },
      getAlbumImage (album) {
        return album.images[0].url || ''
      },
      getImage (artist) {
        return artist.images[1].url || ''
      }
    },
    mounted () {
      this.$artist = this.$resource('artists/{id}')
      this.$artist.query({id: this.$route.params.id}).then(
        response => {
          this.artist = response.data
          document.title = 'VueSpotify | ' + this.artist.name
        },
        error => {
          console.error(error)
        }
      )
      this.$albums = this.$resource('artists/{id}/albums', {}, {}, {
        before: () => {
          this.$Progress.start()
        },
        after: () => {
          this.$Progress.finish()
        }
      })
      this.$albums.query({id: this.$route.params.id}).then(
        response => {
          this.albums = response.data.items
        },
        error => {
          this.errors.push({code: error.status, message: 'Unable to find the artist'})
          console.error(error)
        }
      )
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for <2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }
</style>
