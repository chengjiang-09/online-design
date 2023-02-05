<template>
  <div class="configure-layout-config">
    <div class="container">
      <el-radio-group v-model="value" @input="change" class="group">
        <el-radio
          class="group-radio"
          v-for="obj in dataAll.default"
          :key="obj.type"
          :label="obj.value"
          >{{ obj.label }}</el-radio
        >
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigureLayoutConfig',
  props: {
    data: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  created() {
    this.dataAll = this.data
    this.value = this.dataAll.value
  },
  data: function () {
    return {
      dataAll: {},
      value: '',
    }
  },
  methods: {
    change(value) {
      this.$emit('dataChange', {
        key: this.dataAll.type,
        value,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.configure-layout-config {
  width: 100%;
  min-height: 200px;
  .container {
    width: 100%;
    height: 100%;
    .group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-radio {
        margin-top: 30px;
      }
    }
  }
}
</style>
