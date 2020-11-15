<template>
  <v-dialog v-model="dialog" max-width="420">
    <v-card>
      <v-card-title class="mb-3">
        <h5><v-icon color="error" left>mdi-exclamation</v-icon>¿Eliminar {{ title }}?</h5>
      </v-card-title>
      <v-card-text class="text-right">
        <v-btn
          text
          small
          @click="dialog = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="error"
          depressed
          @click="confirm"
        >
          Eliminar
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ConfirmSingleModal',
  data () {
    return {
      dialog: false,
      title: '',
      id: ''
    }
  },
  methods: {
    open (title, id) {
      this.dialog = true
      this.title = title
      this.id = id
    },
    confirm () {
      this.$emit('confirm', this.id)
      this.title = ''
      this.id = ''
      this.dialog = false
    }
  }
}
</script>
