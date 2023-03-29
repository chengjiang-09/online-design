<template>
  <div id="authLeftBox" :class="[{ move: authMove }]">
    <div class="container">
      <WaitingCanvas v-cloak />
      <img
        v-cloak
        src="../../../assets/online-design-w.png"
        alt="online-design"
        class="title"
        @click="openSign"
      />
      <div class=""></div>
    </div>
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
    openSign() {
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

  .container {
    width: 100%;
    height: 100%;
    position: relative;

    .title {
      position: absolute;
      left: 0;
      top: 0;
      width: 800px;
      height: 400px;
      cursor: pointer;
    }
  }
}

.move {
  transform: translateX(-26vw) !important;
}
</style>
