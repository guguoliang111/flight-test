<template>
  <div class="login" >
    <div class="loginform">
      <!-- <img src="@" alt=""> -->
      <div class="title">试飞数据处理信息化系统</div>
      <el-form :model="loginForm">
        <el-form-item>
          <el-input prefix-icon="" v-model="loginForm.username">
            <i class="icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="identify">
          <el-input placeholder="请输入验证码" v-model="loginForm.verification"></el-input>
          <div @click="handleRefreshCode()" style="margin-left: 20px">
            <Identify :identifyCode="identifyCode"></Identify>
          </div>
        </el-form-item>
        <el-form-item >
          <el-checkbox v-model="loginForm.checked">保存密码</el-checkbox>
          <el-button type="primary" @click="register">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
 import Identify from './components/Identity'
export default {
  name: 'login',
  components: {
    Identify
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        verification: '',
        checked: false
      },
      identifyCode: '1234', // 验证码初始值
      identifyCodes: '1234567890' // 验证码的随机取值范围
    }
  },
  methods: {
    register () {
      if(this.loginForm.username.length !==0 && this.loginForm.password !==0) {
        if(this.loginForm.verification.length == 0) {
          this.$message({
            showClose: true,
            message: '请输入验证码',
            type: 'warning'
          });
          this.handleRefreshCode()
        }else if(this.loginForm.verification !== this.identifyCode) {
          this.$message({
            showClose: true,
            message: '您输入的验证码有误，请重新输入',
            type: 'warning'
          });
          this.handleRefreshCode()
        }else {
          if( this.loginForm.username !== 'admin' && this.loginForm.password !== 'admin') {
            this.$message({
              showClose: true,
              message: '您输入的账户或密码错误，请重新输入',
              type: 'warning'
            });
            this.handleRefreshCode()
          }else {
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            });
            this.$router.push('/')
          }
        }
      }else {
        this.$message({
          showClose: true,
          message: '请输入账户或密码',
          type: 'warning'
        });
      }
    },
        // 刷新验证码
    handleRefreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    }
  },
   mounted (){
    this.handleRefreshCode()
  },
}
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.login{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d3a4b;
  .loginform{
    width: 500px;
    height: 600px;
    // background-color: #000;
    .title{
      font-size: 30px;
      color: #5FB878;
      text-align: center;
    }
    .el-form{
      width: 100%;
      margin-top: 20px;
      .el-form-item{
        display: flex;
        align-items: center;
        justify-content: center;
        @{deep}.el-checkbox__label{
          color: #fff;
        }
        .el-input{
          width: 400px;
        }
        @{deep}.el-input__inner{
          width: 400px;
          margin-left: 0;
          height: 50px;
          line-height: 50px;
          background-color: #0000001a;
          border: 1px solid #ffffff1a;
          color: #fff;
        }
        .el-button{
          padding: 10px 130px;
          margin-left: 20px;
        }
      }
      .identify{
        @{deep}.el-form-item__content{
          display: flex !important;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .el-input{
          width: 240px;
        }
        @{deep}.el-input__inner{
          width: 240px;
        }
      }
    }
  }
}
</style>
