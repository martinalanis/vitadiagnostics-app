<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="title">USUARIOS</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <usuarios-table/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsuariosTable from '@/components/tables/UsuariosTable'

export default {
  name: 'Usuarios',
  components: {
    UsuariosTable
  }
}
</script>

<style>

</style>
