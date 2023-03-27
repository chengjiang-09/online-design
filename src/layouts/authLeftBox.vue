<template>
  <div id="authLeftBox" :class="[{ move: authMove }]">
    <div class="container">
      <div v-if="loaded">
        <WaitingCanvas />
        <img
          src="../assets/online-design-w.png"
          alt="online-design"
          class="title"
        />
      </div>
      <div v-else class="waiting">
        <img
          class="waiting-img"
          src="../assets/online-design.png"
          alt="online-design"
        />
      </div>
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
    }

    .waiting {
      width: 100%;
      height: 100%;
      background-color: #000000;

      &-img {
        position: absolute;
        left: 50%;
        height: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 400px;
      }
    }
  }
}

.move {
  transform: translateX(-30vw) !important;
}
</style>
