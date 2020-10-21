<template>
  <el-form
    class="login-form"
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules">
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item class="pwd-options" style="margin-bottom: 15px;">
        <el-checkbox class="remember-pwd" v-model="rememberPwd">记住密码</el-checkbox>
        <span class="forget-pwd">忘记密码</span>
      </el-form-item>
      <el-button class="login-btn" @click="handleLogin">登录</el-button>
      <el-button class="login-btn regist-btn" @click="toRegist">注册</el-button>
  </el-form>
</template>

<script>
import { loginRules } from '@/utils/formRules'
import { mapGetters, createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions } = createNamespacedHelpers('user')

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules,
      rememberPwd: true,
      redirect: undefined,
      otherQuery: {}
    }
  },
  methods: {
    ...mapMutations([
      'saveLoginInfo',
      'clearLoginInfo'
    ]),
    ...mapActions([
      'login'
    ]),
    handleLogin () {
      this.$formValidate(this, 'loginForm').then(async () => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        try {
          await this.login(this.loginForm)
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        } catch (err) {
          console.log(err)
        } finally {
          loading.close()
        }
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    toRegist () {
      this.$router.push('/regist')
    },
    handleEnter (event) {
      if (event.keyCode === 13) {
        this.handleLogin()
      }
    }
  },
  created () {
    // const { username, password } = this.loginInfo
    // this.loginForm.username = username
    // this.loginForm.password = password
  },
  mounted () {
    document.addEventListener('keyup', this.handleEnter)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keyup', this.handleEnter)
    })
  },
  computed: {
    ...mapGetters([
      'loginInfo'
    ])
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-form {
    padding-top: 40px;
    .el-form-item {
      height: 36px;
      line-height: 36px;
      margin-bottom: 20px;
      &.is-error {
        ::v-deep .el-input__inner {
          height: 36px;
          line-height: 36px;
          border: none;
          border-radius: 4px;
        }
      }
      ::v-deep .el-form-item__content {
        height: 36px;
        line-height: 36px;
      }
      ::v-deep .el-form-item__error {
        color: #f0ff00;
      }
      ::v-deep .el-form-item__label {
        font-size: 16px;
        color: #fff;
        font-weight: normal;
        padding: 0;
        text-align-last:justify;
        padding-right: 15px;
        &::before {
          display: none;
        }
      }
      ::v-deep .el-input {
        height: 36px;
        border-radius: 4px;
        overflow: hidden;
        &__inner {
          height: 36px;
          line-height: 36px;
          border-top: none;
          border-left: none;
          border-right: none;
          border-radius: 4px;
        }
        &-group__append {
          background-color: transparent;
          border: none;
          border-radius: 0;
          width: 120px;
          height: 36px;
          overflow: hidden;
          padding-right: 0;
          img {
            width: 120px;
            height: 36px;
            cursor: pointer;
            border-radius: 4px;
          }
        }
      }
      &.pwd-options {
        height: 19px;
        clear: both;
        overflow: hidden;
        ::v-deep .el-form-item__content {
          height: 19px;
          line-height: 19px;
        }
        .remember-pwd {
          float: left;
          ::v-deep .el-checkbox__label {
            color: #fff;
          }
        }
        .forget-pwd {
          float: right;
          color: #fff;
        }
      }
    }
    .login-btn {
      width: 100%;
      height: 36px;
      line-height: 36px;
      display: block;
      border-radius: 4px;
      font-size: 22px;
      background: #0098F9;
      border-color: #0098F9;
      padding: 0;
      margin: 10px 0;
      font-size: 16px;
      color: #fff;
    }
    .regist-btn {
      background: #EA9B2C;
      border-color: #EA9B2C;
    }
  }
  a{
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: .3s;
  }
</style>
