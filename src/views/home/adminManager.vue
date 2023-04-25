<template>
  <div id="adminManager">
    <div class="container">
      <div class="table">
        <el-table :data="userList" border style="width: 100%">
          <el-table-column fixed prop="id" label="id" width="100">
          </el-table-column>
          <el-table-column prop="user_name" label="用户名"> </el-table-column>
          <el-table-column prop="password" label="密码"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="group_id" label="分组"> </el-table-column>
          <el-table-column prop="role_id" label="权限id"> </el-table-column>
          <el-table-column prop="role.role_name" label="权限名称">
          </el-table-column>
          <el-table-column prop="role.role_weight" label="权限权重">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editClick(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <PaginateComponent
          @handleCurrentChange="handleCurrentChange"
          :total="users.total"
          :pageSize="10"
        />
      </div>
      <el-dialog
        v-loading="loading"
        title="编辑用户信息"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <div class="origin-user">用户名(原): {{ editUserName }}</div>
        <div class="new-user">
          <el-form
            :model="newUser"
            :rules="rules"
            ref="newUser"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="新用户名：" prop="username">
              <el-input v-model="newUser.username"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editNot">取 消</el-button>
          <el-button type="primary" @click="editTrue('newUser')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { updateSystemUser } from '@/apis/systemApi'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AdminManager',
  created() {
    this.set_users({ limit: 10, page: 1 })
  },
  computed: {
    ...mapState({
      userList: (state) => state.systemManage.userList,
      users: (state) => state.systemManage.users,
    }),
  },
  data: function () {
    return {
      dialogVisible: false,
      loading: false,
      newUser: {
        id: 0,
        username: '',
      },
      editUserName: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    ...mapActions({
      set_users: 'systemManage/set_users',
      delete_users: 'systemManage/delete_users',
    }),
    handleCurrentChange(num) {
      this.set_users({ limit: 10, page: num })
    },
    editClick(value) {
      this.dialogVisible = true
      this.editUserName = value.user_name
      this.newUser.id = value.id
    },
    editNot() {
      this.dialogVisible = false
    },
    editTrue(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定修改用户名?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(async () => {
              this.loading = true
              await updateSystemUser({
                id: this.newUser.id,
                username: this.newUser.username,
              })
              await this.delete_users({ page: this.users.currentPage })
              await this.set_users({ limit: 10, page: this.users.currentPage })
              this.loading = false
              this.dialogVisible = false
            })
            .catch(() => {})
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#adminManager {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    padding: 20px 30px;

    .table {
      width: 100%;
      height: 70%;
    }

    .footer {
      width: 100%;
      height: 30%;
      padding-top: 50px;
    }

    .new-user {
      margin-top: 40px;
      & > span {
        display: block;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
      display: flex;
    }
  }
}
</style>
