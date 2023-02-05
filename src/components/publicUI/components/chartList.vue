<template>
  <div id="ChartList">
    <div class="container">
      <div class="container-box">
        <div v-for="obj in itemsList" :key="obj.type">
          <div
            class="item"
            draggable="true"
            @dragstart.self="dragstart($event, obj)"
            @drag.self="drag"
            @dragend.self="dragend"
          >
            <div class="icon" v-if="obj.icon" :class="[obj.icon]"></div>
            <div class="label">{{ obj.label }}</div>
            <img
              class="img"
              v-if="obj.imgPath"
              :src="obj.imgPath"
              :alt="obj.type"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//控制单个itemList里，Tabs 标签页的具体内容，该组件由后端数据的component选项动态选择
import { mapActions } from 'vuex'
export default {
  name: 'ChartList',
  props: {
    items: {
      type: Array || Object,
      default: () => [],
      require: true,
    },
    attributionType: {
      type: String,
      default: '',
      require: true,
    },
  },
  watch: {
    items: function () {
      this.itemsList = this.items
    },
  },
  created() {
    this.itemsList = this.items
  },
  data: function () {
    return {
      itemsList: [],
    }
  },
  methods: {
    ...mapActions({
      set_templateData: 'other/set_templateData',
    }),
    dragstart(e, data) {
      e.dataTransfer.setData(this.attributionType, data.id + data.type)

      this.set_templateData({
        key: data.id + data.type,
        value: data,
      })
    },
    drag() {},
    dragend() {},
  },
}
</script>

<style lang="less" scoped>
#ChartList {
  width: 100%;
  height: 100%;
  padding: 18px 10px;
  .container {
    width: 100%;
    height: 100%;

    &-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .item {
        position: relative;
        width: 110px;
        height: 110px;
        margin: 0 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background-color: rgb(245, 245, 245);
        transition: background-color 1s;
        cursor: pointer;
        overflow: hidden;

        &:hover {
          background-color: rgb(227, 227, 227);
        }

        .icon {
          margin-right: 5px;
          font-size: 25px;
        }

        .label {
          font-size: 12px;
        }
        .img {
          position: absolute;
          left: 0;
          top: 0;
          width: 110px;
          height: 110px;
          border-radius: 10px;
          border: 1px solid rgb(245, 245, 245);
          transition: border 1s;

          &:hover {
            border: 1px solid rgb(157, 157, 157);
          }
        }
      }
    }
  }
}
</style>
