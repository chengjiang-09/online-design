<template>
  <div id="homeRightNav">
    <div class="container">
      <ul class="nav-body">
        <li
          v-for="route in routes"
          :key="route.name"
          :class="[{ action: route.action }]"
          @click="selectThis(route)"
        >
          <i :class="[route.icon, 'icon']"></i>
          <h5 class="label">{{ route.label }}</h5>
        </li>
      </ul>
      <div class="nav-user">
        <div class="user" v-if="user">
          <div class="title">用户：{{ user.username }}</div>
          <el-button round @click="loginOut">退出</el-button>
        </div>
        <div v-else class="go-login">
          <div @click="login">登录 | 注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HomeRightNav',
  computed: {
    ...mapState({
      routes: (state) => state.routerStore.routes,
    }),
  },
  mounted() {
    this.user = this.$ls.get('user')
  },
  data: function () {
    return {
      user: null,
    }
  },
  methods: {
    ...mapActions({
      update_routes: 'routerStore/update_routes',
      set_authMove: 'app/set_authMove',
    }),
    selectThis(route) {
      this.update_routes({ name: route.name })
      this.$router.push({
        name: route.name,
      })
    },
    login() {
      this.set_authMove(true)
      this.$router.push({
        path: '/',
      })
    },
    loginOut() {
      this.$confirm('是否确定退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$ls.set('token', null)
          this.$ls.set('user', null)
          this.user = null
          this.$router.go(0)
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="less" scoped>
#homeRightNav {
  width: 100%;
  height: 80px;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    .nav-body {
      display: flex;
      width: 80%;
      height: 100%;
      padding: 8px;
      box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.5);

      li {
        position: relative;
        width: 140px;
        height: 100%;
        background-color: #ffffff;
        transition: background-color 0.5s;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          background-color: #eeeeee;
        }

        .icon {
          position: absolute;
          left: 8%;
          top: 50%;
          font-size: 16px;
          transform: translate(0, -50%);
        }

        .label {
          position: absolute;
          left: 60%;
          top: 50%;
          font-size: 16px;
          transform: translate(-50%, -50%);
        }
      }
      .action {
        background-color: #eeeeee;
      }
    }

    .nav-user {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 25px;
      box-shadow: -5px 0px 10px 0px rgba(0, 0, 0, 0.5);

      .user {
        display: flex;
        align-items: center;

        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
          font-size: 18px;
        }
      }

      .go-login {
        cursor: pointer;
        color: #000000;
        font-size: 18px;
        font-weight: 800;
      }
    }
  }
}
</style>
