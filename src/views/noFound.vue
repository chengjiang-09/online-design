<template>
  <div id="noFound">
    <el-empty
      :image-size="400"
      description="页面似乎消失在了虚空中！！"
    ></el-empty>
  </div>
</template>

<script>
export default {
  name: 'NoFound',
}
</script>

<style lang="less" scoped>
#noFound {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
