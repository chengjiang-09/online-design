<template>
  <div class="configure-chart-List">
    <el-collapse v-model="activeName" class="container">
      <el-collapse-item :title="dataAll.label" name="1">
        <ul class="list">
          <li class="list-box" v-for="obj in dataAll.value" :key="obj.type">
            <component
              :is="obj.component"
              :data="obj"
              @dataChange="dataChange"
            ></component>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'ConfigureChartList',
  props: {
    data: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  created() {
    this.update()
  },
  watch: {
    data: function () {
      this.update()
    },
  },
  data: function () {
    return {
      dataAll: {},
      activeName: 0,
    }
  },
  methods: {
    dataChange(data) {
      this.dataAll.value.forEach((obj) => {
        if (obj.type === data.key) {
          obj.value = data.value
        }
      })
      this.$emit('dataChange', {
        key: this.dataAll.type,
        value: this.dataAll.value,
      })
    },
    update() {
      this.dataAll = this.data

      if (!this.dataAll.value && this.dataAll.values) {
        this.dataAll.value = this.dataAll.values
      }
    },
  },
}
</script>

<style lang="less" scoped>
.configure-chart-List {
  width: 100%;
  .container {
    width: 100%;

    .list {
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
