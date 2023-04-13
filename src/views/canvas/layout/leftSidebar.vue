<template>
  <div
    id="LeftSidebar"
    :class="[{ leftSidebarClose: !leftSidebarOpened }]"
    :style="{
      minWidth: `${minWidth}px`,
      minHeight: `${minHeight}px`,
    }"
  >
    <div class="close-open" @click="leftSidebarControl"></div>
    <div class="container">
      <div class="top">
        <div class="charts">
          <div class="charts-title">
            <h2>组件库</h2>
            <el-input
              placeholder="请输入需要查找的组件信息"
              v-model="selectChart"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="charts-list">
            <ItemList :items="allCharts" />
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="layer">
          <div class="layer-title">
            <h2>图层</h2>
          </div>
          <div class="layer-coverage">
            <div class="layer-coverage-container">
              <Draggable
                v-model="coverageArray"
                group="chart"
                v-if="coverageArray"
                @start="drag = true"
                @end="drag = false"
              >
                <transition-group>
                  <CoverageCard
                    v-for="chart in coverageArray"
                    :key="chart.id"
                    :chart="chart"
                  >
                    {{ chart.label }}({{ chart.id }})
                  </CoverageCard>
                </transition-group>
              </Draggable>
              <div v-else class="coverage-empty">空</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { styleMixin } from '@/mixins/styleControl'
import ItemList from '@/views/canvas/layout/components/itemList.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import CoverageCard from './components/coverageCard.vue'
export default {
  name: 'LeftSidebar',
  mixins: [styleMixin], //全局样式state混入
  data: function () {
    return {
      selectChart: '',
      minWidth: 0,
      minHeight: 0,
    }
  },
  components: {
    ItemList,
    CoverageCard,
    Draggable,
  },
  //监听模式变化控制侧边栏展开
  watch: {
    operatingMode: function () {
      this.leftSidebarControl()
    },
  },
  computed: {
    ...mapState({
      allCharts: (state) => state.charts.allCharts,
      coverageArrayStore: (state) => state.charts.coverageArray.array,
    }),
    coverageArray: {
      get() {
        return this.coverageArrayStore
      },
      set(value) {
        this.UPDATE_COVERAGE_ARRAY(value)
      },
    },
  },
  methods: {
    ...mapMutations({
      UPDATE_COVERAGE_ARRAY: 'charts/UPDATE_COVERAGE_ARRAY',
    }),
    ...mapActions({
      set_leftSidebar: 'app/set_leftSidebar',
    }),
    //侧边栏展开控制
    leftSidebarControl() {
      if (this.operatingMode !== 'editMode') {
        return this.set_leftSidebar(false)
      }

      this.set_leftSidebar(!this.leftSidebarOpened)
    },
  },
  mounted() {
    this.minWidth = (window.screen.width / 1560) * 165
    this.minHeight = (window.screen.height / 864) * 56
  },
}
</script>

<style lang="less" scoped>
@borderColor: #d3d3d3;
#LeftSidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 20vw;
  min-width: 235px;
  height: 100vh;
  transform: translateX(0);
  transition: transform 1s;
  z-index: 101;

  .close-open {
    position: absolute;
    right: 0;
    top: 40%;
    width: 90px;
    height: 45px;
    background-color: #f6f6f6;
    border: 1px solid @borderColor;
    z-index: -1;
    transition: transform 1s;
    transform: translateX(30px);
    border-radius: 45px;
    cursor: pointer;

    &:hover {
      transform: translateX(60px);
    }
  }

  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 100;
    background-color: #fcfcfc;
    border-radius: 0 18px 18px 0;
    border-right: 5px solid #f6f6f6;

    .top {
      width: 100%;
      height: 60vh;

      .charts {
        width: 100%;
        height: 100%;
        border: 1px solid #d3d3d3;
        border-radius: 0 18px 18px 0;

        &-title {
          width: 100%;
          height: 15%;
          display: flex;
          flex-direction: column;
          h2 {
            margin: 10px 12.5px;
            font-size: 16px;
          }
        }

        &-list {
          width: 100%;
          height: 85%;
        }
      }
    }

    .bottom {
      width: 100%;
      height: 40vh;
      padding: 2px 0 0px;

      .layer {
        width: 100%;
        height: 100%;
        border: 1px solid #d3d3d3;
        border-radius: 0 18px 18px 0;

        &-title {
          width: 100%;
          height: 10%;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #d3d3d3;

          h2 {
            margin: 10px 12.5px;
            font-size: 16px;
          }
        }
        &-coverage {
          width: 100%;
          height: 90%;
          overflow: hidden;
          overflow-y: scroll;
          &-container {
            width: 100%;
            display: flex;
            flex-direction: column-reverse;

            .coverage-empty {
              width: 100%;
              height: 200px;
              font-size: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
}

.leftSidebarClose {
  transform: translateX(-100%) !important;
}
</style>
