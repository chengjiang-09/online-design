<template>
  <div class="verify-input">
    <el-input
      v-model="value"
      :placeholder="placeholder"
      @blur="verifyValue"
      :aria-autocomplete="autocomplete"
      @focus="focus"
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
    <div class="chooseList" v-if="hasChooseList" v-show="focusFlag">
      <ul class="chooseList-box">
        <li
          v-for="choose in chooseList"
          :key="choose.key"
          @click="chooseValue(choose.key, choose.value)"
        >
          {{ choose.key }}
        </li>
      </ul>
    </div>
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
    //用作拿取可选字段
    chooseName: {
      type: String,
      default: '',
    },
  },
  watch: {
    propData: {
      handler: function (newData) {
        if (!newData) {
          this.value = ''
        }
        this.flag = true
      },
    },
  },
  data: function () {
    return {
      value: '',
      flag: true,
      focusFlag: false,
    }
  },
  computed: {
    hasChooseList() {
      return this.chooseName ? true : false
    },
    chooseList() {
      return this.$ls.get(this.chooseName, [])
    },
  },
  methods: {
    chooseValue(key, value) {
      this.value = value
      this.$emit('getData', {
        key: this.keyData,
        value: value,
      })
    },
    focus() {
      this.focusFlag = true
    },
    verifyValue() {
      setTimeout(() => {
        this.focusFlag = false
      }, 200)

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
  position: relative;

  .chooseList {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 400px;
    z-index: 1000;
    background-color: #ffffff;
    border: 1px solid #d0d0d0;
    padding: 5px 5px;
    border-radius: 10px;

    &-box {
      width: 100%;
      height: 100%;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 30%;
        top: 0;
        transform: translate(-50%, -125%);
        border-bottom: 20px solid #d0d0d0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        opacity: 0.8;
        pointer-events: none;
      }

      li {
        width: 100%;
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 50px;
        border-bottom: 0.5px dashed #d0d0d0;
        padding-left: 10px;
        background-color: #ffffff;
        cursor: pointer;
        font-weight: 800;
        border-radius: 8px;

        &:hover {
          background-color: #d0d0d0;
        }
      }
    }
  }
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
