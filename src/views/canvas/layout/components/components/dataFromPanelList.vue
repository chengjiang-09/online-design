<template>
  <div id="dataFromPanelList">
    <el-collapse v-model="activeName" class="container">
      <el-collapse-item
        v-for="(configure, index) in configureArray"
        :class="[{ action: [configure.id === targetChart] }]"
        :key="configure.id"
        :title="configure.id"
        :name="index"
        @mouseenter.native="selectThis(configure)"
      >
        <DataFromList v-if="configure.isChart" :configure="configure" />
        <ConfigureList v-else :configure="configure" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import DataFromList from './dataFromList.vue'
import ConfigureList from './configureList.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DataFromPanelList',
  components: {
    DataFromList,
    ConfigureList,
  },
  computed: {
    //这里使用图层数据拿到当前图层的数据源
    ...mapState({
      coverageArrayStore: (state) => state.charts.coverageArray,
      fatherId: (state) => state.charts.coverageArray.fatherId,
      targetChart: (state) => state.other.targetChart, //鼠标点击到的组件
    }),
    configureArray: {
      get() {
        return this.coverageArrayStore.array
          ? this.coverageArrayStore.array.map((chart) => {
              let configure = {}
              let type = ''
              let isChart = /chart/.test(chart.type.toLowerCase())
              chart.default.forEach((defaultData) => {
                if (defaultData.label == '数据源配置') {
                  configure = defaultData.configure
                  type = defaultData.type
                }
              })
              return {
                list: configure,
                fatherId: this.fatherId,
                id: chart.id,
                type,
                componentType: chart.type,
                isChart,
              }
            })
          : []
      },
    },
  },
  data: function () {
    return {
      activeName: 0,
    }
  },
  methods: {
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_targetFather: 'other/set_targetFather',
    }),
    selectThis(chart) {
      this.set_targetChart(chart.id)
      this.set_targetFather(chart.fatherId)
    },
  },
}
</script>

<style lang="less" scoped>
#dataFromPanelList {
  width: 100%;
  padding-left: 5px;
  .container {
    width: 100%;
  }
}
</style>
