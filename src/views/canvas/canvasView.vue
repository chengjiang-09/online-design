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
import { mapActions, mapState } from 'vuex'
import { isEmpty } from '@/utils/utils'
export default {
  name: 'CanvasView',
  components: {
    LeftSidebar,
    RightSidebar,
    OnlineHeader,
    CanvasBox,
  },
  computed: {
    ...mapState({
      canvasData: (state) => state.charts.canvasData,
      canvasConfigureList: (state) => state.charts.canvasConfigureList,
    }),
  },
  async created() {
    const id = this.$route.params.id

    const token = this.$ls.get('token')
    const user = this.$ls.get('user')
    this.delete_canvasHeaderMenu()
    if (id) {
      this.set_canvasData({})
      this.set_editCanvasOpened(false)
      this.set_canvasConfigureList([])
      const { authorId } =
        await this.set_canvasDataAndCanvasConfigureListToServer({ id })
      this.authorId = authorId

      if (token && user && user.id && user.email && user.id == authorId) {
        await this.set_permissionId('author')
        this.set_allCharts()
        this.set_OperatingMode('editMode')
      } else {
        await this.set_permissionId('notAuthor')
        this.set_targetChart('')
        this.set_canvasConfigureList([])
      }
    } else if (this.canvasData && !isEmpty(this.canvasData)) {
      await this.set_permissionId('author')
      this.set_allCharts()
      this.set_OperatingMode('editMode')
      this.set_editCanvasOpened(false)
    } else {
      await this.set_permissionId(null)
      this.set_allCharts()
      this.set_OperatingMode('editMode')
    }
    this.set_canvasHeaderMenu()
  },
  data: function () {
    return {
      authorId: '',
    }
  },
  methods: {
    ...mapActions({
      set_allCharts: 'charts/set_allCharts',
      set_OperatingMode: 'app/set_OperatingMode',
      set_canvasDataAndCanvasConfigureListToServer:
        'charts/set_canvasDataAndCanvasConfigureListToServer',
      set_permissionId: 'charts/set_permissionId',
      set_editCanvasOpened: 'app/set_editCanvasOpened',
      set_canvasHeaderMenu: 'charts/set_canvasHeaderMenu',
      set_canvasConfigureList: 'charts/set_canvasConfigureList',
      set_canvasData: 'charts/set_canvasData',
      set_targetChart: 'other/set_targetChart',
      delete_canvasHeaderMenu: 'charts/delete_canvasHeaderMenu',
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
