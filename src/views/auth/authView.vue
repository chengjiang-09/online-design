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

    this.$alert(
      '<div>可用默认登录用户名:chengjiang_09@163.com</div><div>可用默认登录验证码:999999</div><h4>（可直接通过点击输入框选择默认提供的邮箱和验证码登录）</h4>',
      '提示',
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
      },
    )
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
