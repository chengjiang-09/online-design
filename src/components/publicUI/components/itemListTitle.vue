<template>
  <div id="ItemListTitle">
    <div class="container">
      <div class="icon" v-if="icon" :class="[icon]"></div>
      <div class="label" v-if="label">{{ label }}</div>
    </div>
  </div>
</template>

<script>
//动态渲染itemList组件以及自定义配置组件的选项菜单
export default {
  name: 'ItemListTitle',
  props: {
    label: {
      type: String,
      default: '',
      require: false,
    },
    icon: {
      type: String,
      default: '',
      require: false,
    },
  },
}
</script>

<style lang="less" scoped>
#ItemListTitle {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 5px;

    .icon {
      margin-right: 5px;
    }
  }
}
</style>
