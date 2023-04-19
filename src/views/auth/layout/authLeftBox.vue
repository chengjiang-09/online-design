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
      <div class="enter">
        <div>
          <RouterLink to="/home"><span> ENTER </span> </RouterLink>
        </div>
      </div>
      <div class="mini-menu" @click="openSign">
        <i class="el-icon-s-unfold icon"></i>
        <h5>登录</h5>
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
    openSign() {
      this.set_authMove(!this.authMove)
    },
  },
}
</script>

<style lang="less" scoped>
@keyframes miniMenu {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

@keyframes enterBG {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }
}
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

    .enter {
      position: absolute;
      left: 50%;
      bottom: 15%;
      transform: translate(-50%, -50%);
      div {
        span {
          user-select: none;
          color: #fff;
          position: relative;
          font-size: 30px;
          &::before {
            content: '';
            position: absolute;
            z-index: -1;
            top: -150%;
            left: -68%;
            width: 0;
            height: 0;
            animation: enterBG 2s linear 0s infinite;
            border-bottom: 90px solid rgb(182, 180, 180);
            border-left: 90px solid transparent;
            border-right: 90px solid transparent;
          }

          &:hover {
            &::before {
              animation: enterBG 0.6s linear 0s infinite;
            }
          }
        }
      }
    }

    .title {
      position: absolute;
      left: 0;
      top: 0;
      width: 800px;
      height: 400px;
      cursor: pointer;
    }

    .mini-menu {
      position: absolute;
      right: 20px;
      top: 40px;
      width: 120px;
      height: 60px;

      .icon {
        width: 60px;
        height: 60px;
        font-size: 48px;
        color: #ffffff;
        cursor: pointer;
        animation: miniMenu 2s linear 0s infinite;
      }

      h5 {
        margin-left: 6px;
        color: #ffffff;
        font-size: 16px;
        font-weight: 800;
      }
    }
  }
}

.move {
  transform: translateX(-26vw) !important;
}
</style>
