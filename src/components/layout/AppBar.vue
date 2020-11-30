<template>
  <v-app-bar
    absolute
    app
    flat
    color="transparent"
  >
    <v-app-bar-nav-icon class="d-block d-md-none" @click="$store.commit('SET_DRAWER', !$store.state.drawer)"/>
    <v-toolbar-title
      class="text-uppercase font-weight-medium"
      v-text="computedTitle"
    ></v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  computed: {
    computedTitle () {
      const title = this.$route.path.split('/')
      return title[title.length - 1].replace(/-/g, ' ')
    }
  }
}
</script>
