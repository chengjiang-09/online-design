<template>
  <div id="homeLayout">
    <div class="container">
      <div class="item-list">
        <HomeLeftSidebar />
      </div>
      <div class="item-body">
        <HomeRightNav />
        <HomeChildren />
      </div>
    </div>
  </div>
</template>

<script>
import HomeChildren from './components/homeChildren.vue'
import HomeRightNav from './components/homeRightNav.vue'
import HomeLeftSidebar from './components/homeLeftSidebar.vue'
export default {
  name: 'HomeLayout',
  components: {
    HomeChildren,
    HomeLeftSidebar,
    HomeRightNav,
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
