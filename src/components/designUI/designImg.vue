<template>
  <div
    class="design-img"
    :id="propsData.id"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @mousedown="mousedown"
    @mouseup="mouseup"
    :class="[{ edit: edit && !actualReading }]"
    :style="{
      width: `${positionData.width}px`,
      height: `${positionData.height}px`,
      left: `${positionData.left}px`,
      top: `${positionData.top}px`,
    }"
  >
    <div
      class="box"
      :style="{
        width: `${positionData.width}px`,
        height: `${positionData.height}px`,
      }"
    >
      <!-- 组件的四角缩放功能，组件 -->
      <SelectComponent
        v-if="!actualReading"
        :props="propsData"
        :positionProps.sync="positionData"
        :fatherNodeId="fatherNodeId"
      >
        <img
          class="imge"
          :class="[{ edit: edit }]"
          :style="{
            width: `${positionData.width}px`,
            height: `${positionData.height}px`,
          }"
          :src="imgUrl"
        />
      </SelectComponent>
      <div
        v-else
        class="imge"
        :style="{
          width: `${positionData.width}px`,
          height: `${positionData.height}px`,
        }"
      ></div>
      <div
        v-if="!actualReading"
        class="show"
        :class="[{ action: action }, { enter: enter }, { down: down }]"
      ></div>
    </div>
  </div>
</template>

<script>
import SelectComponent from '@/components/designUI/components/selectComponent.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'designImg',
  components: {
    SelectComponent,
  },
  props: {
    props: {
      type: Object,
      default: () => {},
      required: false,
    },
    fatherNodeId: {
      type: String,
      default: '',
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
      imgUrl: '',
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
    }),
    action: {
      get() {
        return this.targetChart === this.propsData.id
      },
    },
  },
  created() {
    this.update()
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
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
      set_targetParent: 'other/set_targetParent',
      modify_canvasDataChild: 'charts/modify_canvasDataChild',
      set_inputValue: 'other/set_inputValue',
    }),
    //选中时，修改目标chart，修改有侧边栏属性表（id的作用是在修改时，动态找到渲染树的对应节点）
    selectThis() {
      if (!this.actualReading) {
        this.set_targetChart(this.propsData.id)
        this.set_configureList({
          id: this.propsData.id,
          fatherId: this.propsData.fatherId,
          default: this.propsData.default,
        })
      }
    },
    mouseenter() {
      if (!this.action && this.edit && !this.scaleFlag && !this.actualReading) {
        this.enter = true
      }
    },
    mouseleave() {
      if (this.edit && !this.scaleFlag && !this.actualReading) {
        this.enter = false
        this.down = false

        try {
          this.targetParent.onmousemove = null
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
        }
      }
    },
    mousedown(e) {
      if (this.edit && !this.scaleFlag && !this.actualReading) {
        this.down = true
        this.enter = false
        this.selectThis() //鼠标点下后，选中当前组件的函数

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

        this.targetParent.onmousemove = this.mousemove
      }
    },
    mouseup() {
      if (this.edit && !this.scaleFlag && !this.actualReading) {
        this.down = false
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

        this.targetParent.onmousemove = null
      }
    },
    mousemove(e) {
      //计算鼠标移动后，当前组件新的left和top
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
    update() {
      this.propsData = this.props
      this.propsData.default.forEach((obj) => {
        if (obj.type === 'position') {
          obj.configure.forEach((style) => {
            this.positionData[style.type] = style.value
          })
        } else if (obj.type === 'configure') {
          obj.configure.forEach((config) => {
            if (config.type === 'src') {
              this.imgUrl = config.value
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.design-img {
  position: absolute;

  .box {
    position: relative;

    .edit {
      pointer-events: none !important;
    }

    .show {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.5;
      background-color: transparent;
      transition: background-color 0.5s;
    }

    .action {
      z-index: -1;
      background-color: skyblue;
    }

    .enter {
      z-index: 3;
      background-color: skyblue;
      cursor: move;
    }

    .down {
      z-index: 3;
      background-color: rgb(82, 147, 172) !important;
    }
  }
}

.edit {
  cursor: move;
}
</style>
