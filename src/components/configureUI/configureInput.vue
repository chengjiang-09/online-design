<template>
  <div class="configure-input">
    <div class="container">
      <div class="label">
        <div>{{ dataAll.label }}</div>
      </div>
      <div class="input">
        <el-input
          :disabled="disabled"
          v-model="text"
          :placeholder="dataAll.label"
          @blur="blur"
          :max="5400"
          :min="0"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ConfigureInput',
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
  computed: {
    ...mapState({
      inputValue: (state) => state.other.inputValue,
    }),
  },
  watch: {
    data: function () {
      this.update()
    },
    inputValue: {
      handler: function (newValue) {
        if (this.inputValue[this.dataAll.type]) {
          this.text = newValue[this.dataAll.type]
        }
      },
      deep: true,
    },
  },
  data: function () {
    return {
      dataAll: {},
      text: '',
      disabled: false,
    }
  },
  methods: {
    blur() {
      this.text = this.text ? this.text : ''
      this.text = this.text === '0' ? 5 : this.text
      this.$emit('dataChange', {
        key: this.dataAll.type,
        value: this.text,
      })
    },
    update() {
      this.dataAll = this.data
      this.text = this.dataAll.value
      if (this.dataAll.disabled) {
        this.disabled = this.dataAll.disabled
      }
    },
  },
}
</script>

<style lang="less" scoped>
.configure-input {
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

    .input {
      width: 250px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
