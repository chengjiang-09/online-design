<template>
  <div id="homeView">
    <HomeLayout />
  </div>
</template>

<script>
import HomeLayout from './layout/homeLayout.vue'
export default {
  name: 'HomeView',
  components: {
    HomeLayout,
  },
}
</script>

<style lang="less" scoped>
#homeView {
  width: 100%;
  height: 100%;
}
</style>
