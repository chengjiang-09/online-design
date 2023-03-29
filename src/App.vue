<template>
  <div id="app">
    <router-view />
    <WaitingView />
  </div>
</template>

<script>
import WaitingView from '@/views/waitingView.vue'
export default {
  name: 'App',
  components: {
    WaitingView,
  },
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
