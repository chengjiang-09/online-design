<template>
  <div id="authView">
    <AuthLeftBoxVue />
    <AuthRightBoxVue />
  </div>
</template>

<script>
import AuthLeftBoxVue from '@/views/auth/layout/authLeftBox.vue'
import AuthRightBoxVue from '@/views/auth/layout/authRightBox.vue'
import { mapActions } from 'vuex'
export default {
  name: 'AuthView',
  components: {
    AuthLeftBoxVue,
    AuthRightBoxVue,
  },
  mounted() {
    this.set_routesGroupAndRoutes([])
  },
  methods: {
    ...mapActions({
      set_routesGroupAndRoutes: 'routerStore/set_routesGroupAndRoutes',
    }),
  },
}
</script>

<style lang="less" scoped>
#authView {
  width: 100%;
  height: 100%;
}
</style>
