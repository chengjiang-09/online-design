<template>
  <div id="authLeftBox" :class="[{ move: authMove }]">
    <div class="container" @click="test">123</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AuthLeftBox',
  computed: {
    ...mapState({
      authMove: (state) => state.app.authMove,
    }),
  },
  methods: {
    ...mapActions({
      set_authMove: 'app/set_authMove',
    }),
    test() {
      this.set_authMove(!this.authMove)
    },
  },
}
</script>

<style lang="less" scoped>
#authLeftBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  transform: translateX(0vw);
  transition: transform 1s;
}

.move {
  transform: translateX(-30vw) !important;
}
</style>
