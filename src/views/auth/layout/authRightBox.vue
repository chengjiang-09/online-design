<template>
  <div id="authRightBox" :class="[{ move: authMove }]">
    <div class="container">
      <i class="el-icon-close close" @click="closeAuth"></i>
      <div class="title">
        <img src="../../../assets/online-design.png" alt="online-design" />
      </div>
      <div class="box">
        <div class="box-email">
          <h3 class="email">邮箱(email)</h3>
          <VerifyInput
            placeholder="邮箱"
            :regExp="re.email"
            keyData="email"
            :propData="email"
            autocomplete="inline"
            chooseName="email"
            @getData="getData"
          />
        </div>
        <div class="box-verify-code">
          <VerifyInput
            placeholder="验证码"
            keyData="code"
            @getData="getData"
            :propData="code"
          />
          <RandomVerifyCode
            @getVerifyCode="getVerifyCode"
            :sendFlag="sendFlag"
          />
        </div>
        <div class="box-email-code">
          <h3 class="code">邮件验证码(email-code)</h3>
          <VerifyInput
            placeholder="邮件验证码"
            keyData="emailCode"
            :propData="emailCode"
            chooseName="code"
            @getData="getData"
            ><el-button @click="sendCode" :disabled="sendCodeFlag">{{
              sendCodeStr
            }}</el-button></VerifyInput
          >
        </div>
        <div class="box-footer">
          <button type="button" @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getEmailCode, loginByEmailCode } from '@/apis/authApi'
import { TOKEN_EX_TIME } from '@/utils/expirationTime'
export default {
  name: 'AuthRightBox',
  computed: {
    ...mapState({
      authMove: (state) => state.app.authMove,
    }),
  },
  data: function () {
    return {
      code: '',
      verifyCode: '',
      email: '',
      emailCode: '',
      sendCodeStr: '发送',
      sendCodeFlag: false,
      sendFlag: false,
      re: {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    }
  },
  methods: {
    ...mapActions({
      set_authMove: 'app/set_authMove',
      set_routes: 'routerStore/set_routes',
    }),
    sendCode() {
      //如果有邮箱信息，才发送验证码
      if (this.email) {
        if (this.code.toLowerCase() !== this.verifyCode.toLowerCase()) {
          this.sendFlag = true
          this.$alert('4位验证码输入错误', '警告', {
            confirmButtonText: '确定',
          })
          this.code = ''
        } else {
          //获取邮箱验证码
          getEmailCode({
            email: this.email,
          })
          this.sendCodeFlag = true
          this.sendCodeStr = 60
          let timer = null

          //60秒倒计时
          timer = setInterval(() => {
            this.sendCodeStr -= 1
            if (this.sendCodeStr <= 0) {
              this.sendFlag = true
              this.sendCodeFlag = false
              this.sendCodeStr = '发送'
              clearInterval(timer)
            }
          }, 1000)
        }
      } else {
        this.$alert('邮箱为空', '警告', {
          confirmButtonText: '确定',
        })
      }
    },
    //控制右侧登录组件的展开关闭
    closeAuth() {
      this.set_authMove(!this.authMove)
    },
    //四位图片验证码取值
    getVerifyCode(code) {
      //sendFlag 为true时，刷新验证码图片
      this.sendFlag = false
      this.verifyCode = code
    },
    getData(data) {
      const { key, value } = data

      switch (key) {
        case 'email':
          this.email = value
          break
        case 'emailCode':
          this.emailCode = value
          break
        case 'code':
          this.code = value
          break
        default:
          break
      }
    },
    async login() {
      //邮箱和邮箱验证码拥有时才能登录，校验已在input组件中完成，此时只有input组件中校验通过，才会有值
      if (this.email && this.emailCode) {
        this.sendFlag = true

        //登录
        let { code, data } = await loginByEmailCode({
          email: this.email,
          code: this.emailCode,
        })

        if (code === 0) {
          //保存token,12小时
          this.$ls.set('token', data.token, TOKEN_EX_TIME)

          //保存登录候选邮箱，只保存5个，将会插入后pop多余
          let chooseEmailList = this.$ls.get('email', [])
          let target = chooseEmailList.find((email) => {
            return this.email == email.value
          })
          if (!target) {
            chooseEmailList.splice(2, 0, {
              key: this.email,
              value: this.email,
            })
            if (chooseEmailList.length >= 5) {
              chooseEmailList.pop()
            }
            this.$ls.set('email', chooseEmailList)
          }

          //清空用作动态渲染导航栏的路由表
          this.set_routes([])
          this.$router.push('/home/templateList')
        } else {
          this.$alert('邮箱验证码错误', '提示', {
            confirmButtonText: '确定',
          })
        }

        this.emailCode = ''
        this.code = ''
      } else {
        this.$alert('请检查邮箱或验证码', '提示', {
          confirmButtonText: '确定',
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
#authRightBox {
  position: fixed;
  right: 0;
  top: 0;
  width: 500px;
  height: 100%;
  transform: translateX(500px);
  transition: transform 1s;
  box-shadow: 0px 0px 20px 10px rgba(88, 88, 88, 0.5);

  .container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: relative;

    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 30px;
      cursor: pointer;
    }

    .title {
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translateX(-50%);
      width: 250px;
      height: 250px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .box {
      position: absolute;
      left: 50%;
      top: 38%;
      transform: translate(-50%, 0);
      width: 400px;
      height: 400px;
      display: flex;
      flex-direction: column;

      div {
        h3 {
          color: #b6b6b6;
          font-size: 16px;
        }
      }

      &-title {
        flex: 2;
      }

      &-email {
        flex: 2;
        .email {
          margin-bottom: 8px;
        }
      }

      &-verify-code {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        .input {
          margin-right: 8px;
        }
      }

      &-email-code {
        flex: 2;
        .code {
          margin: 10px 0 8px;
        }
      }

      &-footer {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          width: 100%;
          height: 50%;
          cursor: pointer;
          border: 1px solid #c8c8c8;
          border-radius: 20px;
          background-color: #ffffff;
          transition: background-color 0.3s, color 0.3s, border 0.3s;
          color: #949494;
          font-weight: 500;

          &:active {
            background-color: #5e5e5e;
            color: #ffffff;
          }

          &:hover {
            border: 1px solid #5e5e5e;
          }
        }
      }
    }
  }
}

.move {
  transform: translateX(0) !important;
}
</style>
