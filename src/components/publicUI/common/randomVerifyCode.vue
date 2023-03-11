<template>
  <div class="random-verify-code" @click="createdCode">
    <canvas
      id="verifyCodeCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<script>
import { randomStr, randomRgb, randomNum } from '@/utils/utils'
export default {
  name: 'RandomVerifyCode',
  props: {
    lineColorMin: {
      type: Number,
      default: 100,
    },
    lineColorMax: {
      type: Number,
      default: 255,
    },
    fontSizeMin: {
      type: Number,
      default: 25,
    },
    fontSizeMax: {
      type: Number,
      default: 30,
    },
    colorMin: {
      type: Number,
      default: 0,
    },
    colorMax: {
      type: Number,
      default: 160,
    },
    canvasWidth: {
      type: Number,
      default: 120,
    },
    canvasHeight: {
      type: Number,
      default: 34,
    },
    codeNum: {
      type: Number,
      default: 4,
    },
  },
  mounted() {
    this.createdCode()
  },
  data: function () {
    return {
      code: '',
    }
  },
  methods: {
    //生成随机串
    createdCode() {
      this.code = randomStr(this.codeNum)
      this.$emit('getVerifyCode', this.code)
      this.drawCanvas()
    },
    drawCanvas() {
      const canvas = document.querySelector('#verifyCodeCanvas')
      const ctx = canvas.getContext('2d')
      ctx.textBaseLine = 'bottom'
      //绘制背景
      ctx.fillStyle = randomRgb(255, 255)
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
      //绘制文字
      for (let i = 0; i < this.code.length; i++) {
        this.drawText(ctx, this.code[i], i)
      }
      this.drawLine(ctx)
      this.drawDot(ctx)
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = randomRgb(this.colorMin, this.colorMax)

      ctx.font = randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      //x,y轴以及旋转偏移量
      const x = (i + 1) * (this.canvasWidth / (this.code.length + 1))
      const y = randomNum(this.fontSizeMax, this.canvasHeight - 5)
      var deg = randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    },
    //绘制干扰线
    drawLine(ctx) {
      //设置绘笔颜色
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = randomRgb(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(
          randomNum(0, this.canvasWidth),
          randomNum(0, this.canvasHeight),
        )
        ctx.lineTo(
          randomNum(0, this.canvasWidth),
          randomNum(0, this.canvasHeight),
        )
        ctx.stroke()
      }
    },
    //绘制干扰点
    drawDot(ctx) {
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = randomRgb(0, 255)
        ctx.beginPath()
        ctx.arc(
          randomNum(0, this.canvasWidth),
          randomNum(0, this.canvasHeight),
          1,
          0,
          2 * Math.PI,
        )
        ctx.fill()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.random-verify-code {
  cursor: pointer;
}
</style>
