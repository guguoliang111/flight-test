<template>
  <el-form
    class="regist-form"
    ref="registForm"
    :model="registForm"
    :rules="registRules">
    <el-scrollbar>
      <el-form-item prop="roleId">
        <el-select
          v-model="registForm.roleId"
          placeholder="请选择注册角色">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="registForm.username"
          placeholder="请输入账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="realName">
        <el-input
          v-model="registForm.realName"
          placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="registForm.phone"
          placeholder="请输入手机号">
        </el-input>
      </el-form-item>
      <el-form-item prop="workunit">
        <el-input
          v-model="registForm.workunit"
          placeholder="请输入工作岗位">
        </el-input>
      </el-form-item>
      <el-form-item prop="address">
        <el-input
          v-model="registForm.address"
          placeholder="请输入所在部门">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="registForm.password"
          placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          type="password"
          v-model="registForm.repassword"
          placeholder="请确认密码">
        </el-input>
      </el-form-item>
    </el-scrollbar>
    <el-button class="login-btn" @click="handleRegist" @keyup.enter="handleRegist">注册</el-button>
    <el-button class="login-btn regist-btn" @click="toLogin">登录</el-button>
  </el-form>
</template>

<script>
import { registRules } from '@/utils/formRules'
import { regist } from '@/api/index'

export default {
  data () {
    const validateRePwd = (rule, value, callback) => {
      if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registForm: {
        roleId: '',
        username: '',
        realName: '',
        phone: '',
        workunit: '',
        address: '',
        password: '',
        repassword: ''
      },
      registRules: {
        ...registRules,
        repassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateRePwd, trigger: 'change' }
        ]
      },
      roles: [
        { id: 2, title: '管理员' },
        { id: 4, title: '普通用户' }
      ],
      countryList: []
    }
  },
  methods: {
    handleRegist () {
      this.$formValidate(this, 'registForm').then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        regist(this.registForm).then((res) => {
          loading.close()
          this.$message({
            type: 'success',
            message: '注册成功'
          })
          this.$refs.registForm.resetFields()
          this.$router.push('/login')
        }).catch(err => {
          console.log(err)
          loading.close()
        })
      })
    },
    toLogin () {
      this.$router.push('/login')
    },
    handleEnter (event) {
      if (event.keyCode === 13) {
        this.handleRegist()
      }
    }
  },
  created () {},
  mounted () {
    document.addEventListener('keyup', this.handleEnter)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keyup', this.handleEnter)
    })
  }
}
</script>

<style lang="scss" scoped>
  .regist-form {
    padding-top: 40px;
    .el-scrollbar {
      height: 335px;
    }
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
      }
      .el-select {
        width: 100%;
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
  .el-select-dropdown__item {
    padding: 0 20px;
  }
</style>
