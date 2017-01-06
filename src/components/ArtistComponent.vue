<template>
  <div>
    <header class="artist-header" v-if="artist">
      <div v-if="artist.images.length > 0">
        <img class="artist-thumb" :src="getImage(artist)">
        <h3>{{artist.name}}</h3>
        <div v-if="artist.genres">
          <strong>Genres: </strong>
          {{ artist.genres.join(', ') }}
        </div>
      </div>
    </header>
    <div class="artist-albums">
      <div class="row">
        <div v-for="album of albums">
          <div class="col-xs-12 col-md-4 col-lg-3">
            <div class="well album">
              <div v-if="album.images.length > 0">
                <img class="album-thumb img-thumbnail" :src="getAlbumImage(album)">
              </div>
              <h4>{{album.name}}</h4>
              <a :href="getAlbumUrl(album)" class="btn btn-default btn-block">Album details</a>
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
        artist: null,
        albums: []
      }
    },
    methods: {
      getAlbumUrl (album) {
        return '/album/' + album.id
      },
      getAlbumImage (album) {
        return album.images[0].url
      },
      getImage (artist) {
        return artist.images[1].url
      }
    },
    mounted () {
      this.$artist = this.$resource('artists/{id}')
      this.$artist.query({id: this.$route.params.id}).then(
        response => {
          this.artist = response.data
        },
        error => {
          console.error(error)
        }
      )
      this.$albums = this.$resource('artists/{id}/albums')
      this.$albums.query({id: this.$route.params.id}).then(
        response => {
          this.albums = response.data.items
        },
        error => {
          console.error(error)
        }
      )
    }
  }
</script>
