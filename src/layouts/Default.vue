<template>
  <v-app>
    <!-- Include Drawer -->
    <navigation-drawer/>
    <v-main class="ma-6">
      <router-view />
    </v-main>

    <!-- <dashboard-core-settings /> -->
    <!-- <snackbar /> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  components: {
    NavigationDrawer: () => import('@/components/layout/Drawer')
    // Snackbar: () => import('./components/widgets/Snackbar')
  }

  // mounted () {
  //   this.$store.dispatch('loadData')
  // }
}
</script>
