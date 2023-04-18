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
            <el-button type="primary" @click="saveAs('form')" v-if="id"
              >另存为</el-button
            >
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
import { uploadFile, updateFile } from '@/apis/publicApi'
export default {
  name: 'SaveCanvasDialog',
  computed: {
    ...mapState({
      submitCanvasOpened: (state) => state.app.submitCanvasOpened,
      actualReadingCanvas: (state) => state.other.actualReadingCanvas,
      originCanvasConfigureList: (state) =>
        state.other.originCanvasConfigureList,
      targetCanvasDefault: (state) => state.charts.targetCanvasDefault,
      updateFlagStore: (state) => state.charts.updateFlag,
      canvasIsNotEmpty: (state) => state.charts.canvasIsNotEmpty,
    }),
  },
  watch: {
    targetCanvasDefault: {
      handler: function () {
        this.form.group = this.targetCanvasDefault.groupId
          ? this.targetCanvasDefault.groupId
          : ''
        this.form.canvasTitle = this.targetCanvasDefault.title
          ? this.targetCanvasDefault.title
          : ''
        this.form.canvasContext = this.targetCanvasDefault.context
          ? this.targetCanvasDefault.context
          : ''
        this.id = this.targetCanvasDefault.id ? this.targetCanvasDefault.id : ''
        this.imgName = this.targetCanvasDefault.imgName
          ? this.targetCanvasDefault.imgName
          : ''
        this.updateFlag = Boolean(
          (this.targetCanvasDefault.groupId ||
            this.targetCanvasDefault.title ||
            this.targetCanvasDefault.context) &&
            this.targetCanvasDefault.id,
        )
      },
      deep: true,
    },
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
      imgName: '',
      id: '',
      updateFlag: false,
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
      update_completeChart: 'charts/update_completeChart',
      set_authMove: 'app/set_authMove',
    }),
    handleClose() {
      this.set_submitCanvasOpened(false)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async onloadImg() {
      const workerCanvas = document.querySelector('#workerCanvas')
      const canvas = await html2canvas(workerCanvas, { useCORS: true })

      canvas.toBlob(async (blob) => {
        const file = new File([blob], this.imgName, {
          type: 'image/png',
        })

        const formData = JSONSwitchFormData({
          file: file,
          originName: this.targetCanvasDefault.imgName
            ? this.targetCanvasDefault.imgName
            : this.imgName,
        })
        this.updateFlag
          ? await updateFile(formData)
          : await uploadFile(formData)

        this.set_submitCanvasOpened(false)
        this.loading = false
        this.$message({
          type: 'success',
          message: '保存成功',
        })
        this.$router.push({
          path: '/actualReading',
        })
      })
    },
    saveAs(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const token = this.$ls.get('token')
          const user = this.$ls.get('user')

          if (token && user) {
            //next为了限制图片上传功能，画布为空时以及不保存页面时，不执行封面上传操作
            let next = true
            if (user.id == this.targetCanvasDefault.authorId && this.id) {
              try {
                await this.$confirm('是否另存为当前画布？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                this.loading = true
                //updateFlag是在保存时，判断是上传新图片还是替换旧图片
                this.updateFlag = false
                this.imgName = `${Date.now()}${randomStr(21)}.png`

                await this.set_completeChart({
                  id: this.id,
                  groupId: this.form.group,
                  title: this.form.canvasTitle,
                  context: this.form.canvasContext,
                  data: this.actualReadingCanvas,
                  baseData: this.originCanvasConfigureList,
                  img: this.imgName,
                })
              } catch (e) {
                next = false
              }
            } else if (!this.canvasIsNotEmpty) {
              next = false
            }
            if (next) {
              //上传封面图片
              await this.onloadImg()
              this.set_submitCanvasOpened(false)
              this.loading = false
              this.$message({
                type: 'success',
                message: '保存成功',
              })
            }
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
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const token = this.$ls.get('token')
          const user = this.$ls.get('user')

          if (token && user) {
            //next为了限制图片上传功能，画布为空时以及不保存页面时，不执行封面上传操作
            let next = true
            //标识是否是第一次保存画布
            let first = false
            if (user.id == this.targetCanvasDefault.authorId && this.id) {
              try {
                await this.$confirm('确定修改并保存当前画布？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                this.loading = true
                if (this.updateFlagStore) {
                  this.imgName = `${Date.now()}${randomStr(21)}.png`
                }
                await this.update_completeChart({
                  id: this.id,
                  authorId: this.targetCanvasDefault.authorId,
                  groupId: this.form.group,
                  title: this.form.canvasTitle,
                  context: this.form.canvasContext,
                  data: this.actualReadingCanvas,
                  baseData: this.originCanvasConfigureList,
                  img: this.imgName,
                })
              } catch (e) {
                next = false
              }
            } else if (!this.canvasIsNotEmpty) {
              //画布为空，不允许上传图片
              next = false
            } else {
              this.loading = true
              this.imgName = `${Date.now()}${randomStr(21)}.png`
              first = true

              await this.set_completeChart({
                id: this.id,
                groupId: this.form.group,
                title: this.form.canvasTitle,
                context: this.form.canvasContext,
                data: this.actualReadingCanvas,
                baseData: this.originCanvasConfigureList,
                img: this.imgName,
              })
            }
            //updateFlagStore只会在画布内容修改后才会为true，如果只修改例如画布模版的标题和简介，不再上传封面图片
            if (next && (first || this.updateFlagStore)) {
              //上传封面图片
              await this.onloadImg()
            } else if (first && !this.canvasIsNotEmpty) {
              this.$message({
                message: '画布为空不允许上传',
                type: 'warning',
              })
            } else {
              this.set_submitCanvasOpened(false)
              this.loading = false
              this.$message({
                type: 'success',
                message: '保存成功',
              })
            }
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
