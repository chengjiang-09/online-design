<template>
  <div class="layout-box" :style="styleData" @mousedown.self="selectThis">
    <div
      class="container"
      @dragenter.self="dragenter"
      @dragover.self="dragover"
      @drop.self="drop"
      @mousedown.self="selectThis"
    >
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
      :class="[{ action: action }]"
      @dragenter.self="dragenter"
      @dragover.self="dragover"
      @drop.self="drop"
      @mousedown.self="selectThis"
    ></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { layoutBlacklist } from '@/utils/blacklist'
export default {
  name: 'LayoutBox',
  props: {
    props: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  created() {
    this.propsData = this.props
    this.props.default.forEach((obj) => {
      this.styleData[obj.type] = obj.value
    })
  },
  computed: {
    ...mapState({
      targetChart: (state) => state.other.targetChart,
      templateData: (state) => state.other.templateData,
      actualReading: (state) => state.other.actualReading,
    }),
    action: {
      get() {
        return this.targetChart === this.propsData.id
      },
    },
  },
  watch: {
    props: {
      handler: function () {
        console.log('layout-box')
        this.propsData = this.props
      },
      deep: true,
    },
  },
  data: function () {
    return {
      propsData: {},
      styleData: {
        width: '0',
        height: '0',
      },
      //panel和layout默认100%height，当插入title后，改变height
      newHeight: '',
    }
  },
  methods: {
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
      add_chart: 'charts/add_chart',
    }),
    selectThis() {
      if (!this.actualReading) {
        this.set_targetChart(this.propsData.id)
        this.set_configureList({
          ...this.propsData.layoutData,
          fatherId: this.propsData.fatherId,
        })
      }
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
        if (!layoutBlacklist.includes(this.templateData[data].type)) {
          if (
            this.propsData.children.length !== 0 &&
            this.propsData.children[0].type === 'title'
          ) {
            this.newHeight = '90'
          }
          let date = Date.now()
          this.add_chart(
            deepCopy({
              ...this.templateData[data],
              id: this.templateData[data].type + date,
              fatherId: this.propsData.id,
              newHeight: this.newHeight,
              children: [],
            }),
          )
          this.set_targetChart(this.templateData[data].type + date)
        } else {
          this.$message({
            message: `${this.templateData[data].type}插入错误，或违规插入`,
            type: 'warning',
          })
        }
      } else {
        this.$message({
          message: '请先使用panel组件进行布局后，再使用普通组件',
          type: 'warning',
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.layout-box {
  position: relative;
  width: 100%;
  height: 100%;
  .container {
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
