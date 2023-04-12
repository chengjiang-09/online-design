<template>
  <div
    class="coverage-card"
    :class="[{ action: action }]"
    @click="selectThis(chart)"
  >
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CoverageCard',
  props: {
    chart: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      targetChart: (state) => state.other.targetChart, //鼠标点击到的组件
    }),
    action: {
      get() {
        return this.targetChart === this.chart.id
      },
    },
  },
  methods: {
    ...mapActions({
      set_targetChart: 'other/set_targetChart',
      set_configureList: 'charts/set_configureList',
    }),
    selectThis(chart) {
      this.set_targetChart(chart.id)
      this.set_configureList({
        id: chart.id,
        fatherId: chart.fatherId,
        default: chart.default,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.coverage-card {
  cursor: pointer;
  width: 99%;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  margin-left: 2px;
  margin-top: 5px;

  .container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}

.action {
  background-color: #d3d3d3;
}
</style>
