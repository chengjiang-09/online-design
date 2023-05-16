<template>
  <div id="CustomConfigurationList">
    <div class="container">
      <ul class="items">
        <li
          v-for="(obj, index) in configureList"
          :key="index"
          @click="selectItem($event, obj.type)"
          :class="[{ action: obj.action }]"
        >
          <ItemListTitle :icon="obj.icon" :label="obj.label" />
        </li>
      </ul>
      <transition-group class="pages" tag="ul" name="slide">
        <div
          class="pages-body"
          :class="[{ 'page-action': obj.action, 'page-leave': !obj.action }]"
          v-for="obj in configureList"
          :key="obj.type"
          v-show="obj.action"
        >
          <component
            :is="obj.component"
            :configure="{
              list: obj.configure,
              fatherId: fatherId,
              id: chartId,
              type: obj.type,
            }"
          ></component>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
//画布右侧侧边栏自定义属性控制组件
import ConfigureList from './components/configureList.vue'
import ItemListTitle from './components/itemListTitle.vue'
import DataFromList from './components/dataFromList.vue'
import DataFromPanelList from './components/dataFromPanelList.vue'
export default {
  name: 'CustomConfigurationList',
  components: {
    ConfigureList,
    ItemListTitle,
    DataFromList,
    DataFromPanelList,
  },
  props: {
    configure: {
      type: Array,
      default: () => [],
      required: false,
    },
    chartId: {
      type: String || Number,
      default: '',
      required: false,
    },
    fatherId: {
      type: String || Number,
      default: '',
      required: false,
    },
  },
  data: function () {
    return {
      configureList: [],
    }
  },
  created() {
    this.update()
  },
  watch: {
    configure: function () {
      this.update()
    },
  },
  methods: {
    selectItem(e, type) {
      let length = this.configureList.length
      for (let i = 0; i < length; i++) {
        if (this.configureList[i].type === type) {
          this.configureList[i].action = true
        } else {
          this.configureList[i].action = false
        }
        this.$set(this.configureList, i, this.configureList[i])
      }
    },
    update() {
      this.configureList = this.configure.map((obj) => {
        if (obj.type === 'configure') {
          obj.action = true
        } else {
          obj.action = false
        }
        return obj
      })
    },
  },
}
</script>

<style lang="less" scoped>
.slide-enter-active {
  transition: all 0.4s 0.25s linear;
}
.slide-leave-active {
  transition: all 0.4s linear;
}
.slide-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
#CustomConfigurationList {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .items {
      width: 100%;
      height: 5%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 10px 0;
      border-bottom: 1px dashed #d3d3d3;
      li {
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
        transition: border-bottom 0.3s;
        &:hover {
          border-bottom: 3px solid #b3b3b3;
        }
      }
      .action {
        border-bottom: 5px solid #b3b3b3 !important;
      }
    }

    .pages {
      position: relative;
      width: 100%;
      height: 100%;

      &-body {
        overflow: hidden;
        overflow-y: scroll;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
