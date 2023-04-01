<template>
  <div id="homeRightBox">
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRightBox',
}
</script>

<style lang="less" scoped>
#homeRightBox {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  .container {
    width: 100%;
    height: 100%;
    box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }
}
</style>
