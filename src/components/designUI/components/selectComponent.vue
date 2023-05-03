<template>
  <div
    class="select-component"
    :style="{
      width: `${positionData.width}px`,
      height: `${positionData.height}px`,
    }"
    :class="[{ isMove: moveFlag }]"
  >
    <div class="container">
      <slot></slot>
    </div>
    <span
      v-for="obj in spot"
      v-show="action"
      @mousedown.self="mousedown"
      @mouseup.self="mouseup"
      @mouseleave.self="mouseleave"
      :key="obj.key"
      :class="[obj.key]"
      :style="{
        top: `${obj.style.top}px`,
        left: `${obj.style.left}px`,
        width: `${obj.style.width}px`,
        height: `${obj.style.height}px`,
        cursor: obj.style.cursor,
      }"
    ></span>
    <div
      class="show"
      :class="[{ action: action }, { enter: enterFlag }, { down: downFlag }]"
    ></div>
    <SmallMenu
      class="menu"
      :menuItems="smallmenu"
      :class="[{ 'menu-action': action }]"
      @clickMenuItem="clickMenuItem"
    />
  </div>
</template>

<script>
//组件大小四角四边控制组件
import { mapState, mapActions } from 'vuex'
import goBackListType from '@/utils/goBackListType'
import SmallMenu from '@/components/publicUI/common/smallMenu.vue'
import menuList from '@/utils/menuList'
export default {
  name: 'SelectComponent',
  components: {
    SmallMenu,
  },
  props: {
    props: {
      type: Object,
      default: () => {},
      required: false,
    },
    positionProps: {
      type: Object,
      default: () => {},
      required: false,
    },
    fatherNodeId: {
      type: String,
      default: '',
      required: false,
    },
    enter: {
      type: Boolean,
      default: false,
    },
    down: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      targetChart: (state) => state.other.targetChart,
      targetParent: (state) => state.other.targetParent,
      scaling: (state) => state.other.scaling,
      moveFlag: (state) => state.other.moveFlag,
    }),
    action: {
      get() {
        return this.targetChart === this.propsData.id
      },
    },
    enterFlag: {
      get() {
        return this.enter
      },
    },
    downFlag: {
      get() {
        return this.down
      },
    },
  },
  watch: {
    props: {
      handler: function () {
        this.update()
      },
      deep: true,
    },
    positionProps: {
      handler: function () {
        this.update()
      },
      deep: true,
    },
  },
  created() {
    this.update()
  },
  data: function () {
    return {
      smallmenu: menuList,
      propsData: {
        id: 0,
      },
      positionData: {
        width: '0',
        height: '0',
        left: 0,
        top: 0,
      },
      parentNode: {
        maxLeft: 0,
        maxTop: 0,
        maxWidth: 0,
        maxHeight: 0,
      },
      spot: [
        //八个点的数据配置
        {
          key: 'leftTop',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 'nw-resize',
          },
        },
        {
          key: 'top',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 'n-resize',
          },
        },
        {
          key: 'rightTop',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 'ne-resize',
          },
        },
        {
          key: 'left',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 'w-resize',
          },
        },
        {
          key: 'right',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 'e-resize',
          },
        },
        {
          key: 'leftBottom',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 'sw-resize',
          },
        },
        {
          key: 'bottom',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 's-resize',
          },
        },
        {
          key: 'rightBottom',
          style: {
            top: 0,
            left: 0,
            width: '120',
            height: '120',
            cursor: 'se-resize',
          },
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      set_scaleFlag: 'other/set_scaleFlag',
      set_targetParent: 'other/set_targetParent',
      set_inputValue: 'other/set_inputValue',
      modify_canvasDataChild: 'charts/modify_canvasDataChild',
      set_goBcakArray: 'charts/set_goBcakArray',
      update_coverageArrayGoTop: 'charts/update_coverageArrayGoTop',
      delete_chart: 'charts/delete_chart',
    }),
    clickMenuItem({ type }) {
      switch (type) {
        case 'goTop':
          this.update_coverageArrayGoTop({
            fatherId: this.propsData.fatherId,
            id: this.propsData.id,
          })
          break
        case 'delete':
          this.delete_chart({
            fatherId: this.propsData.fatherId,
            id: this.propsData.id,
            type: 'deleteChart',
          })
          break
        default:
          break
      }
    },
    update() {
      this.propsData = this.props
      this.positionData = this.positionProps

      //初始化时，需要根据不同组件的大小动态修改八个点的位置
      this.spot.forEach((obj) => {
        switch (obj.key) {
          case 'leftTop':
            obj.style.left = -60
            obj.style.top = -60
            break
          case 'top':
            obj.style.left = this.positionData.width / 2 - 60
            obj.style.top = -60
            break
          case 'rightTop':
            obj.style.left = this.positionData.width - 60
            obj.style.top = -60
            break
          case 'left':
            obj.style.left = -60
            obj.style.top = this.positionData.height / 2 - 60
            break
          case 'right':
            obj.style.left = this.positionData.width - 60
            obj.style.top = this.positionData.height / 2 - 60
            break
          case 'leftBottom':
            obj.style.left = -60
            obj.style.top = this.positionData.height - 60
            break
          case 'bottom':
            obj.style.left = this.positionData.width / 2 - 60
            obj.style.top = this.positionData.height - 60
            break
          case 'rightBottom':
            obj.style.left = this.positionData.width - 60
            obj.style.top = this.positionData.height - 60
            break
          default:
            break
        }
      })
    },
    mousedown(e) {
      this.set_scaleFlag(true) //开启缩放模式，关闭上层组件的移动功能
      e.target.style.zIndex = 99
      let node = e.target
      let position = {
        oldX: e.offsetX,
        oldY: e.offsetY,
        target: e.target.className,
      }

      this.set_targetParent(document.querySelector(`#${this.fatherNodeId}`))

      this.parentNode.maxWidth = parseInt(
        this.targetParent.getBoundingClientRect().width / this.scaling.x,
      )

      this.parentNode.maxHeight = parseInt(
        this.targetParent.getBoundingClientRect().height / this.scaling.y,
      )

      let maxWidth = parseInt(this.positionData.width) + this.positionData.left
      let maxHeight = parseInt(this.positionData.height) + this.positionData.top

      //记录初始位置，用于撤回操作
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
          {
            key: 'height',
            value: this.positionData.height,
          },
          {
            key: 'width',
            value: this.positionData.width,
          },
        ],
        defaultType: 'position',
        type: goBackListType.update,
      })

      //以下是点击八个点之后，对应的移动功能
      node.onmousemove = (e) => {
        if (position.target == 'rightBottom') {
          let width =
            parseInt(this.positionData.width) + (e.offsetX - position.oldX) <= 5
              ? 5
              : parseInt(this.positionData.width) + (e.offsetX - position.oldX)
          let height =
            parseInt(this.positionData.height) + (e.offsetY - position.oldY) <=
            5
              ? 5
              : parseInt(this.positionData.height) + (e.offsetY - position.oldY)
          width =
            width + this.positionData.left >= this.parentNode.maxWidth
              ? this.parentNode.maxWidth - this.positionData.left
              : width
          height =
            height + this.positionData.top >= this.parentNode.maxHeight
              ? this.parentNode.maxHeight - this.positionData.top
              : height

          this.positionData.width = width
          this.positionData.height = height
        } else if (position.target == 'leftTop') {
          let width =
            parseInt(this.positionData.width) - (e.offsetX - position.oldX) <= 5
              ? 5
              : parseInt(this.positionData.width) - (e.offsetX - position.oldX)

          let height =
            parseInt(this.positionData.height) - (e.offsetY - position.oldY) <=
            5
              ? 5
              : parseInt(this.positionData.height) - (e.offsetY - position.oldY)

          width = width >= maxWidth ? maxWidth : width
          height = height >= maxHeight ? maxHeight : height

          this.positionData.width = width
          this.positionData.height = height

          if (height > 5) {
            this.positionData.top =
              height === maxHeight
                ? 0
                : this.positionData.top + e.offsetY - position.oldY
          }
          if (width > 5) {
            this.positionData.left =
              width === maxWidth
                ? 0
                : this.positionData.left + e.offsetX - position.oldX
          }
        } else if (position.target == 'rightTop') {
          let width =
            parseInt(this.positionData.width) + (e.offsetX - position.oldX) <= 5
              ? 5
              : parseInt(this.positionData.width) + (e.offsetX - position.oldX)

          let height =
            parseInt(this.positionData.height) - (e.offsetY - position.oldY) <=
            5
              ? 5
              : parseInt(this.positionData.height) - (e.offsetY - position.oldY)

          width =
            width + this.positionData.left >= this.parentNode.maxWidth
              ? this.parentNode.maxWidth - this.positionData.left
              : width
          height = height >= maxHeight ? maxHeight : height

          this.positionData.width = width
          this.positionData.height = height

          if (parseInt(this.positionData.height) > 5) {
            this.positionData.top =
              height === maxHeight
                ? 0
                : this.positionData.top + e.offsetY - position.oldY
          }
        } else if (position.target == 'leftBottom') {
          let width =
            parseInt(this.positionData.width) - (e.offsetX - position.oldX) <= 5
              ? 5
              : parseInt(this.positionData.width) - (e.offsetX - position.oldX)
          let height =
            parseInt(this.positionData.height) + (e.offsetY - position.oldY) <=
            5
              ? 5
              : parseInt(this.positionData.height) + (e.offsetY - position.oldY)

          width = width >= maxWidth ? maxWidth : width
          height =
            height + this.positionData.top >= this.parentNode.maxHeight
              ? this.parentNode.maxHeight - this.positionData.top
              : height

          this.positionData.width = width
          this.positionData.height = height

          if (parseInt(this.positionData.width) > 5) {
            this.positionData.left =
              width === maxWidth
                ? 0
                : this.positionData.left + e.offsetX - position.oldX
          }
        } else if (position.target == 'bottom') {
          let height =
            parseInt(this.positionData.height) + (e.offsetY - position.oldY) <=
            5
              ? 5
              : parseInt(this.positionData.height) + (e.offsetY - position.oldY)

          height =
            height + this.positionData.top >= this.parentNode.maxHeight
              ? this.parentNode.maxHeight - this.positionData.top
              : height

          this.positionData.height = height
        } else if (position.target == 'right') {
          let width =
            parseInt(this.positionData.width) + (e.offsetX - position.oldX) <= 5
              ? 5
              : parseInt(this.positionData.width) + (e.offsetX - position.oldX)

          width =
            width + this.positionData.left >= this.parentNode.maxWidth
              ? this.parentNode.maxWidth - this.positionData.left
              : width
          this.positionData.width = width
        } else if (position.target == 'top') {
          let height =
            parseInt(this.positionData.height) - (e.offsetY - position.oldY) <=
            5
              ? 5
              : parseInt(this.positionData.height) - (e.offsetY - position.oldY)
          height = height >= maxHeight ? maxHeight : height

          this.positionData.height = height
          if (parseInt(this.positionData.height) > 5) {
            this.positionData.top =
              height === maxHeight
                ? 0
                : this.positionData.top + e.offsetY - position.oldY
          }
        } else if (position.target == 'left') {
          let width =
            parseInt(this.positionData.width) - (e.offsetX - position.oldX) <= 5
              ? 5
              : parseInt(this.positionData.width) - (e.offsetX - position.oldX)

          width = width >= maxWidth ? maxWidth : width
          this.positionData.width = width

          if (parseInt(this.positionData.width) > 5) {
            this.positionData.left =
              width === maxWidth
                ? 0
                : this.positionData.left + e.offsetX - position.oldX
          }
        }
        //由于右侧边栏对数据的修改是单向的，此处是为了让组件移动时，动态修改右侧对应的position属性
        this.set_inputValue({
          width: `${this.positionData.width}`,
          height: `${this.positionData.height}`,
          top: `${this.positionData.top}`,
          left: `${this.positionData.left}`,
        })

        this.$emit('update:positionProps', this.positionData)
      }
    },
    mouseup(e) {
      this.set_scaleFlag(false)
      e.target.style.zIndex = 1
      let node = e.target
      node.onmousemove = null

      //缩放结束后，更新渲染树在store中的数据
      this.modify_canvasDataChild({
        fatherId: this.propsData.fatherId,
        id: this.propsData.id,
        data: {
          key: 'width',
          value: this.positionData.width,
        },
        type: 'position',
      })

      this.modify_canvasDataChild({
        fatherId: this.propsData.fatherId,
        id: this.propsData.id,
        data: {
          key: 'height',
          value: this.positionData.height,
        },
        type: 'position',
      })

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
    },
    mouseleave(e) {
      this.set_scaleFlag(false)
      e.target.style.zIndex = 1
      let node = e.target
      node.onmousemove = null

      //缩放结束后，更新渲染树在store中的数据
      this.modify_canvasDataChild({
        fatherId: this.propsData.fatherId,
        id: this.propsData.id,
        data: {
          key: 'width',
          value: this.positionData.width,
        },
        type: 'position',
      })

      this.modify_canvasDataChild({
        fatherId: this.propsData.fatherId,
        id: this.propsData.id,
        data: {
          key: 'height',
          value: this.positionData.height,
        },
        type: 'position',
      })

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
    },
  },
}
</script>

<style lang="less" scoped>
.select-component {
  position: relative;

  .menu {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    left: calc(100% + 70px);
    top: 50%;
    transform: translate(0, -50%) scale(1, 0);
    transition: transform 0.8s, opacity.5s;
  }

  .menu-action {
    pointer-events: all;
    opacity: 1;
    transform: translate(0, -50%) scale(1, 1);
  }

  span {
    position: absolute;
    background-color: transparent;
    z-index: 3;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 25%;
      height: 25%;
      background-color: skyblue;
      opacity: 0.4;
    }
  }

  .show {
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    background-color: transparent;
    transition: background-color 0.5s, opacity 0.5s;
  }

  .action {
    z-index: 2;
    opacity: 0.3;
    background-color: skyblue;
  }

  .enter {
    z-index: 2;
    background-color: skyblue;
    cursor: move;
  }

  .down {
    z-index: 2;
    background-color: rgb(82, 147, 172) !important;
  }
}

.isMove {
  pointer-events: none;
}
</style>
