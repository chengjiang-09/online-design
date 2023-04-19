<template>
  <div
    id="CanvasBox"
    ref="CanvasBox"
    @mousedown.self="mousedown"
    :style="{
      width: `${canvasData.width * 5}px`,
      height: `${canvasData.height * 5}px`,
    }"
  >
    <div
      class="container"
      @mousedown.self="mousedown"
      :style="{
        position: 'absolute',
        top: `${-(canvasData.height / 2 - 105 * (window.height / 1000))}px`,
        left: `${-(canvasData.width / 2 - 343 * (window.width / 1610))}px`,
        width: `${canvasData.width}px`,
        height: `${canvasData.height}px`,
      }"
    >
      <div
        class="worker"
        :style="{
          position: 'absolute',
          bottom: '0%',
          right: '0%',
          transform: `${scaleData} translate(50%,50%)`,
          width: `${canvasData.width}px`,
          height: `${canvasData.height}px`,
        }"
      >
        <div
          class="worker-box"
          :style="{
            width: `${canvasData.width}px`,
            height: `${canvasData.height}px`,
          }"
        ></div>
        <div
          id="workerCanvas"
          class="worker-canvas"
          :style="{
            width: `${canvasData.width}px`,
            height: `${canvasData.height}px`,
            backgroundColor: `${canvasData.backgroundColor}`,
            fontSize: `${canvasData.fontSize}px`,
            color: `${canvasData.color}`,
          }"
          @dragenter.self="dragenter"
          @dragover.self="dragover"
          @drop.self="drop"
        >
          <component
            v-for="obj in canvasData.children"
            :key="obj.type + Date.now()"
            :id="obj.id"
            :is="obj.component"
            :props="obj"
          ></component>
          <img
            v-if="canvasData.backgroundImage"
            :src="canvasData.backgroundImage"
            class="worker-canvas-img"
            :style="{
              width: `${canvasData.width}px`,
              height: `${canvasData.height}px`,
              opacity: canvasData.opacity,
            }"
          />
        </div>
      </div>
    </div>
    <el-dialog
      class="dialog"
      title="选择创建画布的尺寸"
      :visible.sync="editCanvasOpened"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="dialog-suffix">
        <span>width:</span>
        <el-input placeholder="画布宽度" v-model="canvas.width">
          <i slot="suffix" class="dialog-suffix-i">px</i>
        </el-input>
        <span>height:</span>
        <el-input placeholder="画布高度" v-model="canvas.height">
          <i slot="suffix" class="dialog-suffix-i">px</i>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createCanvas">确 定</el-button>
      </span>
    </el-dialog>
    <SaveCanvasDialogVue />
    <div class="block" :class="[{ blockRight: blockRight }]">
      <el-slider v-model="scaleProportion" :min="-100" vertical height="200px">
      </el-slider>
    </div>
  </div>
</template>

<script>
//画布组件
import { mapState, mapActions } from 'vuex'
import { styleMixin } from '@/mixins/styleControl'
import { deepCopy } from '@/utils/utils'
import SaveCanvasDialogVue from './components/saveCanvasDialog.vue'
export default {
  name: 'CanvasBox',
  components: {
    SaveCanvasDialogVue,
  },
  mixins: [styleMixin], //混入一些全局样式的控制
  data: function () {
    return {
      //给定画布初始值，才能保证画布能够动态修改属性值
      canvas: {
        width: 1920,
        height: 1080,
        backgroundColor: `transparent`,
        backgroundImage: '',
        fontSize: `16`,
        color: `#ffffff`,
        opacity: '0.5',
        children: [],
      },
      //根据不同电脑的视口宽度，修改画布初始化位置（暂未测试，效果未知）
      window: {
        width: 0,
        height: 0,
      },
      //默认画布在视觉上的缩放比例，-43：缩小百分之43
      scaleProportion: -43,
      CanvasBox: null,
      //控制缩放按钮在不同模式下的显示位置
      blockRight: true,
      //panel和layout默认100%height，当插入title后，改变height
      newHeight: '',
      timer: null,
    }
  },
  //监听模式变化控制顶部导航栏展开
  watch: {
    rightSidebarOpened: function () {
      if (!this.rightSidebarOpened) {
        return (this.blockRight = true)
      }
      this.blockRight = false
    },
  },
  mounted() {
    if (!this.CanvasBox) {
      this.CanvasBox = document.querySelector('#CanvasBox')
    }
    //根据实际创建画布大小控制画布定位，为了实现画布能够向右下方实现放大或者缩小
    this.window.width = window.screen.availWidth
    this.window.height = window.screen.availHeight
  },
  computed: {
    ...mapState({
      canvasData: (state) => state.charts.canvasData,
      editCanvasOpened: (state) => state.app.editCanvasOpened,
      templateData: (state) => state.other.templateData,
      canvasConfigureList: (state) => state.charts.canvasConfigureList,
    }),
    //根据缩放值修改画布比例
    scaleData: {
      get() {
        let scaleX = 1
        let scaleY = 1
        if (this.scaleProportion !== 0) {
          scaleX += this.scaleProportion / 100
          scaleY += this.scaleProportion / 100

          this.set_scaling({
            x: scaleX,
            y: scaleY,
          })
        }
        return `scale(${scaleX}, ${scaleY})`
      },
    },
  },
  methods: {
    ...mapActions({
      set_editCanvasOpened: 'app/set_editCanvasOpened',
      set_canvasData: 'charts/set_canvasData',
      set_canvasConfigureList: 'charts/set_canvasConfigureList',
      add_canvasDataChild: 'charts/add_canvasDataChild',
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
      set_scaling: 'other/set_scaling',
      set_targetFather: 'other/set_targetFather',
    }),
    mousedown() {
      this.set_targetChart('canvas')
      this.set_targetFather(null)
      this.set_configureList(this.canvasConfigureList)
    },
    handleClose() {
      this.set_editCanvasOpened(false)
    },
    async createCanvas() {
      //画布初始化数据
      await this.set_canvasData(deepCopy(this.canvas))
      this.set_editCanvasOpened(false)
      //初始化画布配置列表
      this.set_canvasConfigureList([
        {
          id: 'canvas',
          label: '画布配置',
          type: 'configure',
          fatherId: '',
          icon: 'el-icon-box',
          component: 'configureList',
          configure: [
            {
              label: '宽度(px)',
              type: 'width',
              component: 'configureInput',
              value: this.canvas.width,
            },
            {
              label: '高度(px)',
              type: 'height',
              component: 'configureInput',
              value: this.canvas.height,
            },
            {
              label: '背景颜色',
              component: 'configureColor',
              type: 'backgroundColor',
              value: 'rgba(0, 0, 0, 0)',
              predefineColors: [
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
              ],
            },
            {
              label: '背景图片url',
              component: 'configureInput',
              type: 'backgroundImage',
              value: '',
            },
            {
              label: '背景图片透明度',
              component: 'configureInput',
              type: 'opacity',
              value: '0.5',
            },
            {
              label: '字体大小(px)',
              component: 'configureInput',
              type: 'fontSize',
              value: '16',
            },
            {
              label: '字体颜色',
              component: 'configureColor',
              type: 'color',
              value: '#000000',
              predefineColors: [
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
              ],
            },
          ],
        },
      ])
    },
    dragenter() {},
    dragover(e) {
      e.preventDefault()
    },
    drop(e) {
      e.stopPropagation()
      e.preventDefault()

      const data = e.dataTransfer.getData('layout')
      //向画布插入子节点
      if (data) {
        if (
          this.canvasData.children.length !== 0 &&
          this.canvasData.children[0].type === 'title'
        ) {
          this.newHeight = '90'
        }
        let date = Date.now()
        this.add_canvasDataChild(
          deepCopy({
            ...this.templateData[data],
            id: this.templateData[data].type + date,
            fatherId: 'canvas',
            newHeight: this.newHeight,
            children: [],
          }),
        )
        this.set_targetChart(this.templateData[data].type + date)
        this.newHeight = ''
      } else {
        this.$message({
          message: '请先使用布局组件进行布局后，再使用普通组件',
          type: 'warning',
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
#CanvasBox {
  position: relative;
  background-image: url('~@/assets/doe.png');
  min-width: 400vw;
  min-height: 400vh;

  .container {
    .worker {
      &-box {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: skyblue;
        opacity: 0.2;
        border: 1px solid skyblue;
      }

      &-canvas {
        position: absolute;
        background-color: transparent;
        z-index: 2;
        top: 0;
        left: 0;
        box-sizing: border-box;
        // overflow: hidden;

        &-img {
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          pointer-events: none;
        }
      }
    }
  }
  .dialog {
    &-suffix {
      display: flex;
      span {
        width: 220px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:nth-of-type(2) {
          margin-left: 10px;
        }
      }

      .dialog-suffix-i {
        height: 100%;
      }
    }
  }
  .block {
    position: fixed;
    bottom: 12px;
    right: 400px;
    transition: right 1s;
  }

  .blockRight {
    right: 20px !important;
  }
}
</style>
