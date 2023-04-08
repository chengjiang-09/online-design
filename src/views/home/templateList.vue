<template>
  <div id="templateList">
    <div class="container">
      <ul class="body">
        <li @click="createCanvas">
          <ItemCard :titleDisplayFlag="true" :imgDisplayFlag="true" />
        </li>
        <li v-for="template in templateList" :key="template.id">
          <ItemCard />
        </li>
      </ul>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TemplateList',
  created() {
    this.set_tmplateListALL({
      limit: 9,
      page: 1,
    })
  },
  computed: {
    ...mapState({
      templateList: (state) => state.templateList.templateList,
    }),
  },
  methods: {
    ...mapActions({
      set_canvasData: 'charts/set_canvasData',
      set_editCanvasOpened: 'app/set_editCanvasOpened',
      set_canvasConfigureList: 'charts/set_canvasConfigureList',
      set_tmplateListALL: 'templateList/set_tmplateListALL',
    }),
    //点击创建画布会清空可能存在的原画布
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
