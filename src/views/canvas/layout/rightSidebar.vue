<template>
  <div
    id="RightSidebar"
    :class="[{ rightSidebarClose: !rightSidebarOpened }]"
    :style="{
      minWidth: `${minWidth}px`,
      minHeight: `${minHeight}px`,
    }"
  >
    <div class="close-open" @click="rightSidebarOpenedControl"></div>
    <div class="container">
      <div class="custom-configuration">
        <div class="custom-configuration-title">
          <h2>自定义配置</h2>
        </div>
        <div class="custom-configuration-list">
          <CustomConfigurationList
            :configure="configureList"
            :chartId="id"
            :fatherId="fatherId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { styleMixin } from '@/mixins/styleControl'
import CustomConfigurationList from '@/components/publicUI/customConfigurationList.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'RightSidebar',
  mixins: [styleMixin], //全局样式state混入
  components: {
    CustomConfigurationList,
  },
  data: function () {
    return {
      minWidth: 0,
      minHeight: 0,
    }
  },
  //监听模式变化控制侧边栏展开
  watch: {
    operatingMode: function () {
      this.rightSidebarOpenedControl()
    },
  },
  computed: {
    ...mapState({
      configureList: (state) => state.charts.configureList.default,
      id: (state) => state.charts.configureList.id,
      fatherId: (state) => state.charts.configureList.fatherId,
    }),
  },
  methods: {
    ...mapActions({
      set_rightSidebar: 'app/set_rightSidebar',
    }),
    //侧边栏展开控制
    rightSidebarOpenedControl() {
      if (this.operatingMode !== 'editMode') {
        return this.set_rightSidebar(false)
      }

      this.set_rightSidebar(!this.rightSidebarOpened)
    },
  },
  mounted() {
    //初始化时根据实际页面size设置侧边栏最小宽度
    this.minWidth = (window.screen.width / 1560) * 165
    this.minHeight = (window.screen.height / 864) * 56
  },
}
</script>

<style lang="less" scoped>
@borderColor: #d3d3d3;
#RightSidebar {
  position: fixed;
  right: 0;
  top: 0;
  width: 20vw;
  min-width: 235px;
  height: 100vh;
  transform: translateX(0);
  transition: transform 1s;
  z-index: 101;

  .close-open {
    position: absolute;
    left: 0;
    top: 40%;
    width: 90px;
    height: 45px;
    background-color: #f6f6f6;
    border: 1px solid @borderColor;
    z-index: -1;
    transition: transform 1s;
    transform: translateX(-30px);
    border-radius: 22.5px;
    cursor: pointer;

    &:hover {
      transform: translateX(-60px);
    }
  }

  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 100;
    background-color: #fcfcfc;
    border-radius: 18px 0 0 18px;
    border-left: 2px solid #f6f6f6;

    .custom-configuration {
      width: 100%;
      height: 100%;
      border: 1px solid #d3d3d3;
      border-radius: 18px 0 0 18px;
      &-title {
        width: 100%;
        height: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #d3d3d3;
        h2 {
          margin: 10px 12.5px;
          font-size: 16px;
        }
      }
      &-list {
        width: 100%;
        height: 95%;
        &-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
}
.rightSidebarClose {
  transform: translateX(100%) !important;
}
</style>
