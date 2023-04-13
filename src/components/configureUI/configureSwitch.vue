<template>
  <div class="configure-switch">
    <div class="container">
      <div class="label">
        <div>{{ dataAll.label }}</div>
      </div>
      <div class="switch">
        <el-switch v-model="flag" @change="change"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigureSwitch',
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
      flag: null,
      originValue: '',
    }
  },
  methods: {
    change() {
      this.$emit('dataChange', {
        key: this.dataAll.type,
        value: this.flag ? 1 : 0,
        originValue: this.originValue,
      })
      this.originValue = this.flag
    },
    update() {
      this.dataAll = this.data
      this.flag = this.dataAll.value ? true : false
      this.originValue = this.flag
    },
  },
}
</script>

<style lang="less" scoped>
.configure-switch {
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

    .switch {
      width: 250px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
