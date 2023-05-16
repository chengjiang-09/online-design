<template>
  <div class="configure-select">
    <div class="container">
      <div class="label">
        <div>{{ dataAll.label }}</div>
      </div>
      <div class="block">
        <el-select v-model="select" @change="change" placeholder="请选择">
          <el-option
            v-for="item in jsonData"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigureSelect',
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
      select: '',
      originValue: '',
      jsonData: [],
    }
  },
  methods: {
    change() {
      this.$emit('dataChange', {
        key: this.dataAll.type,
        value: this.select,
        originValue: this.originValue,
      })
      this.originValue = this.select
    },
    update() {
      this.dataAll = this.data
      this.select = this.dataAll.value
      this.originValue = this.select
      this.jsonData = this.dataAll.jsonData
    },
  },
}
</script>

<style lang="less" scoped>
.configure-select {
  width: 100%;
  height: 60px;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .label {
      display: flex;
      align-items: center;
      width: 100px;
      height: 100%;
      margin-right: 5px;
    }

    .block {
      width: 250px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
