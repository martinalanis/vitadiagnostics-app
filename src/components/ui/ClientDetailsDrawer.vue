<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    right
    temporary
    width="90%"
  >
    <div class="pa-5">
      <h3 class="text-navy quote mb-5">DETALLES DEL CLIENTE</h3>
      <client-details :item="item"/>
    </div>
  </v-navigation-drawer>
</template>

<script>
import ClientDetails from '@/components/ui/ClientDetails'

export default {
  name: 'ClientDetailsDrawer',
  components: {
    ClientDetails
  },
  data () {
    return {
      drawer: null,
      item: {}
    }
  },
  created () {
    // this.fetchUserData()
  },
  computed: {
  },
  methods: {
    // async fetchUserData () {
    //   try {
    //     const res = await api.get('/auth/me')
    //     console.log(res.data)
    //     this.$store.commit('auth/SET_USER', res.data)
    //   } catch (error) {
    //     this.$store.dispatch('notify', { success: false, message: error.response.data })
    //   }
    // }
    show (item) {
      console.log(item)
      this.drawer = true
      this.item = item
    }
  }
}
</script>
