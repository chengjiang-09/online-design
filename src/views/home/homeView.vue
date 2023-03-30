<template>
  <div id="homeView">
    <HomeLayout />
  </div>
</template>

<script>
import HomeLayout from './layout/homeLayout.vue'
import { mapActions } from 'vuex'
export default {
  name: 'HomeView',
  components: {
    HomeLayout,
  },
  beforeDestroy() {
    //清空路由
    this.set_routes([])
  },
  methods: {
    ...mapActions({
      set_routes: 'routerStore/set_routes',
    }),
  },
}
</script>

<style lang="less" scoped>
#homeView {
  width: 100%;
  height: 100%;
}
</style>
