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
          <v-list-item-title class="white--text subtitle-2">{{ user.nombre }}</v-list-item-title>
          <v-list-item-subtitle class="white-text--opacity caption">
            <!-- <v-chip small outlined dark label color="blue">
              {{ rol }}
            </v-chip> -->
            {{ rol }}
          </v-list-item-subtitle>
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
      <!-- <v-divider></v-divider> -->
      <v-btn
        block
        class="text-caption"
        color="grey lighten-3"
        @click="$store.dispatch('auth/logout')"
      >
        Cerrar sesión
        <v-icon right small>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import api from '@/api'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'NavigationDrawer',
  data () {
    return {
      items: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          name: 'Inicio'
        },
        {
          to: '/clientes',
          icon: 'mdi-doctor',
          name: 'Clientes'
        },
        {
          to: '/refacciones',
          icon: 'mdi-tag-outline',
          name: 'Refacciones'
        },
        {
          to: '/equipos-medicos',
          icon: 'mdi-prescription',
          name: 'Equipos Médicos'
        },
        {
          to: '/usuarios',
          icon: 'mdi-account',
          name: 'Usuarios'
        }
      ]
    }
  },
  created () {
    this.fetchUserData()
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    ...mapGetters({
      rol: 'auth/userRol'
    }),
    drawer: {
      set (val) {
        this.$store.commit('SET_DRAWER', val)
      },
      get () {
        return this.$store.state.drawer
      }
    }
  },
  methods: {
    async fetchUserData () {
      try {
        const res = await api.get('/auth/me')
        console.log(res.data)
        this.$store.commit('auth/SET_USER', res.data)
      } catch (error) {
        this.$store.dispatch('notify', { success: false, message: error.response.data })
      }
    }
  }
}
</script>
