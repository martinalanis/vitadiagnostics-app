<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="260"
    mobile-breakpoint="960"
    class="elevation-2"
  >
    Drawer
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data () {
    return {
      drawer: null
    }
  }
}
</script>

<style>

</style>
