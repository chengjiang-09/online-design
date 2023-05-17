<template>
  <div
    class="design-decoration-border"
    :id="propsData.id"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @mousedown="mousedown"
    @mouseup="mouseup"
    :class="[
      { edit: edit && !actualReading },
      { down: down },
      { drag: isDrag },
    ]"
    :style="{
      width: `${manager ? 400 : positionData.width}px`,
      height: `${manager ? 200 : positionData.height}px`,
      left: `${positionData.left}px`,
      top: `${positionData.top}px`,
    }"
  >
    <div
      class="box"
      :style="{
        width: `${manager ? 400 : positionData.width}px`,
        height: `${manager ? 200 : positionData.height}px`,
      }"
    >
      <!-- 组件的四角缩放功能，组件 -->
      <SelectComponent
        v-if="!actualReading"
        :props="propsData"
        :positionProps.sync="positionData"
        :fatherNodeId="fatherNodeId"
        :enter="enter"
        :down="down"
      >
        <div
          :class="[styleData.class]"
          :style="{
            width: `${positionData.width}px`,
            height: `${positionData.height}px`,
            opacity: styleData.opacity,
          }"
        ></div>
      </SelectComponent>
      <div
        v-else
        :class="[styleData.class]"
        :style="{
          opacity: styleData.opacity,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import SelectComponent from '@/components/designUI/components/selectComponent.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import goBackListType from '@/utils/goBackListType'
export default {
  name: 'DesignDecorationBorder',
  components: {
    SelectComponent,
  },
  props: {
    props: {
      type: Object,
      default: () => {},
      require: false,
    },
    fatherNodeId: {
      type: String,
      default: '',
      required: false,
    },
    manager: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: function () {
    return {
      propsData: {},
      //需要给定初始值，才能保证样式的动态渲染
      positionData: {
        width: '0',
        height: '0',
        left: 0,
        top: 0,
      },
      edit: true, //是否进入编辑模式
      enter: false, ///这两个值是为了在编辑模式以及阅览模式中限制组件的某些功能，例如mousedown事件,show遮盖层的显示
      down: false,
      target: {
        node: null,
        offsetX: 0, //鼠标到当前组件的距离
        offsetY: 0,
      },
      parentNode: {
        //用于组件移动
        maxLeft: 0,
        maxTop: 0,
        maxWidth: 0,
        maxHeight: 0,
      },
      styleData: {
        opacity: '1',
        animationTimeline: '2s',
        animationTimingFunction: 'linear',
        animationDirection: 'normal',
        class: 'border',
      },
    }
  },
  watch: {
    props: {
      handler: function () {
        this.update()
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      targetChart: (state) => state.other.targetChart, //鼠标点击到的组件
      actualReading: (state) => state.other.actualReading, //是否处于,实际阅览模式
      operatingMode: (state) => state.app.operatingMode, //编辑模式与阅览模式标识
      targetParent: (state) => state.other.targetParent, //鼠标点击到的组件的父组件
      scaling: (state) => state.other.scaling, //缩放比例
      scaleFlag: (state) => state.other.scaleFlag, //是否处于缩放模式，用于关闭移动功能
      moveFlag: (state) => state.other.moveFlag,
      isDrag: (state) => state.other.isDrag,
    }),
    action: {
      get() {
        return this.targetChart === this.propsData.id
      },
    },
  },
  created() {
    //限制初始化大小不超过这个父盒子宽高
    let fatherNode = null
    if (this.fatherNodeId) {
      fatherNode = document.querySelector(`#${this.fatherNodeId}`)
    }

    if (fatherNode) {
      this.update(fatherNode.offsetWidth, fatherNode.offsetHeight)
    } else {
      this.update()
    }
  },
  mounted() {
    switch (this.operatingMode) {
      case 'editMode':
        this.edit = true //这三个值都是为了在编辑模式以及阅览模式中限制组件的某些功能，例如mousedown事件
        break
      case 'readingMode':
        this.edit = false
        this.enter = false
        this.down = false
        break
      default:
        break
    }
  },
  methods: {
    ...mapMutations({
      SET_MOVE_FLAG: 'other/SET_MOVE_FLAG',
    }),
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
      set_targetParent: 'other/set_targetParent',
      modify_canvasDataChild: 'charts/modify_canvasDataChild',
      set_inputValue: 'other/set_inputValue',
      set_coverageArray: 'charts/set_coverageArray',
      set_goBcakArray: 'charts/set_goBcakArray',
      set_targetFather: 'other/set_targetFather',
    }),
    //选中时，修改目标chart，修改有侧边栏属性表（id的作用是在修改时，动态找到渲染树的对应节点）
    selectThis() {
      if (!this.actualReading) {
        this.set_targetChart(this.propsData.id)
        this.set_targetFather(this.propsData.fatherId)
        this.set_configureList({
          id: this.propsData.id,
          fatherId: this.propsData.fatherId,
          default: this.propsData.default,
        })
        this.set_coverageArray(this.propsData.fatherId)
      }
    },
    mouseenter() {
      if (!this.action && this.edit && !this.scaleFlag && !this.actualReading) {
        this.enter = true
      }
    },
    mouseleave() {
      if (this.edit && !this.scaleFlag && !this.actualReading) {
        if (this.moveFlag) {
          this.SET_MOVE_FLAG(false)
        }

        try {
          this.targetParent.removeEventListener('mousemove', this.mousemove)
          //拖拽结束后，更新渲染树在store中的数据
          this.modify_canvasDataChild({
            fatherId: this.propsData.fatherId,
            id: this.propsData.id,
            data: {
              key: 'top',
              value: this.positionData.top,
            },
            type: 'position',
          })

          this.modify_canvasDataChild({
            fatherId: this.propsData.fatherId,
            id: this.propsData.id,
            data: {
              key: 'left',
              value: this.positionData.left,
            },
            type: 'position',
          })
        } catch (e) {
          return
        } finally {
          this.enter = false
          this.down = false
        }
      }
    },
    mousedown(e) {
      if (this.edit && !this.scaleFlag && !this.actualReading) {
        this.down = true
        this.enter = false
        this.selectThis() //鼠标点下后，选中当前组件的函数

        if (this.down) {
          this.set_goBcakArray({
            fatherId: this.propsData.fatherId,
            id: this.propsData.id,
            data: [
              {
                key: 'top',
                value: this.positionData.top,
              },
              {
                key: 'left',
                value: this.positionData.left,
              },
            ],
            defaultType: 'position',
            type: goBackListType.update,
          })
        }

        if (!this.target.node) {
          //当前组件
          this.target.node = document.querySelector(`#${this.propsData.id}`)
        }
        //获取当前组件的父组件
        this.set_targetParent(document.querySelector(`#${this.fatherNodeId}`))
        //点击时获取初始鼠标位置，用于计算之后移动时的变化距离
        this.target.offsetX = e.offsetX
        this.target.offsetY = e.offsetY

        //记录点击时的最大top和left距离，用于限制组件拖拽的范围
        this.parentNode.maxLeft =
          parseInt(
            this.targetParent.getBoundingClientRect().width / this.scaling.x,
          ) - parseInt(this.positionData.width)

        this.parentNode.maxTop =
          parseInt(
            this.targetParent.getBoundingClientRect().height / this.scaling.y,
          ) - parseInt(this.positionData.height)

        this.targetParent.addEventListener('mousemove', this.mousemove)
      }
    },
    mouseup() {
      if (this.edit && !this.scaleFlag && !this.actualReading) {
        if (this.moveFlag) {
          this.SET_MOVE_FLAG(false)
        }
        //拖拽结束后，更新渲染树在store中的数据
        this.modify_canvasDataChild({
          fatherId: this.propsData.fatherId,
          id: this.propsData.id,
          data: {
            key: 'top',
            value: this.positionData.top,
          },
          type: 'position',
        })

        this.modify_canvasDataChild({
          fatherId: this.propsData.fatherId,
          id: this.propsData.id,
          data: {
            key: 'left',
            value: this.positionData.left,
          },
          type: 'position',
        })

        this.targetParent.removeEventListener('mousemove', this.mousemove)
        this.down = false
      }
    },
    mousemove(e) {
      //计算鼠标移动后，当前组件新的left和top
      if (!this.moveFlag) {
        this.SET_MOVE_FLAG(true)
      }
      let left =
        this.positionData.left + e.offsetX - this.target.offsetX <= 0
          ? 0
          : this.positionData.left + e.offsetX - this.target.offsetX

      let top =
        this.positionData.top + e.offsetY - this.target.offsetY <= 0
          ? 0
          : this.positionData.top + e.offsetY - this.target.offsetY

      left = left >= this.parentNode.maxLeft ? this.parentNode.maxLeft : left
      top = top >= this.parentNode.maxTop ? this.parentNode.maxTop : top

      this.positionData.left = left
      this.positionData.top = top
      //由于右侧边栏对数据的修改是单向的，此处是为了让组件移动时，动态修改右侧对应的position属性
      this.set_inputValue({
        width: `${this.positionData.width}`,
        height: `${this.positionData.height}`,
        top: `${this.positionData.top}`,
        left: `${this.positionData.left}`,
      })
    },
    //初始化函数
    update(parentNodeWidth, parentNodeHeight) {
      this.propsData = this.props
      this.propsData.default.forEach((obj) => {
        if (obj.type === 'position') {
          obj.configure.forEach((style) => {
            if (
              style.type == 'width' &&
              parentNodeWidth &&
              style.value > parentNodeWidth
            ) {
              this.positionData[style.type] = parentNodeWidth

              this.modify_canvasDataChild({
                fatherId: this.propsData.fatherId,
                id: this.propsData.id,
                data: {
                  key: 'width',
                  value: this.positionData.width,
                },
                type: 'position',
              })
            } else if (
              style.type == 'height' &&
              parentNodeHeight &&
              style.value > parentNodeHeight
            ) {
              this.positionData[style.type] = parentNodeHeight

              this.modify_canvasDataChild({
                fatherId: this.propsData.fatherId,
                id: this.propsData.id,
                data: {
                  key: 'height',
                  value: this.positionData.height,
                },
                type: 'position',
              })
            } else {
              this.positionData[style.type] = style.value
            }
          })
        } else if (obj.type === 'configure') {
          obj.configure.forEach((config) => {
            this.styleData[config.type] = config.value
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.design-decoration-border {
  position: absolute;
  z-index: 2;

  .box {
    position: relative;

    .edit {
      pointer-events: none !important;
    }

    .border {
      width: 100%;
      height: 100%;
      border: 5px solid;
      border-radius: 10px;
      animation: borderAnimation 2s linear infinite;
    }

    .border-two {
      width: 100%;
      height: 100%;
      border: 5px solid cyan;
      border-radius: 10px;
      box-shadow: inset 0 0 90px white;
    }

    .border-three {
      width: 100%;
      height: 100%;
      border: 0px solid cyan;
      box-shadow: inset 0 0 90px white;
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 2px;
        background-color: #5eff00;
      }

      &::before {
        left: 0;
        top: 0;
      }

      &::after {
        right: 0;
        top: 0;
      }
    }

    .border-four {
      width: 100%;
      height: 100%;
      border: 5px solid;
      border-radius: 10px;
      animation: borderAnimation2 2s linear infinite;
    }

    .border-five {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .border-five::before,
    .border-five::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .border-five::before {
      top: 5px;
      left: 5px;
      border: 1px solid #ccc;
      z-index: 1;
      animation: border-animation 2s infinite alternate;
    }

    .border-five::after {
      top: 10px;
      left: 10px;
      border: 1px solid #bbb;
      z-index: 2;
      animation: border-animation 2s infinite alternate-reverse;
    }

    @keyframes border-animation {
      0% {
        transform: scaleX(1);
      }
      100% {
        transform: scaleX(0);
      }
    }

    @keyframes borderAnimation {
      0% {
        border-color: rgb(0, 255, 179);
      }
      25% {
        border-color: rgb(0, 161, 172);
      }
      50% {
        border-color: rgb(0, 255, 170);
      }
      75% {
        border-color: rgb(0, 141, 160);
      }
      100% {
        border-color: rgb(0, 255, 179);
      }
    }

    @keyframes borderAnimation2 {
      0% {
        border-color: rgb(0, 39, 27);
      }
      25% {
        border-color: rgb(0, 65, 70);
      }
      50% {
        border-color: rgb(0, 58, 39);
      }
      75% {
        border-color: rgb(0, 51, 58);
      }
      100% {
        border-color: rgb(0, 39, 27);
      }
    }
  }
}

.edit {
  cursor: move;
}

.down {
  z-index: 9999 !important;
}

.drag {
  pointer-events: none;
}
</style>
