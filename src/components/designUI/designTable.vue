<template>
  <div
    class="design-table"
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
      height: `${manager ? 300 : positionData.height}px`,
      left: `${positionData.left}px`,
      top: `${positionData.top}px`,
    }"
  >
    <div
      class="box"
      :style="{
        width: `${manager ? 400 : positionData.width}px`,
        height: `${manager ? 300 : positionData.height}px`,
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
        <div>
          <el-table
            :height="positionData.height"
            class="table"
            ref="table"
            :class="[{ edit: edit }]"
            :data="dataFrom.tableData"
            :style="{
              width: `${positionData.width}px`,
              '--header-color': styleData.headerColor,
              '--tr-color': styleData.trColor,
              '--tr-bg-color': styleData.trBgColor,
              '--header-bg-color': styleData.headerBgColor,
            }"
          >
            <el-table-column
              v-for="header in dataFrom.headerData"
              :key="header.prop"
              :prop="header.prop"
              :label="header.label"
            >
            </el-table-column>
          </el-table>
        </div>
      </SelectComponent>
      <el-table
        v-else
        :height="positionData.height"
        class="table"
        ref="table"
        :data="dataFrom.tableData"
        :style="{
          width: `${manager ? 400 : positionData.width}px`,
          '--header-color': styleData.headerColor,
          '--tr-color': styleData.trColor,
          '--tr-bg-color': styleData.trBgColor,
          '--header-bg-color': styleData.headerBgColor,
        }"
      >
        <el-table-column
          v-for="header in dataFrom.headerData"
          :key="header.prop"
          :prop="header.prop"
          :label="header.label"
        >
        </el-table-column>
      </el-table>
      <div class="loading" v-if="loading">
        <i class="el-icon-loading"></i>
      </div>
    </div>
  </div>
</template>

<script>
import SelectComponent from '@/components/designUI/components/selectComponent.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import goBackListType from '@/utils/goBackListType'
import { dataFromApi } from '@/apis/publicApi'
import { DATA_FROM_EX_TIME } from '@/utils/expirationTime'

const BASE_TIME = 1000
export default {
  name: 'DesignTable',
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
    // switch (this.operatingMode) {
    //   case 'editMode':
    //     this.edit = true //这三个值都是为了在编辑模式以及阅览模式中限制组件的某些功能，例如mousedown事件
    //     break
    //   case 'readingMode':
    //     this.edit = false
    //     this.enter = false
    //     this.down = false
    //     break
    //   default:
    //     break
    // }
    this.startInterval()
  },
  beforeDestroy() {
    try {
      this.bodyWrapper.removeEventListener('mouseenter', this.enterWrapper)
      this.bodyWrapper.removeEventListener('mouseleave', this.leaveWrapper)
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },
  watch: {
    props: {
      handler: function () {
        this.update()
      },
      deep: true,
    },
    operatingMode: {
      handler: function (newData) {
        switch (newData) {
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
      dataFromAll: (state) => state.charts.dataFromAll,
    }),
    action: {
      get() {
        return this.targetChart === this.propsData.id
      },
    },
    dataFrom: {
      get() {
        if (!this.dataFromFlag) {
          this.startInterval()
          return {
            headerData: this.staticValue.headerData,
            tableData: this.staticValue.tableData,
          }
        } else {
          this.startInterval()
          return {
            headerData: this.dynamicData ? this.dynamicData.headerData : [],
            tableData: this.dynamicData ? this.dynamicData.tableData : [],
          }
        }
      },
    },
  },
  data: function () {
    return {
      stopScroll: false,
      bodyWrapper: null,
      staticValue: { headerData: [], tableData: [] },
      dynamicData: {
        headerData: [],
        tableData: [],
      },
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
      font: '',
      styleData: {
        headerColor: '#000000',
        trColor: '#000000',
        headerBgColor: 'rgba(0, 0, 0, 0)',
        trBgColor: 'rgba(0, 0, 0, 0)',
        fontSize: '16',
        opacity: '1',
      },
      dataFromFlag: false,
      loading: false,
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
      set_dataFromAll: 'charts/set_dataFromAll',
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
        } else if (obj.type === 'dataFrom') {
          obj.configure.forEach(async (config) => {
            if (config.type === 'staticData') {
              this.staticValue = config.jsonData
            } else if (config.jsonData) {
              this.dataFromFlag = config.jsonData.select
                ? config.jsonData.select
                : false
              //下面一系列判断用于限制数据源请求次数，避免多次请求
              if (config.jsonData.select) {
                try {
                  const param = this.$ls.get(`DATA_FROM_PARAM`)
                  if (
                    config.value &&
                    (!param[this.propsData.id] ||
                      JSON.stringify(param[this.propsData.id]) !==
                        JSON.stringify({
                          url: config.value,
                          methods: config.jsonData.methods,
                          param: config.jsonData.param,
                        }) ||
                      !this.dataFromAll[this.propsData.id])
                  ) {
                    this.$ls.set(
                      `DATA_FROM_PARAM`,
                      {
                        ...param,
                        [this.propsData.id]: {
                          url: config.value,
                          methods: config.jsonData.methods,
                          param: config.jsonData.param,
                        },
                      },
                      DATA_FROM_EX_TIME,
                    )
                    this.loading = true
                    const { data, code } = await dataFromApi(
                      config.value,
                      config.jsonData.methods ? config.jsonData.methods : 'GET',
                      config.jsonData.param ? config.jsonData.param : {},
                    )
                    if (code === 1) {
                      this.loading = false
                      await this.set_dataFromAll({
                        key: this.propsData.id,
                        data,
                      })

                      this.dynamicData = data
                    }
                  } else {
                    this.dynamicData = this.dataFromAll[this.propsData.id]
                  }
                  // eslint-disable-next-line no-empty
                } catch (e) {}
              }
            }
          })
        }
      })
    },
    startInterval() {
      try {
        this.$nextTick(() => {
          if (!this.bodyWrapper && this.$refs['table']) {
            this.bodyWrapper = this.$refs['table'].$el.querySelector(
              '.el-table__body-wrapper',
            )
            this.bodyWrapper.addEventListener('mouseenter', this.enterWrapper)

            this.bodyWrapper.addEventListener('mouseleave', this.leaveWrapper)
          }

          this.start()
        })
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    enterWrapper() {
      this.stopScroll = true
    },
    leaveWrapper() {
      this.stopScroll = false
    },
    async start() {
      if (this.dataFrom.tableData && this.dataFrom.tableData.length > 0) {
        for (const data of this.dataFrom.tableData) {
          await this.tableScrollToRow(this.$refs['table'], data)
        }
        this.start()
      }
    },
    tableScrollToRow($table, rowData) {
      return new Promise((resolve) => {
        try {
          let rowIndex = $table.data.indexOf(rowData)
          const tr = this.bodyWrapper.querySelectorAll('tr')[rowIndex]
          if (!this.bodyWrapper || !tr) {
            return
          }
          this.bodyWrapper.style.scrollBehavior = 'smooth'
          this.bodyWrapper.scrollTop = tr.offsetTop

          let timer = setInterval(() => {
            if (!this.stopScroll) {
              resolve(clearInterval(timer))
            }
          }, BASE_TIME)
          // eslint-disable-next-line no-empty
        } catch (e) {}
      })
    },
  },
}
</script>

<style lang="less">
.design-table {
  position: absolute;
  z-index: 2;

  .box {
    position: relative;

    .table {
      --header-color: #000000;
      --tr-color: #000000;
      --tr-bg-color: transparent;
      --header-bg-color: transparent;

      .el-table__body-wrapper {
        background-color: var(--tr-bg-color);
      }

      .el-table__header-wrapper {
        background-color: var(--header-bg-color);
      }

      th {
        color: var(--header-color);
      }

      tr {
        color: var(--tr-color);
      }
    }

    .edit {
      pointer-events: none !important;
    }

    .loading {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 100px;
        color: #ffffff;
      }
    }

    .el-table {
      background-color: transparent !important;
      .el-table__body-wrapper {
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          background-color: transparent;
        }
      }
      th,
      tr {
        background-color: transparent !important;
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
