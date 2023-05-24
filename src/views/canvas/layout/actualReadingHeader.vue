<template>
  <div
    id="actualReadingHeader"
    :class="[{ actualReadingHeaderClose: !actualReadingHeaderOpened }]"
  >
    <div id="HeaderMenu">
      <div class="container">
        <div
          class="close-open"
          @click="onlineHeaderControl"
          v-loading="loading"
        ></div>
        <ul>
          <li
            v-for="obj in headerMenu"
            :key="obj.type"
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
import html2canvas from 'html2canvas'
import { randomStr } from '@/utils/utils'

const headerMenuList = [
  {
    type: 'loadImg',
    name: '下载成图',
  },
  {
    type: 'goHome',
    name: '去首页',
  },
]

export default {
  name: 'ActualReadingHeader',
  data: function () {
    return {
      headerMenu: headerMenuList,
      loading: false,
      actualReadingHeaderOpened: true,
      imgName: '',
    }
  },
  methods: {
    choice(e, type) {
      switch (type) {
        case 'loadImg':
          this.loadImg()
          break
        case 'goHome':
          this.$router.push({
            name: 'templateList',
          })
          break
        default:
          console.log(type, '该实现方法未存在')
          break
      }
    },
    async loadImg() {
      // 获取需要截图的DOM元素
      this.loading = true

      this.imgName = `${Date.now()}${randomStr(21)}.png`

      const ActualReadingViewCanvas = document.querySelector(
        '#ActualReadingViewCanvas',
      )
      const canvas = await html2canvas(ActualReadingViewCanvas, {
        useCORS: true,
      })

      canvas.toBlob(async (blob) => {
        const file = new File([blob], this.imgName, { type: 'image/png' })

        // 1. 生成一个Blob对象的URL
        const url = URL.createObjectURL(file)

        // 2. 创建一个<a>标签并设置其href属性为URL
        const a = document.createElement('a')
        a.href = url

        // 3. 设置<a>标签的download属性为文件名
        a.download = this.imgName

        // 4. 模拟单击<a>标签
        a.click()

        // 释放生成的URL对象
        URL.revokeObjectURL(url)

        this.loading = false
      })
    },
    onlineHeaderControl() {
      this.actualReadingHeaderOpened = !this.actualReadingHeaderOpened
    },
  },
}
</script>

<style lang="less" scoped>
#actualReadingHeader {
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
      }
    }
  }
}

.actualReadingHeaderClose {
  transform: translateY(-100%) !important;
}
</style>
