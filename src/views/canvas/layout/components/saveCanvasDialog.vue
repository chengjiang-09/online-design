<template>
  <div id="saveCanvasDialog">
    <div class="container">
      <el-dialog
        v-loading="loading"
        element-loading-text="等待画布上传"
        class="dialog"
        :visible.sync="submitCanvasOpened"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          label-position="left"
          label-width="80px"
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-form-item label="大屏标题" prop="canvasTitle">
            <el-input v-model="form.canvasTitle"></el-input>
          </el-form-item>
          <el-form-item label="大屏简介" prop="canvasContext">
            <el-input type="textarea" v-model="form.canvasContext"></el-input>
          </el-form-item>
          <el-form-item label="分组配置" prop="group">
            <el-select v-model="form.group" placeholder="请选择分组">
              <el-option label="仅个人可见" value="0"></el-option>
              <el-option label="所有人可见" value="1"></el-option>
              <el-option label="其他分组（未实现）" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">确定</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import html2canvas from 'html2canvas'
import { randomStr } from '@/utils/utils'
export default {
  name: 'SaveCanvasDialog',
  computed: {
    ...mapState({
      submitCanvasOpened: (state) => state.app.submitCanvasOpened,
      actualReadingCanvas: (state) => state.charts.actualReadingCanvas,
    }),
  },
  data: function () {
    return {
      loading: false,
      form: {
        canvasTitle: '',
        canvasContext: '',
        group: '',
        file: null,
      },
      rules: {
        canvasTitle: [
          { required: true, message: '请输入大屏标题', trigger: 'blur' },
          {
            min: 1,
            max: 21,
            message: '长度在 1 到 21 个字符',
            trigger: 'blur',
          },
        ],
        canvasContext: [
          { required: true, message: '请输入大屏简介', trigger: 'blur' },
        ],
        group: [{ required: true, message: '请选择分组', trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapActions({
      set_submitCanvasOpened: 'app/set_submitCanvasOpened',
    }),
    handleClose() {
      this.set_submitCanvasOpened(false)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true
          const workerCanvas = document.querySelector('#workerCanvas')
          const canvas = await html2canvas(workerCanvas, { useCORS: true })

          canvas.toBlob((blob) => {
            const file = new File([blob], `${randomStr(21)}.png`, {
              type: 'image/png',
            })
            this.form.file = file
            console.log(this.form)

            this.set_submitCanvasOpened(false)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
