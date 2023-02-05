<template>
  <div id="OnlineHeader" :class="[{ onlineHeaderClose: !onlineHeaderOpened }]">
    <div id="HeaderMenu">
      <div class="container">
        <div class="close-open" @click="onlineHeaderControl"></div>
        <ul>
          <li
            v-for="obj in headerMenu"
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
import { getHeaderMenu } from '@/apis/charts'
import { mapActions } from 'vuex'
import { styleMixin } from '@/mixins/styleControl'
import { deepCopy, isEmpty } from '@/utils/utils'
import { HEADER_MENU_EX_TIME } from '@/utils/expirationTime'
export default {
  name: 'OnlineHeader',
  mixins: [styleMixin],
  data: function () {
    return {
      headerMenu: [],
    }
  },
  mounted() {
    this.getHeaderMenu()
  },
  watch: {
    //监听模式修改控制侧边栏是否允许开启
    operatingMode: function () {
      if (this.operatingMode === 'editMode') {
        return this.set_onlineHeader(true)
      }
      this.onlineHeaderControl()
    },
  },
  methods: {
    ...mapActions({
      set_OperatingMode: 'app/set_OperatingMode',
      set_onlineHeader: 'app/set_onlineHeader',
      set_editCanvasOpened: 'app/set_editCanvasOpened',
      set_targetChart: 'other/set_targetChart',
      set_actualReadingCanvas: 'other/set_actualReadingCanvas',
      add_canvasDataChild: 'charts/add_canvasDataChild',
    }),
    choice(e, type) {
      //限制只有阅览模式和编辑模式按钮拥有激活状态的style
      if (type === 'reading' || type === 'edit') {
        this.headerMenu.forEach((obj) => {
          obj.action = false
          if (obj.type === type) {
            obj.action = true
          }
        })
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
        case 'save':
          this.save()
          break
        case 'actualReading':
          this.actualReading()
          break
        case 'editCanvas':
          this.editCanvas()
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
      this.set_OperatingMode('readingMode')
    },
    revoke() {},
    redo() {
      this.$confirm('是否确定重置？重置将会清除所有已布局的组件。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.add_canvasDataChild([])
          this.$message({
            type: 'success',
            message: '重置成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置',
          })
        })
    },
    save() {
      this.set_actualReadingCanvas(
        deepCopy(this.$store.state.charts.canvasData),
      )
      this.$message({
        message: '保存成功',
        type: 'success',
      })
    },
    actualReading() {
      if (!isEmpty(this.$store.state.other.actualReadingCanvas)) {
        this.$router.push('/actualReading')
      } else {
        this.$message({
          message: '请保存后操作',
          type: 'warning',
        })
      }
    },
    editCanvas() {
      this.set_editCanvasOpened(true)
    },
    onlineHeaderControl() {
      this.set_onlineHeader(!this.onlineHeaderOpened)
    },
    //初始化头部导航列表，由后端数据动态给定选项个数，并保存在本地存储，有有效期，可查看utils/expirationTime.js
    async getHeaderMenu() {
      const headerMenu = this.$ls.get('HeaderMenu', null)
      if (!headerMenu) {
        const { data, message, status } = await getHeaderMenu()
        if (status === 0) {
          this.headerMenu = data.headerMenu.map((obj) => {
            obj.action = false
            return obj
          })
          this.headerMenu[0].action = true
          this.$ls.set('HeaderMenu', data.headerMenu, HEADER_MENU_EX_TIME)
        } else {
          this.$message({
            message: message,
            type: 'warning',
          })
        }
      } else {
        this.headerMenu = headerMenu.map((obj) => {
          obj.action = false
          return obj
        })
        this.headerMenu[0].action = true
      }
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
