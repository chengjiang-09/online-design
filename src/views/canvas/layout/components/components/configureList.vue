<template>
  <div id="configureList">
    <div class="container">
      <ul class="configure-list">
        <li
          class="configure-list-box"
          v-for="obj in configureList"
          :key="obj.type"
        >
          <component
            :is="obj.component"
            :data="obj"
            @dataChange="dataChange"
          ></component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//右侧样式列表组件
import { mapActions } from 'vuex'
import goBackListType from '@/utils/goBackListType'
export default {
  name: 'ConfigureList',
  props: {
    configure: {
      type: Object,
      default: () => {},
      require: true,
    },
  },
  watch: {
    configure: function () {
      this.update()
    },
  },
  created() {
    this.update()
  },
  data: function () {
    return {
      configureList: [], //目标组件的所有样式数组
      id: 0, //目标组件id，用于修改时递归找到渲染树对应的子节点
      type: '', //样式名称，例如修改opacity：1。type = opacity
      fatherId: '', //用于插入节点时，找到渲染树子节点的父节点
    }
  },
  methods: {
    ...mapActions({
      modify_canvasData: 'charts/modify_canvasData',
      modify_canvasDataChild: 'charts/modify_canvasDataChild',
      set_goBcakArray: 'charts/set_goBcakArray',
    }),
    dataChange({ key, value, originValue }) {
      if (this.id === 'canvas') {
        this.modify_canvasData({
          id: this.id,
          data: {
            key,
            value,
          },
          type: this.type,
        })

        this.set_goBcakArray({
          fatherId: null,
          id: this.id,
          data: {
            key,
            value: originValue,
          },
          defaultType: this.type,
          type: goBackListType.update,
        })
      } else {
        this.modify_canvasDataChild({
          fatherId: this.fatherId,
          id: this.id,
          data: {
            key,
            value,
          },
          type: this.type,
        })

        this.set_goBcakArray({
          fatherId: this.fatherId,
          id: this.id,
          data: [
            {
              key,
              value: originValue,
            },
          ],
          defaultType: this.type,
          type: goBackListType.update,
        })
      }
    },
    update() {
      this.configureList = this.configure.list
      this.id = this.configure.id
      this.type = this.configure.type
      this.fatherId = this.configure.fatherId
    },
  },
}
</script>

<style lang="less" scoped>
#configureList {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    padding: 15px 10px;

    .configure-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      &-box {
        width: 100%;
        display: flex;
        margin: 5px 0;
      }
    }
  }
}
</style>
