<template>
  <div id="authView">
    <AuthLeftBoxVue />
    <AuthRightBoxVue />
  </div>
</template>

<script>
import AuthLeftBoxVue from '@/layouts/authLeftBox.vue'
import AuthRightBoxVue from '@/layouts/authRightBox.vue'
export default {
  name: 'AuthView',
  components: {
    AuthLeftBoxVue,
    AuthRightBoxVue,
  },
}
</script>

<style lang="less" scoped>
#authView {
  width: 100%;
  height: 100%;
}
</style>
