<template>
  <div class="configure-color">
    <div class="container">
      <div class="label">
        <div>{{ dataAll.label }}</div>
      </div>
      <div class="block">
        <el-color-picker
          @change="change"
          v-model="color"
          show-alpha
          :predefine="jsonData"
        >
        </el-color-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigureColor',
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
      color: '',
      jsonData: [],
    }
  },
  methods: {
    change() {
      this.color = this.color ? this.color : 'rgba(0, 0, 0, 0)'
      this.$emit('dataChange', {
        key: this.dataAll.type,
        value: this.color,
      })
    },
    update() {
      this.dataAll = this.data
      this.color = this.dataAll.value
      this.jsonData = this.dataAll.jsonData
    },
  },
}
</script>

<style lang="less" scoped>
.configure-color {
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
