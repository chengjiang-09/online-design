<template>
  <div
    id="ActualReadingView"
    :style="{
      width: `${canvasData.width}px`,
      height: `${canvasData.height}px`,
    }"
  >
    <div
      class="container"
      :style="{
        width: `${canvasData.width}px`,
        height: `${canvasData.height}px`,
      }"
    >
      <div
        class="canvas"
        :style="{
          width: `${canvasData.width}px`,
          height: `${canvasData.height}px`,
          backgroundColor: `${canvasData.backgroundColor}`,
          fontSize: `${canvasData.fontSize}px`,
          color: `${canvasData.color}`,
        }"
      >
        <img
          v-if="canvasData.backgroundImage"
          :src="canvasData.backgroundImage"
          class="canvas-img"
          :style="{
            width: `${canvasData.width}px`,
            height: `${canvasData.height}px`,
            opacity: canvasData.opacity,
          }"
        />
        <component
          v-for="obj in canvasData.children"
          :key="obj.type + Date.now()"
          :id="obj.id"
          :is="obj.component"
          :props="obj"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ActualReadingView',
  data: function () {
    return {
      canvasData: {},
    }
  },
  methods: {
    ...mapActions({
      set_actualReading: 'other/set_actualReading',
      set_actualReadingCanvas: 'other/set_actualReadingCanvas',
    }),
  },
  created() {
    this.set_actualReading(true)
    this.canvasData =
      this.$store.state.other.actualReadingCanvas ||
      this.$ls.get('SET_ACTUAL_READING_CANVAS')
    this.$ls.set(`DATA_FROM_PARAM`, {})
  },
  beforeDestroy() {
    this.set_actualReading(false)
    this.set_actualReadingCanvas({})
    this.$ls.set('SET_ACTUAL_READING_CANVAS', '')
  },
}
</script>

<style lang="less" scoped>
#ActualReadingView {
  width: 100%;
  height: 100%;
  overflow-x: scroll;

  .container {
    width: 100%;
    height: 100%;

    .canvas {
      position: absolute;
      background-color: transparent;
      z-index: 2;
      top: 0;
      left: 0;
      box-sizing: border-box;
      // overflow: hidden;

      &-img {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        pointer-events: none;
      }
    }
  }
}
</style>
