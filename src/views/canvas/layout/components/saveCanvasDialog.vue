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
import { randomStr, JSONSwitchFormData } from '@/utils/utils'
import { uploadFile } from '@/apis/publicApi'
export default {
  name: 'SaveCanvasDialog',
  computed: {
    ...mapState({
      submitCanvasOpened: (state) => state.app.submitCanvasOpened,
      actualReadingCanvas: (state) => state.other.actualReadingCanvas,
      originCanvasConfigureList: (state) =>
        state.other.originCanvasConfigureList,
    }),
  },
  created() {
    const { title, context, group } = this.$route.query
    if (title && context && group) {
      this.form.canvasContext = decodeURIComponent(context)
      this.form.canvasTitle = decodeURIComponent(title)
      this.form.group = group
    }
  },
  data: function () {
    return {
      loading: false,
      form: {
        canvasTitle: '',
        canvasContext: '',
        group: '',
      },
      file: null,
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
      set_completeChart: 'charts/set_completeChart',
      set_authMove: 'app/set_authMove',
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
          const token = this.$ls.get('token')

          if (token) {
            this.loading = true

            const img = `${Date.now()}${randomStr(21)}.png`

            await this.set_completeChart({
              groupId: this.form.group,
              title: this.form.canvasTitle,
              context: this.form.canvasContext,
              data: this.actualReadingCanvas,
              baseData: this.originCanvasConfigureList,
              img,
            })

            const workerCanvas = document.querySelector('#workerCanvas')
            const canvas = await html2canvas(workerCanvas, { useCORS: true })

            canvas.toBlob(async (blob) => {
              const file = new File([blob], img, {
                type: 'image/png',
              })

              const formData = JSONSwitchFormData({
                file: file,
                name: img,
              })

              await uploadFile(formData)

              this.set_submitCanvasOpened(false)
              this.loading = false
            })
          } else {
            this.$confirm('继续此操作需要登录，是否前往登录页面？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                this.set_authMove(true)
                this.$router.push({
                  name: 'auth',
                  query: {
                    redirect: '/canvas',
                    title: encodeURIComponent(this.form.canvasTitle),
                    context: encodeURIComponent(this.form.canvasContext),
                    group: this.form.group,
                  },
                })
              })
              .catch(() => {})
          }
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
