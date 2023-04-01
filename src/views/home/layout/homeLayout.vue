<template>
  <div id="homeLayout">
    <div class="container">
      <div class="item-list media">
        <HomeLeftSidebar />
      </div>
      <div class="item-body">
        <HomeRightNav />
        <HomeRightBox />
      </div>
    </div>
  </div>
</template>

<script>
import HomeRightBox from './components/homeRightBox.vue'
import HomeRightNav from './components/homeRightNav.vue'
import HomeLeftSidebar from './components/homeLeftSidebar.vue'
export default {
  name: 'HomeLayout',
  components: {
    HomeRightBox,
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
      width: 300px;
      height: 100%;
      transition: width 0.5s;
    }

    .item-body {
      flex: 1;
      height: 100%;
      padding-left: 20px;
    }
  }
}

@media screen and (max-width: 1360px) {
  .media {
    display: none;
  }
}
</style>
