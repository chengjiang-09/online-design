<template>
  <div
    class="design-layout"
    :style="{
      height: `${thisNewHeight}%`,
    }"
    @mousedown.self="selectThis"
  >
    <div class="container" @mousedown.self="selectThis">
      <component
        v-for="obj in propsData.children"
        :id="obj.id"
        :key="obj.id"
        :is="obj.component"
        :props="obj"
      ></component>
    </div>
    <div
      v-if="!actualReading"
      class="show"
      @mousedown.self="selectThis"
      :class="[{ action: action }]"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import layoutBox from './components/layoutBox.config'
import { deepCopy } from '@/utils/utils'
import LayoutBox from './components/layoutBox.vue'
export default {
  name: 'DesignLayout',
  components: {
    LayoutBox,
  },
  props: {
    props: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  watch: {
    props: {
      handler: function () {
        this.update()
      },
      deep: true,
    },
    layoutMode: {
      handler: function (newMode, oldMode) {
        //此判断oldMode是否存在，原因是用户使用缩放功能时，触发重排，oldMode会为空，导致children重复
        if (
          this.props.children.length === 0 ||
          (oldMode && newMode !== oldMode)
        ) {
          switch (this.layoutMode) {
            case 'scattered':
              this.isScattered()
              break
            case 'leftAndRight':
              this.isLeftAndRight()
              break
            case 'grid':
              break
            default:
              break
          }
          this.set_layoutChild(this.children)
          this.set_targetChart(this.children[0].id)
        }
      },
    },
  },
  computed: {
    ...mapState({
      targetChart: (state) => state.other.targetChart,
      actualReading: (state) => state.other.actualReading,
    }),
    action: {
      get() {
        return this.targetChart === this.propsData.id
      },
    },
  },
  data: function () {
    return {
      propsData: {},
      styleData: {},
      layoutMode: '',
      children: [],
      thisNewHeight: '100',
    }
  },
  methods: {
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
      set_layoutChild: 'charts/set_layoutChild',
    }),
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
    //散布局模式
    isScattered() {
      this.children = []
      let date = Date.now()
      this.children.push(
        deepCopy({
          ...layoutBox,
          id: layoutBox.type + date,
          fatherId: this.propsData.id,
          layoutData: {
            id: this.propsData.id,
            default: this.propsData.default,
          },
          children: [],
          default: [
            {
              label: '',
              type: 'height',
              component: '',
              value: '100%',
            },
            {
              label: '',
              type: 'width',
              component: '',
              value: '100%',
            },
          ],
        }),
      )
    },
    //左右布局模式
    isLeftAndRight() {
      this.children = []
      for (let i = 0; i < 2; i++) {
        let date = Date.now()
        this.children.push(
          deepCopy({
            ...layoutBox,
            id: layoutBox.type + date + i,
            layoutData: {
              id: this.propsData.id,
              default: this.propsData.default,
            },
            fatherId: this.propsData.id,
            children: [],
            default: [
              {
                label: '',
                type: 'height',
                component: '',
                value: '100%',
              },
              {
                label: '',
                type: 'width',
                component: '',
                value: '50%',
              },
            ],
          }),
        )
      }
    },
    //初始化函数
    update() {
      this.propsData = this.props
      this.props.default.forEach((obj) => {
        if (obj.type === 'configure') {
          obj.configure.forEach((config) => {
            if (config.type === 'item') {
              this.layoutMode = config.value
            }
          })
        }
      })
      if (this.props.newHeight) {
        this.thisNewHeight = this.props.newHeight
      }
    },
  },
  created() {
    this.update()
  },
}
</script>

<style lang="less" scoped>
.design-layout {
  position: relative;
  width: 100%;
  height: 100%;
  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
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
    z-index: 3;
    background-color: skyblue;
  }
}
</style>
