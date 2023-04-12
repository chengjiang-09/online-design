<template>
  <div id="ItemList">
    <div class="container">
      <ul class="items">
        <li
          v-for="(obj, index) in itemsList"
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
          v-for="obj in itemsList"
          :key="obj.type"
          v-show="obj.action"
        >
          <component
            :is="obj.component"
            :items="obj.items"
            :attributionType="obj.type"
          ></component>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
//画布导航栏切换内部页面组件显示。类似于Tabs 标签页功能，用于左侧侧边栏模板列表显示组件
import ChartList from './components/chartList.vue'
import ItemListTitle from './components/itemListTitle.vue'
export default {
  name: 'ItemList',
  components: {
    ChartList,
    ItemListTitle,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data: function () {
    return {
      itemsList: [],
    }
  },
  created() {
    this.update()
  },
  watch: {
    items: function () {
      this.update()
    },
  },
  methods: {
    selectItem(e, type) {
      let length = this.itemsList.length
      for (let i = 0; i < length; i++) {
        if (this.itemsList[i].type === type) {
          this.itemsList[i].action = true
        } else {
          this.itemsList[i].action = false
        }
        this.$set(this.itemsList, i, this.itemsList[i])
      }
    },
    update() {
      this.itemsList = this.items.map((obj) => {
        if (obj.type === 'layout') {
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
#ItemList {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .items {
      width: 100%;
      height: 12%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-top: 2px solid #d3d3d3;
      border-bottom: 2px solid #d3d3d3;
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
      height: 88%;

      &-body {
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
