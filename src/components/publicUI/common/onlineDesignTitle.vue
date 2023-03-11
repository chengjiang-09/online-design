<template>
  <h2 class="online-design-title" :class="[{ action: action }]">
    <i class="bg"></i>
    <span class="title" v-for="(value, index) in title" :key="index">
      {{ value }}
    </span>
  </h2>
</template>

<script>
export default {
  name: 'OnlineDesignTitle',
  props: {
    propsTitle: {
      type: String,
      required: false,
      default: '标题',
    },
    propsAction: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    action: {
      get() {
        return this.propsAction
      },
    },
    title: {
      get() {
        return this.propsTitle.split('')
      },
    },
  },
}
</script>

<style lang="less" scoped>
@width: 12vw;
.online-design-title {
  transform: translateZ(0);
  user-select: none;
  cursor: pointer;
  position: relative;
  transition: color 0.6s;
  width: 12vw;
  height: 8vh;
  color: rgb(100, 100, 100);
  border-bottom: 1px solid #000;
  text-align: center;
  padding-top: 4vh;
  // line-height: 4vw;
  .bg {
    z-index: -1;
    transition: opacity 1.2s;
    position: absolute;
    left: 16%;
    top: -15%;
    width: 0;
    height: 0;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    &::before {
      content: '';
      box-sizing: border-box;
      width: 8vw;
      height: 8vw;
      position: absolute;
      left: 25%;
      top: 34%;
      border: 1.3vw solid #000;
      animation: bgRotate1 4s linear 0s infinite;
    }

    &::after {
      content: '';
      box-sizing: border-box;
      width: 8vw;
      height: 8vw;
      position: absolute;
      left: 25%;
      top: 34%;
      border: 1.3vw solid #000;
      animation: bgRotate1 4s linear 0.5s infinite;
    }

    @keyframes bgRotate1 {
      0% {
        transform: rotateZ(0deg);
      }

      25% {
        transform: rotateZ(90deg);
      }

      50% {
        transform: rotateZ(180deg);
      }

      75% {
        transform: rotateZ(270deg);
      }

      100% {
        transform: rotateZ(360deg);
      }
    }

    @keyframes bgRotate2 {
      0% {
        transform: rotateZ(0deg);
      }

      25% {
        transform: rotateZ(-90deg);
      }

      50% {
        transform: rotateZ(-180deg);
      }

      75% {
        transform: rotateZ(-270deg);
      }

      100% {
        transform: rotateZ(-360deg);
      }
    }
  }
  span {
    transition: margin 0.8s, font-size 0.8s;
    margin: 0;
    color: #444444;
  }
  &::before {
    content: '';
    transition: all 0.6s;
    position: absolute;
    width: 90%;
    height: 1vh;
    left: 5%;
    bottom: -20%;
    transform: scale(0, 0);

    border-bottom: 1px dashed #000;
  }

  &:hover {
    color: #000;

    .bg {
      opacity: 0.2;
    }
    span {
      font-size: 22px;
      margin: 0 4px;
    }
    &::before {
      transform: scale(1, 1);
    }
  }
}
.action {
  color: #000;

  .bg {
    opacity: 0.2;
  }
  span {
    font-size: 22px;
    margin: 0 4px;
  }
  &::before {
    transform: scale(1, 1);
  }
}

@media (max-width: 1300px) {
  .bg {
    top: 0% !important;
  }
}
</style>
