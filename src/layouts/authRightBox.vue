<template>
  <div id="authRightBox" :class="[{ move: authMove }]">
    <div class="container">
      <i class="el-icon-close close" @click="closeAuth"></i>
      <div class="title">
        <img src="../assets/online-design.png" alt="online-design" />
      </div>
      <div class="box">
        <div class="box-title"></div>
        <div class="box-email"></div>
        <div class="box-verify-code">
          <RandomVerifyCode />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AuthRightBox',
  computed: {
    ...mapState({
      authMove: (state) => state.app.authMove,
    }),
  },
  methods: {
    ...mapActions({
      set_authMove: 'app/set_authMove',
    }),
    closeAuth() {
      this.set_authMove(!this.authMove)
    },
  },
}
</script>

<style lang="less" scoped>
#authRightBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 30vw;
  height: 100vw;
  transform: translateX(100vw);
  transition: transform 1s;
  box-shadow: 0px 0px 20px 10px rgba(88, 88, 88, 0.5);

  .container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: relative;

    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 30px;
      cursor: pointer;
    }

    .title {
      position: absolute;
      left: 50%;
      top: 50px;
      transform: translateX(-50%);
      width: 250px;
      height: 250px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .box {
      position: absolute;
      left: 50%;
      top: 15%;
      transform: translate(-50%, 0);
      width: 400px;
      height: 400px;
      display: flex;
      flex-direction: column;
    }
  }
}

.move {
  transform: translateX(70vw) !important;
}
</style>
