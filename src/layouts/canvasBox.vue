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
      title="???????????????????????????"
      :visible.sync="editCanvasOpened"
      width="30%"
      :before-close="handleClose"
    >
      <div class="dialog-suffix">
        <span>width:</span>
        <el-input placeholder="????????????" v-model="canvas.width">
          <i slot="suffix" class="dialog-suffix-i">px</i>
        </el-input>
        <span>height:</span>
        <el-input placeholder="????????????" v-model="canvas.height">
          <i slot="suffix" class="dialog-suffix-i">px</i>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createCanvas">??? ???</el-button>
      </span>
    </el-dialog>
    <div class="block" :class="[{ blockRight: blockRight }]">
      <el-slider v-model="scaleProportion" :min="-100" vertical height="200px">
      </el-slider>
    </div>
  </div>
</template>

<script>
//????????????
import { mapState, mapActions } from 'vuex'
import { styleMixin } from '@/mixins/styleControl'
import { deepCopy } from '@/utils/utils'
export default {
  name: 'CanvasBox',
  mixins: [styleMixin], //?????????????????????????????????
  data: function () {
    return {
      //?????????????????????????????????????????????????????????????????????
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
      //????????????????????????????????????????????????????????????????????????????????????????????????
      window: {
        width: 0,
        height: 0,
      },
      //??????????????????????????????????????????-55??????????????????55
      scaleProportion: -55,
      CanvasBox: null,
      //???????????????????????????????????????????????????
      blockRight: false,
      //panel???layout??????100%height????????????title????????????height
      newHeight: '',
      timer: null,
    }
  },
  //?????????????????????????????????????????????
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
    //???????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
    //?????????????????????????????????
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
    }),
    mousedown() {
      this.set_targetChart('canvas')
      this.set_configureList(this.canvasConfigureList)
    },
    handleClose() {
      this.set_editCanvasOpened(false)
    },
    async createCanvas() {
      //?????????????????????
      await this.set_canvasData(deepCopy(this.canvas))
      this.set_editCanvasOpened(false)
      //???????????????????????????
      this.set_canvasConfigureList([
        {
          id: 'canvas',
          label: '????????????',
          type: 'configure',
          fatherId: '',
          icon: 'el-icon-box',
          component: 'configureList',
          configure: [
            {
              label: '??????(px)',
              type: 'width',
              component: 'configureInput',
              value: this.canvas.width,
            },
            {
              label: '??????(px)',
              type: 'height',
              component: 'configureInput',
              value: this.canvas.height,
            },
            {
              label: '????????????',
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
              label: '????????????url',
              component: 'configureInput',
              type: 'backgroundImage',
              value: '',
            },
            {
              label: '???????????????',
              component: 'configureInput',
              type: 'opacity',
              value: '0.5',
            },
            {
              label: '????????????(px)',
              component: 'configureInput',
              type: 'fontSize',
              value: '16',
            },
            {
              label: '????????????',
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
      //????????????????????????
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
          message: '???????????????????????????????????????????????????????????????',
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
