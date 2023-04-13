<template>
  <div
    class="design-panel"
    :id="propsData.id"
    :style="{
      height: `${thisNewHeight}%`,
    }"
    @mousedown.self="selectThis"
  >
    <div
      class="container"
      :style="{
        backgroundColor: styleData.backgroundColor,
        fontSize: styleData.fontSize,
        color: styleData.color,
      }"
      @dragenter.self="dragenter"
      @dragover.self="dragover"
      @drop.self="drop"
      @mousedown.self="selectThis"
    >
      <div
        class="container-box"
        @dragenter.self="dragenter"
        @dragover.self="dragover"
        @drop.self="drop"
        @mousedown.self="selectThis"
      >
        <component
          v-for="(obj, index) in propsData.children"
          :id="obj.id"
          :key="obj.id"
          :is="obj.component"
          :props="obj"
          :fatherNodeId="propsData.id"
          :style="{
            zIndex: propsData.children.length - index,
          }"
        ></component>
      </div>
    </div>
    <img
      v-if="styleData.backgroundImage"
      :src="styleData.backgroundImage"
      @mousedown.self="selectThis"
      :style="{
        opacity: styleData.opacity,
      }"
    />
    <div
      v-if="!actualReading"
      class="show"
      :class="[{ action: action }]"
      @dragenter.self="dragenter"
      @dragover.self="dragover"
      @drop.self="drop"
      @mousedown.self="selectThis"
    ></div>
  </div>
</template>

<script>
//panel组件
import { mapActions, mapState } from 'vuex'
import { panelBlacklist } from '@/utils/blacklist'
import { deepCopy } from '@/utils/utils'
export default {
  name: 'DesignPanel',
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
  created() {
    this.update()
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
      },
      layoutMode: false,
      thisNewHeight: '100',
      //panel和layout默认100%height，当插入title后，改变height
      newHeight: '',
    }
  },
  methods: {
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
      add_chart: 'charts/add_chart',
      set_coverageArray: 'charts/set_coverageArray',
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
        this.set_coverageArray(this.propsData.id)
      }
    },
    dragenter() {},
    dragover(e) {
      e.preventDefault()
    },
    drop(e) {
      e.stopPropagation()
      e.preventDefault()

      //以下操作是为了限制当用户插入普通组件后，将不允许插入布局组件
      //当用户插入布局组件后，同时也将不允许插入普通组件
      if (
        this.propsData.children.length > 0 &&
        this.layoutTypeList.includes(this.propsData.children[0].type)
      ) {
        this.layoutMode = true
      } else {
        this.layoutMode = false
      }

      if (this.layoutMode) {
        this.data = e.dataTransfer.getData('layout')
      } else {
        // 动态找到传递的拖拽dragStart传递键值，从而找到对应的模板数据
        let length = this.chartsTypeList.length
        for (let i = 0; i < length; i++) {
          this.data = e.dataTransfer.getData(this.chartsTypeList[i])
          if (this.data) {
            if (
              this.propsData.children.length > 0 &&
              !this.layoutMode &&
              this.chartsTypeList[i] === 'layout'
            ) {
              this.data = ''
            }
            break
          }
        }
      }
      //限制黑名单中的组件插入
      if (this.data) {
        if (!panelBlacklist.includes(this.templateData[this.data].type)) {
          if (
            this.propsData.children.length !== 0 &&
            this.propsData.children[0].type === 'title'
          ) {
            this.newHeight = '90'
          }
          let date = Date.now()
          //插入子组件
          this.add_chart(
            deepCopy({
              ...this.templateData[this.data],
              id: this.templateData[this.data].type + date,
              fatherId: this.propsData.id,
              newHeight: this.newHeight,
              children: [],
            }),
          )
          this.set_targetChart(this.templateData[this.data].type + date)
        } else {
          this.$message({
            message: `${
              this.templateData[this.data].label
            }插入错误，或违规插入`,
            type: 'warning',
          })
        }
      } else {
        if (this.layoutMode) {
          this.$message({
            message: `当已插入布局组件后，将不能插入普通组件`,
            type: 'warning',
          })
        } else {
          this.$message({
            message: `当已插入普通组件后，将不能插入布局组件`,
            type: 'warning',
          })
        }
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
      if (this.props.newHeight) {
        this.thisNewHeight = this.props.newHeight
      }
    },
  },
}
</script>

<style lang="less" scoped>
.design-panel {
  position: relative;
  width: 100%;
  height: 100%;
  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &-box {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
    }
  }

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
