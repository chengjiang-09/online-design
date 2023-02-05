<template>
  <div
    class="design-title"
    @mousedown="selectThis"
    :style="{
      backgroundColor: styleData.backgroundColor,
      fontSize: styleData.fontSize,
      color: styleData.color,
      height: `${styleData.height}%`,
    }"
  >
    <div class="container" @mousedown="selectThis"></div>
    <img
      v-if="styleData.backgroundImage"
      :src="styleData.backgroundImage"
      :style="{
        opacity: styleData.opacity,
      }"
      @mousedown="selectThis"
    />
    <div
      v-if="!actualReading"
      class="show"
      :class="[{ action: action }]"
      @dragenter.self="dragenter"
      @dragover.self="dragover"
      @drop.self="drop"
      @mousedown="selectThis"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import { deepCopy } from '@/utils/utils'
export default {
  name: 'DesignTitle',
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
  },
  created() {
    this.update()
  },
  computed: {
    ...mapState({
      targetChart: (state) => state.other.targetChart,
      chartsTypeList: (state) => state.charts.chartsTypeList,
      templateData: (state) => state.other.templateData,
      layoutTypeList: (state) => state.charts.layoutTypeList,
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
      //需要给定初始值，才能保证样式的动态渲染
      styleData: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backgroundImage: '',
        color: '#000000',
        fontSize: '16',
        opacity: '0.5',
        title: '容器标题',
        height: '10',
      },
      layoutMode: false,
    }
  },
  methods: {
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
      add_chart: 'charts/add_chart',
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
    update() {
      this.propsData = this.props
      this.propsData.default.forEach((obj) => {
        if (obj.type === 'configure') {
          obj.configure.forEach((style) => {
            this.styleData[style.type] = style.value
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.design-title {
  position: relative;
  width: 100%;
  height: 10%;
  background-color: #000000;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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
