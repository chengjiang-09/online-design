<template>
  <div id="canvasView">
    <LeftSidebar />
    <RightSidebar />
    <OnlineHeader />
    <CanvasBox />
  </div>
</template>

<script>
import LeftSidebar from '@/layouts/leftSidebar.vue'
import RightSidebar from '@/layouts/rightSidebar.vue'
import OnlineHeader from '@/layouts/onlineHeader.vue'
import CanvasBox from '@/layouts/canvasBox.vue'
import { mapActions } from 'vuex'
export default {
  name: 'CanvasView',
  components: {
    LeftSidebar,
    RightSidebar,
    OnlineHeader,
    CanvasBox,
  },
  created() {
    this.set_allCharts()
  },
  methods: {
    ...mapActions({
      set_allCharts: 'charts/set_allCharts',
    }),
  },
}
</script>

<style lang="less" scoped>
#HomeView {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
}
</style>
