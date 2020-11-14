<template>
  <v-snackbar
    v-model="$store.state.notification"
    :color="$store.state.notificationType"
    :timeout="4000"
  >
    {{ $store.state.notificationMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        icon
        v-bind="attrs"
        @click="$store.commit('CLOSE_NOTIFICATION')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Notification'
}
</script>
