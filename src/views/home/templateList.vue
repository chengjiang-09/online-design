<template>
  <div id="templateList">
    <div class="container">
      <ul class="body">
        <li @click="createCanvas">
          <ItemCard :titleDisplayFlag="true" :imgDisplayFlag="true" />
        </li>
        <li>
          <ItemCard />
        </li>
      </ul>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TemplateList',
  methods: {
    ...mapActions({
      set_canvasData: 'charts/set_canvasData',
      set_editCanvasOpened: 'app/set_editCanvasOpened',
      set_canvasConfigureList: 'charts/set_canvasConfigureList',
    }),
    createCanvas() {
      this.set_canvasData([])
      this.set_editCanvasOpened(true)
      this.set_canvasConfigureList([])
      this.$router.push('/canvas')
    },
  },
}
</script>
<style lang="less" scoped>
#templateList {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .body {
      width: 100%;
      height: 70%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 30px 20px;
      li {
        margin: 0 20px 0 20px;
        width: 17%;
        height: 38%;
      }
    }
    .footer {
      width: 100%;
      height: 30%;
    }
  }
}
</style>
