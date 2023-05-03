<template>
  <div class="json-edit-view" ref="edit">
    <div class="container">
      <i class="el-icon-close icon" @click="close"></i>
      <div
        class="move"
        @mousedown="startMove"
        @mousemove="mousemove"
        @mouseleave="mouseleave"
        @mouseup="mouseup"
      >
        {{ title }}
      </div>
      <b-code-editor
        :value="jsonData"
        @on-change="onJsonChange"
        ref="editor"
        :indent-unit="4"
        height="700px"
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
    title: {
      type: String,
      default: '标题',
    },
  },
  computed: {
    jsonData: {
      get() {
        return JSON.stringify(this.jsonDataProp, null, 2)
      },
      set(value) {
        return value
      },
    },
  },
  data: function () {
    return {
      timer: null,
      offsetX: 0,
      offsetY: 0,
      start: false,
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
    startMove(e) {
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY

      this.start = true
    },
    mousemove(e) {
      if (this.start) {
        let left = e.offsetX - this.offsetX
        let top = e.offsetY - this.offsetY

        this.$refs.edit.style.left = `${this.$refs.edit.offsetLeft + left}px`
        this.$refs.edit.style.top = `${this.$refs.edit.offsetTop + top}px`
      }
    },
    mouseleave() {
      this.start = false
    },
    mouseup() {
      this.start = false
    },
    onJsonChange(value) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (!this.isJSON(value)) {
          this.$message({
            showClose: true,
            message: 'json格式错误',
            type: 'warning',
          })
          return false
        }
        this.$emit('changeData', {
          value: JSON.parse(value),
          originValue: this.jsonDataProp,
        })
      }, 1500)
    },
    close() {
      this.$emit('close', false)
    },
  },
}
</script>

<style lang="less">
.json-edit-view {
  position: fixed;
  left: -500px;
  top: 70px;
  width: 24vw;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 50px 10px 20px;
  .container {
    width: 100%;
    height: 100%;
    position: relative;

    .icon {
      position: absolute;
      right: 10px;
      top: -35px;
      width: 30px;
      height: 30px;
      font-size: 24px;
      z-index: 5;
      cursor: pointer;
    }

    .move {
      position: absolute;
      right: 10px;
      top: -45px;
      width: 100%;
      height: 50px;
      font-size: 24px;
      cursor: move;

      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 800;
      padding-left: 20px;
    }
  }
}
</style>
