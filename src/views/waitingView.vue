<template>
  <div id="waitingView" v-show="waiting">
    <img src="../assets/online-design-w.png" alt="online-design" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WaitingView',
  computed: {
    ...mapState({
      waiting: (state) => state.app.waiting,
    }),
  },
}
</script>

<style lang="less" scoped>
#waitingView {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: 80%;
  }
}
</style>
