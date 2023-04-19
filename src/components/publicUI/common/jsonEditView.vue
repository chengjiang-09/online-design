<template>
  <div class="json-edit-view">
    <div class="container">
      <i class="el-icon-close icon" @click="close"></i>
      <div class="move" @click="startMove"></div>
      <b-code-editor
        v-model="jsonData"
        :indent-unit="4"
        height="auto"
        theme="material-darker"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonEditView',
  props: {
    jsonDataProp: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    console.log(JSON.stringify(this.jsonDataProp, null, 2))
    this.jsonData = JSON.stringify(this.jsonDataProp, null, 2)
  },
  watch: {
    jsonDataProp: {
      handler: function () {
        this.jsonData = JSON.stringify(this.jsonDataProp, null, 2)
      },
      deep: true,
    },
  },
  data: function () {
    return {
      jsonData: '',
    }
  },
  methods: {
    isJSON(str) {
      if (typeof str == 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj == 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          return false
        }
      } else if (typeof str == 'object' && str) {
        return true
      }
    },
    customTimeFormat(time) {
      return time.toLocaleDateString()
    },
    startMove() {
      console.log('拖拽移动，暂时未实现')
    },
    onJsonChange(value) {
      if (!this.isJSON(value)) {
        this.$message({
          message: 'json格式错误',
          type: 'warning',
        })
        return false
      }
      this.$emit('changeData', {
        value: JSON.parse(value),
        originValue: this.jsonDataProp,
      })
    },
    close() {
      this.$emit('close', false)
    },
  },
}
</script>

<style lang="less" scoped>
.json-edit-view {
  position: fixed;
  left: -500px;
  top: 70px;
  width: 24vw;
  height: 70vh;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 10px 20px;
  .container {
    width: 100%;
    height: 100%;
    position: relative;

    .icon {
      position: absolute;
      right: 10px;
      top: -25px;
      width: 30px;
      height: 30px;
      font-size: 24px;
      z-index: 5;
      cursor: pointer;
    }

    .move {
      position: absolute;
      right: 10px;
      top: -30px;
      width: 100%;
      height: 30px;
      font-size: 24px;
      cursor: move;
    }
  }
}
</style>
