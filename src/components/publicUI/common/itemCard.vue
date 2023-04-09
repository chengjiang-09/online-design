<template>
  <div class="item-card">
    <div class="container" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <el-card class="box-card">
        <img
          class="img"
          :class="[{ 'action-img': action }]"
          :style="{ display: titleDisplay }"
          :src="imgPath"
          :alt="imgTitle"
        />
      </el-card>
      <div
        class="title"
        :class="[{ action: action }]"
        :style="{ display: titleDisplay }"
      >
        <h4>{{ title }}</h4>
        <h5>
          {{ context }}
        </h5>
      </div>
      <div class="switch-component" v-if="titleDisplayFlag">
        <div class="switch-component-body">
          <i class="el-icon-plus icon"></i>
          <h2 class="img-switch-str">{{ imgSwitchStr }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    imgDisplayFlag: {
      type: Boolean,
      default: false,
    },
    imgSwitchStr: {
      type: String,
      default: '创建画布',
    },
    imgPath: {
      type: String,
      default: '',
    },
    imgTitle: {
      type: String,
      default: '',
    },
    titleDisplayFlag: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    context: {
      type: String,
      default: '',
    },
  },
  computed: {
    titleDisplay() {
      return this.titleDisplayFlag ? 'none' : 'block'
    },
    imgDisplay() {
      return this.imgDisplayFlag ? 'none' : 'block'
    },
  },
  data: function () {
    return {
      action: false,
    }
  },
  methods: {
    mouseenter() {
      this.action = true
    },
    mouseleave() {
      this.action = false
    },
  },
}
</script>

<style lang="less">
.item-card {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top left, #000000, #ffffff);
      opacity: 0.4;
      transition: opacity 0.5s;
      z-index: 0;
    }

    &:hover {
      &::before {
        opacity: 0.8;
      }
    }

    .box-card {
      width: 100%;
      height: 100%;
      .el-card__body {
        width: 100%;
        height: 100%;
        padding: 0;
      }
      .img {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.5s;
      }

      .action-img {
        transform: scale(120%, 120%);
      }
    }

    .switch-component {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 99;

      &-body {
        width: 100%;
        height: 100%;
        position: relative;

        .icon {
          font-size: 24px;
          position: absolute;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
        }

        .img-switch-str {
          font-size: 24px;
          position: absolute;
          left: 50%;
          top: 60%;
          transform: translate(-50%, -50%);

          font-size: 16px;
          font-weight: 800;
        }
      }
    }

    .title {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30%;
      transform: translate(0, 101%);
      transition: transform 0.5s;
      background-color: transparent;
      pointer-events: none;
      opacity: 0.7;
      backdrop-filter: blur(6px);
      border-top: 1px solid #b8b8b8;
      border-radius: 5px 5px 0 0;
      padding: 5px 8px 4px 8px;
      display: flex;
      flex-direction: column;

      h4 {
        flex: 1;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      h5 {
        flex: 3;
        margin-top: 8px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .action {
      transform: translate(0, 0);
    }
  }
}
</style>
