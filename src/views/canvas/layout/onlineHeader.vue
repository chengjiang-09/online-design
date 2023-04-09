<template>
  <div id="OnlineHeader" :class="[{ onlineHeaderClose: !onlineHeaderOpened }]">
    <div id="HeaderMenu">
      <div class="container">
        <div class="close-open" @click="onlineHeaderControl"></div>
        <ul>
          <li
            v-for="obj in canvasHeaderMenu"
            :key="obj.type"
            :class="[{ action: obj.action }]"
            @click="choice($event, obj.type)"
          >
            {{ obj.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import html2canvas from 'html2canvas'
import { mapActions, mapState } from 'vuex'
import { styleMixin } from '@/mixins/styleControl'
import { deepCopy } from '@/utils/utils'
export default {
  name: 'OnlineHeader',
  mixins: [styleMixin],
  data: function () {
    return {
      headerMenu: [],
    }
  },
  mounted() {
    this.set_canvasHeaderMenu()
  },
  computed: {
    ...mapState({
      canvasHeaderMenu: (state) => state.charts.canvasHeaderMenu,
    }),
  },
  watch: {
    //监听模式修改控制侧边栏是否允许开启
    operatingMode: function () {
      if (this.operatingMode === 'editMode') {
        return this.set_onlineHeader(true)
      }
      this.onlineHeaderControl()
    },
  },
  methods: {
    ...mapActions({
      set_OperatingMode: 'app/set_OperatingMode',
      set_onlineHeader: 'app/set_onlineHeader',
      set_editCanvasOpened: 'app/set_editCanvasOpened',
      set_targetChart: 'other/set_targetChart',
      set_actualReadingCanvas: 'other/set_actualReadingCanvas',
      add_canvasDataChild: 'charts/add_canvasDataChild',
      set_submitCanvasOpened: 'app/set_submitCanvasOpened',
      set_canvasHeaderMenu: 'charts/set_canvasHeaderMenu',
      update_canvasHeaderMenu: 'charts/update_canvasHeaderMenu',
    }),
    choice(e, type) {
      //限制只有阅览模式和编辑模式按钮拥有激活状态的style
      if (type === 'reading' || type === 'edit') {
        this.update_canvasHeaderMenu({ type })
      }
      switch (type) {
        case 'edit':
          this.edit()
          break
        case 'reading':
          this.reading()
          break
        case 'revoke':
          this.revoke()
          break
        case 'redo':
          this.redo()
          break
        case 'actualReading':
          this.actualReading()
          break
        case 'editCanvas':
          this.editCanvas()
          break
        case 'complete':
          this.complete()
          break
        default:
          console.log(type, '该实现方法未存在')
          break
      }
    },
    edit() {
      this.set_OperatingMode('editMode')
    },
    reading() {
      this.set_targetChart('')
      this.set_OperatingMode('readingMode')
    },
    revoke() {},
    redo() {
      this.$confirm('是否确定重置？重置将会清除所有已布局的组件。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.add_canvasDataChild([])
          this.$message({
            type: 'success',
            message: '重置成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置',
          })
        })
    },
    async actualReading() {
      await this.set_actualReadingCanvas(
        deepCopy(this.$store.state.charts.canvasData),
      )

      this.$router.push('/actualReading')
    },
    editCanvas() {
      this.set_editCanvasOpened(true)
    },
    async complete() {
      await this.set_actualReadingCanvas(
        deepCopy(this.$store.state.charts.canvasData),
      )
      await this.set_targetChart(null)
      this.set_submitCanvasOpened(true)

      // this.$router.push('/actualReading')
      // this.$nextTick(() => {
      //   this.$confirm('是否导出成图？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   })
      //     .then(async () => {
      //       const canvasComponent = document.querySelector('#ActualReadingView')

      //       await this.set_targetChart(null)

      //       // 使用html2canvas将DOM元素转换为Canvas图像
      //       const canvas = await html2canvas(canvasComponent, { useCORS: true })
      //       // 将Canvas图像转换为图像URL
      //       // const image = canvas.toDataURL()

      //       canvas.toBlob((blob) => {
      //         const file = new File([blob], `${randomStr(21)}.png`)
      //         console.log(file)
      //       })
      //       // 打开图像
      //       // const link = document.createElement('a')
      //       // link.href = image
      //       // link.download = `${randomStr(21)}.png`
      //       // link.target = '_blank' // 在新标签页中打开图像
      //       // link.click()
      //     })
      //     .catch(() => {})
      // })
    },
    onlineHeaderControl() {
      this.set_onlineHeader(!this.onlineHeaderOpened)
    },
  },
}
</script>

<style lang="less" scoped>
#OnlineHeader {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 6%;
  background-color: transparent;
  border-bottom: 2px solid #f6f6f6;
  transform: translateY(0);
  transition: transform 1s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);

  #HeaderMenu {
    width: 50%;
    height: 100%;
    .container {
      position: relative;
      width: 100%;
      height: 100%;

      .close-open {
        position: absolute;
        height: 90px;
        width: 45px;
        left: 50%;
        bottom: 0;
        background-color: #f6f6f6;
        border: 1px solid #d3d3d3;
        z-index: -1;
        transition: transform 1s;
        transform: translateY(30px);
        border-radius: 22px;
        cursor: pointer;

        &:hover {
          transform: translateY(60px);
        }
      }

      ul {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 50vw;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        border-radius: 20px;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.5s;
          border-radius: 20px;
          backdrop-filter: blur(6px);

          &:hover {
            background-color: rgb(235, 235, 235);
          }
        }

        .action {
          background-color: rgb(235, 235, 235);
        }
      }
    }
  }
}

.onlineHeaderClose {
  transform: translateY(-100%) !important;
}
</style>
