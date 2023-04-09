<template>
  <div id="canvasView">
    <LeftSidebar />
    <RightSidebar />
    <OnlineHeader />
    <CanvasBox />
  </div>
</template>

<script>
import LeftSidebar from '@/views/canvas/layout/leftSidebar.vue'
import RightSidebar from '@/views/canvas/layout/rightSidebar.vue'
import OnlineHeader from '@/views/canvas/layout/onlineHeader.vue'
import CanvasBox from '@/views/canvas/layout/canvasBox.vue'
import { mapActions } from 'vuex'
export default {
  name: 'CanvasView',
  components: {
    LeftSidebar,
    RightSidebar,
    OnlineHeader,
    CanvasBox,
  },
  async created() {
    const id = this.$route.params.id

    if (id) {
      const { authorId } =
        await this.set_canvasDataAndCanvasConfigureListToServer({ id })

      const token = this.$ls.get('token')
      const user = this.$ls.get('user')

      if (token && user && user.id && user.email && user.id == authorId) {
        this.set_permissionId('author')
        this.set_allCharts()
      } else {
        this.set_permissionId('notAuthor')
      }
    } else {
      this.set_permissionId(null)
      this.set_allCharts()
    }
  },
  methods: {
    ...mapActions({
      set_allCharts: 'charts/set_allCharts',
      set_OperatingMode: 'app/set_OperatingMode',
      set_canvasDataAndCanvasConfigureListToServer:
        'charts/set_canvasDataAndCanvasConfigureListToServer',
      set_permissionId: 'charts/set_permissionId',
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
