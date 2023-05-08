<template>
  <div class="design-dialog">
    <div class="container">
      <el-dialog
        :title="title"
        :visible="dialogFormVisible"
        width="50%"
        :before-close="cansol"
      >
        <el-form
          :model="form"
          :rules="rulesArray"
          label-position="left"
          label-width="250px"
          ref="form"
        >
          <el-form-item
            v-for="data in dataList"
            :key="data.key"
            :label="data.label"
            :prop="data.key"
          >
            <el-input
              v-if="data.type === 'input'"
              v-model="form[data.key]"
              autocomplete="off"
              :disabled="data.disabled"
            ></el-input>
            <el-autocomplete
              v-if="data.type === 'autocomplete'"
              @focus="focus(data.key)"
              class="inline-input"
              v-model="form[data.key]"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
            ></el-autocomplete>
            <el-select
              v-if="data.type === 'select'"
              v-model="form[data.key]"
              placeholder="请选择"
            >
              <el-option
                v-for="select in data.query"
                :key="select.value"
                :label="select.label"
                :value="select.value"
              ></el-option>
            </el-select>
            <el-button
              v-if="data.type === 'json'"
              type="primary"
              round
              @click="edit(data.key)"
              >编辑</el-button
            >
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cansol">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <JsonEditView
      class="edit"
      v-if="editShow"
      :title="editTitle"
      :jsonDataProp="jsonDataProp"
      @close="close"
      @changeData="changeData"
    />
  </div>
</template>

<script>
export default {
  name: 'DesignDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: 'designDialog',
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    dialogFormVisible: {
      get() {
        return this.visible
      },
    },
    rulesArray: {
      get() {
        return this.rules
      },
    },
  },
  beforeMount() {
    this.form = this.dataList.reduce((form, data) => {
      form[data.key] = data.defaultValue
      if (data.type === 'autocomplete') {
        this.autocomplete[data.key] = data.query
      }
      return form
    }, {})
  },
  data: function () {
    return {
      form: {},
      autocomplete: {},
      autocompleteKey: '',
      editShow: false,
      editTitle: '',
      editKey: '',
      jsonDataProp: {},
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('putForm', {
            type: this.type,
            form: this.form,
          })
        } else {
          return false
        }
      })
    },
    cansol() {
      this.$emit('visibleControl', false)
    },
    querySearch(queryString, cb) {
      var restaurants = this.autocomplete[this.autocompleteKey]
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    focus(key) {
      this.autocompleteKey = key
    },
    handleSelect(item) {
      this.$message({
        message: item.address,
        type: 'success',
      })
    },
    close(close) {
      this.editShow = close
    },
    changeData({ value }) {
      this.form[this.editKey] = value
    },
    edit(key) {
      this.editKey = key
      this.editTitle = key
      this.jsonDataProp = this.form[key]
      this.editShow = true
    },
  },
}
</script>

<style lang="less" scoped>
.edit {
  left: unset;
  right: 0;
}
</style>
