<template>
  <div class="px-4">
    <v-row>
      <v-col>
        <usuarios-table/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UsuariosTable from '@/modules/usuarios/UsuariosTable'

export default {
  name: 'Usuarios',
  components: {
    UsuariosTable
  }
}
</script>
