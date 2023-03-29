<template>
  <div id="homeLayout">
    <div class="container">
      <div class="item-list">
        <HomeLeftBox />
      </div>
      <div class="item-body">
        <HomeChildren />
      </div>
    </div>
  </div>
</template>

<script>
import HomeChildren from './components/homeChildren.vue'
import HomeLeftBox from './components/homeLeftBox.vue'
export default {
  name: 'HomeLayout',
  components: {
    HomeChildren,
    HomeLeftBox,
  },
}
</script>

<style lang="less" scoped>
#homeLayout {
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
    display: flex;

    .item-list {
      flex: 1;
      height: 100%;
    }

    .item-body {
      flex: 5;
      height: 100%;
    }
  }
}
</style>
