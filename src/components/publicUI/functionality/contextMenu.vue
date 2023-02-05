<template>
  <div id="ContextMenu">
    <ul class="container">
      <li
        class="menu"
        v-for="(obj, index) in menuListData"
        :key="index"
        @click="menuClick($event, obj.value)"
      >
        <div
          class="icon-box"
          :class="[obj.icon.key]"
          :style="{ color: obj.icon.color ? obj.icon.color : '#b0b0b0' }"
        ></div>
        <div class="label-box">
          <div class="title">{{ obj.label }}</div>
          <div class="context">{{ obj.role }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
//自定义菜单，主要用于鼠标右击事件
export default {
  name: 'ContextMenu',
  props: {
    menuList: {
      type: Array,
      default: () => [],
      require: false,
    },
  },
  computed: {
    menuListData: {
      get() {
        return this.menuList
      },
    },
  },
  methods: {
    menuClick(e, value) {
      this.$emit('menuClick', {
        event: e,
        key: value,
      })
    },
  },
}
</script>

<style lang="less" scoped>
#ContextMenu {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  width: 200px;
  min-height: 100px;
  border-radius: 5px;
  border: 1px solid #d7d7d7;
  background-color: #ffffff;
  .container {
    height: 100%;
    width: 100%;
    li {
      width: 100%;
      height: 30px;
      display: flex;
      align-content: center;
      padding: 0 10px 0 15px;
      border-bottom: 0.6px solid #d7d7d7;
      transition: background-color 0.5s;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }

      .icon-box {
        width: 40px;
        line-height: 30px;
        color: #b0b0b0;
      }
      .label-box {
        width: 160px;
        display: flex;
        justify-content: space-between;
        line-height: 30px;

        .title {
          font-weight: 700;
        }

        .context {
          font-size: 8px;
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
