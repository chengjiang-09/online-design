<template>
  <div class="small-menu">
    <div class="container">
      <ul class="menu">
        <li
          class="item"
          v-for="item in items"
          :key="item.type"
          @click="click($event, item.type)"
          :style="{
            borderColor: item.borderColor ? item.borderColor : '#000000',
            backgroundColor: item.backgroundColor
              ? item.backgroundColor
              : 'transparent',
          }"
        >
          <i
            class="icon"
            :class="[item.icon.key]"
            :style="{
              color: item.icon.color ? item.icon.color : '#000000',
            }"
          ></i>
          <h6
            class="title"
            :style="{
              color: item.titleColor ? item.titleColor : '#000000',
            }"
          >
            {{ item.label }}
          </h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallMenu',
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    items: {
      get() {
        return this.menuItems
      },
    },
  },
  methods: {
    click(e, type) {
      this.$emit('clickMenuItem', {
        e,
        type,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.small-menu {
  cursor: default;
  .container {
    .menu {
      .item {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 50px;
        border: 1px solid #000000;
        margin: 20px 0;
        transition: all 0.5s;

        &:hover {
          width: 180px;
          .title {
            transform: translate(50px, -50%);
            opacity: 1;
          }
        }

        .icon {
          position: absolute;
          left: 0;
          top: 50%;
          width: 59px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translate(0, -50%);
          font-size: 36px;
        }

        .title {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 110px;
          height: 60px;
          font-size: 28px;
          opacity: 0;
          transition: all 0.5s;
        }
      }
    }
  }
}
</style>
