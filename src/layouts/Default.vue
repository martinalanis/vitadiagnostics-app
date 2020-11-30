<template>
  <v-app>
    <!-- Include Appbar -->
    <app-bar/>
    <!-- Include Drawer -->
    <navigation-drawer/>
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>

    <!-- <dashboard-core-settings /> -->
    <!-- <snackbar /> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  components: {
    NavigationDrawer: () => import('@/components/layout/Drawer'),
    AppBar: () => import('@/components/layout/AppBar')
    // Snackbar: () => import('./components/widgets/Snackbar')
  }

  // mounted () {
  //   this.$store.dispatch('loadData')
  // }
}
</script>
