<template>
  <div id="OnlineHeader" :class="[{ onlineHeaderClose: !onlineHeaderOpened }]">
    <div id="HeaderMenu">
      <div class="container">
        <div
          class="close-open"
          @click="onlineHeaderControl"
          v-loading="loading"
        ></div>
        <ul>
          <li
            v-for="obj in canvasHeaderMenu"
            :key="obj.type"
            :class="[{ action: obj.action }]"
            @click="choice($event, obj.type)"
          >
            {{ obj.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import html2canvas from 'html2canvas'
import { mapActions, mapState } from 'vuex'
import { styleMixin } from '@/mixins/styleControl'
import { deepCopy } from '@/utils/utils'
import goBackListType from '@/utils/goBackListType'
export default {
  name: 'OnlineHeader',
  mixins: [styleMixin],
  data: function () {
    return {
      headerMenu: [],
      loading: false,
    }
  },
  computed: {
    ...mapState({
      canvasHeaderMenu: (state) => state.charts.canvasHeaderMenu,
      canvasData: (state) => state.charts.canvasData,
      canvasConfigureList: (state) => state.charts.canvasConfigureList,
      goBcakArray: (state) => state.charts.goBcakArray,
    }),
  },
  methods: {
    ...mapActions({
      set_OperatingMode: 'app/set_OperatingMode',
      set_onlineHeader: 'app/set_onlineHeader',
      set_editCanvasOpened: 'app/set_editCanvasOpened',
      set_targetChart: 'other/set_targetChart',
      set_targetFather: 'other/set_targetFather',
      set_actualReadingCanvas: 'other/set_actualReadingCanvas',
      add_canvasDataChild: 'charts/add_canvasDataChild',
      set_submitCanvasOpened: 'app/set_submitCanvasOpened',
      update_canvasHeaderMenu: 'charts/update_canvasHeaderMenu',
      set_originCanvasConfigureList: 'other/set_originCanvasConfigureList',
      pop_goBackArray: 'charts/pop_goBackArray',
      modify_canvasDataChild: 'charts/modify_canvasDataChild',
      delete_chart: 'charts/delete_chart',
      gobackCoverage: 'charts/gobackCoverage',
      set_configureList: 'charts/set_configureList',
    }),
    choice(e, type) {
      //限制只有阅览模式和编辑模式按钮拥有激活状态的style
      if (type === 'reading' || type === 'edit') {
        this.update_canvasHeaderMenu({ type })
      }
      switch (type) {
        case 'edit':
          this.edit()
          break
        case 'reading':
          this.reading()
          break
        case 'revoke':
          this.revoke()
          break
        case 'redo':
          this.redo()
          break
        case 'actualReading':
          this.actualReading()
          break
        case 'editCanvas':
          this.editCanvas()
          break
        case 'complete':
          this.complete()
          break
        default:
          console.log(type, '该实现方法未存在')
          break
      }
    },
    edit() {
      this.set_OperatingMode('editMode')
    },
    reading() {
      this.set_targetChart('')
      this.set_targetFather(null)
      this.set_OperatingMode('readingMode')
    },
    async revoke() {
      let length = this.goBcakArray.length
      if (length > 0) {
        this.loading = true
        const goBackData = this.goBcakArray[length - 1]

        switch (goBackData.type) {
          case goBackListType.update:
            if (goBackData.fatherId) {
              goBackData.data.forEach(async (value) => {
                await this.modify_canvasDataChild({
                  fatherId: goBackData.fatherId,
                  id: goBackData.id,
                  data: value,
                  type: goBackData.defaultType,
                })
              })
            } else {
              this.modify_canvasData({
                id: goBackData.id,
                data: goBackData.data,
                type: goBackData.defaultType,
              })
            }
            console.log(goBackData.type)
            break
          case goBackListType.add:
            this.delete_chart({
              fatherId: goBackData.fatherId,
              id: goBackData.id,
            })
            this.set_targetChart('')
            this.set_targetFather(null)
            this.set_configureList(this.canvasConfigureList)
            console.log(goBackData.type)
            break
          case goBackListType.coverage:
            this.gobackCoverage({
              fatherId: goBackData.fatherId,
              data: goBackData.data,
            })
            console.log(goBackData.type)
            break
          case goBackListType.delete:
            console.log(goBackData.type)
            break
          default:
            break
        }
        await this.pop_goBackArray()
        this.loading = false
      }
    },
    redo() {
      this.$confirm('是否确定重置？重置将会清除所有已布局的组件。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.add_canvasDataChild([])
        })
        .catch(() => {})
    },
    async actualReading() {
      this.$confirm(
        '如果未保存，执行此操作修改将不会被记录, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(async () => {
          await this.set_actualReadingCanvas(deepCopy(this.canvasData))

          this.$router.push('/actualReading')
        })
        .catch(() => {})
    },
    editCanvas() {
      this.set_editCanvasOpened(true)
    },
    async complete() {
      await this.set_actualReadingCanvas(deepCopy(this.canvasData))
      await this.set_originCanvasConfigureList(
        deepCopy(this.canvasConfigureList),
      )
      await this.set_targetChart(null)
      await this.set_targetFather(null)
      this.set_submitCanvasOpened(true)
    },
    onlineHeaderControl() {
      this.set_onlineHeader(!this.onlineHeaderOpened)
    },
  },
}
</script>

<style lang="less" scoped>
#OnlineHeader {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 6%;
  background-color: transparent;
  border-bottom: 2px solid #f6f6f6;
  transform: translateY(0);
  transition: transform 1s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);

  #HeaderMenu {
    width: 50%;
    height: 100%;
    .container {
      position: relative;
      width: 100%;
      height: 100%;

      .close-open {
        position: absolute;
        height: 90px;
        width: 45px;
        left: 50%;
        bottom: 0;
        background-color: #f6f6f6;
        border: 1px solid #d3d3d3;
        z-index: -1;
        transition: transform 1s;
        transform: translateY(30px);
        border-radius: 22px;
        cursor: pointer;

        &:hover {
          transform: translateY(60px);
        }
      }

      ul {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 50vw;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        border-radius: 20px;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.5s;
          border-radius: 20px;
          backdrop-filter: blur(6px);

          &:hover {
            background-color: rgb(235, 235, 235);
          }
        }

        .action {
          background-color: rgb(235, 235, 235);
        }
      }
    }
  }
}

.onlineHeaderClose {
  transform: translateY(-100%) !important;
}
</style>
