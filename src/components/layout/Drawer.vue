<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="260"
    mobile-breakpoint="960"
    class="elevation-2"
  >
    <template v-slot:prepend>
      <v-list-item two-line class="light-blue darken-4">
        <v-list-item-avatar>
          <img src="@/assets/user.png">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">Admin</v-list-item-title>
          <v-list-item-subtitle class="white--text">Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="({ to, icon, name }) in items"
        :key="name"
        :to="to"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <v-btn
        block
        text
        class="text-caption"
      >
        Cerrar sesión
        <v-icon right small>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data () {
    return {
      drawer: null,
      items: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          name: 'Inicio'
        },
        {
          to: '/usuarios',
          icon: 'mdi-account',
          name: 'Usuarios'
        }
      ]
    }
  }
}
</script>

<style>

</style>
