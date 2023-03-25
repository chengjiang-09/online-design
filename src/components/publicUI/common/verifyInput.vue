<template>
  <div class="verify-input">
    <el-input
      v-model="value"
      :placeholder="placeholder"
      @blur="verifyValue"
      :aria-autocomplete="autocomplete"
    >
      <i
        class="icon"
        :class="[
          { 'el-icon-circle-close': !flag },
          { 'el-icon-circle-check': flag && value !== '' },
        ]"
        slot="suffix"
        @click="clearData"
      >
      </i
    ></el-input>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VerifyInput',
  props: {
    placeholder: {
      type: String,
      default: '请输入',
    },
    regExp: {
      type: RegExp,
    },
    keyData: {
      type: String,
    },
    propData: {
      type: String,
    },
    autocomplete: {
      type: String,
      default: 'none',
    },
  },
  watch: {
    propData: {
      handler: function (newData) {
        if (!newData) {
          this.value = ''
          this.flag = true
        }
      },
    },
  },
  data: function () {
    return {
      value: '',
      flag: true,
    }
  },
  methods: {
    verifyValue() {
      if (!this.value) {
        this.flag = false
      } else {
        if (this.regExp) {
          if (this.verifyRegularByRE(this.value, this.regExp)) {
            this.flag = true
            this.$emit('getData', {
              key: this.keyData,
              value: this.value,
            })
          } else {
            this.flag = false
          }
        } else {
          this.flag = true
          this.$emit('getData', {
            key: this.keyData,
            value: this.value,
          })
        }
      }
    },
    clearData() {
      if (!this.flag) {
        this.value = ''
      }
    },
    verifyRegularByRE(value, rules) {
      let re = new RegExp(rules)
      return re.test(value)
    },
  },
}
</script>

<style lang="less">
.verify-input {
  display: flex;
  .el-input__suffix {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    font-size: 28px;
  }
  .el-icon-circle-close {
    color: red;
  }
  .el-icon-circle-check {
    color: green;
  }
}
</style>
