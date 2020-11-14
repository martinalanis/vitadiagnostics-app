<template>
  <div>
    <router-view/>
    <Notification/>
  </div>
</template>

<script>
import Notification from '@/components/ui/Notification'
export default {
  name: 'App',
  components: {
    Notification
  }
}
</script>
