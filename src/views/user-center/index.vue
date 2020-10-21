<template>
  <div class="page-container">
      <div class="page-title">{{ $route.meta.title }}</div>
      <div class="cont_box">
        <!-- :class="[{ active: isActive==1 }, 'sort']" -->
        <div style="display: flex">
            <div @click="showUserDetail" :class="[{ select_box: selectId == 1} ,'user_detail']">个人中心</div>
            <div>|</div>
            <div @click="changePwd" :class="[{ select_box: selectId == 2} ,'change_pwd']">修改密码</div>
        </div>
      </div>
      <div v-if="showPwd" class="tent_box">
          <el-form style="margin-top: 40px" :rules="rules" label-width="100px" :model="form">
            <el-form-item label="旧密码" prop="pwd">
                <el-input  type="password" placeholder="请输入旧密码" v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input  type="password" placeholder="请输入新密码" v-model="form.newPwd"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="pword">
                <el-input  type="password" placeholder="请输入新密码" v-model="form.pword"></el-input>
            </el-form-item>
                  <!-- <el-button type="primary" @click="submitForm">保存</el-button>
                  <el-button @click="goBack">返回</el-button> -->
           </el-form>
           <div class="bot_box">
              <el-button type="primary" @click="submitForm">保存</el-button>
                <el-button @click="goBack">返回</el-button>
           </div>
      </div>
      <div v-if="showDetial" class="tent_box">
          <el-form style="margin-top: 40px" label-width="100px" :model="user">
            <el-form-item label="注册角色" >
              <div class="arr_role">{{ userInfo.roletitle }}</div>
            </el-form-item>
            <el-form-item label="用户名" >
                <div class="arr_role">{{ userInfo.username }}</div>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input  placeholder="请输入姓名" v-model="userInfo.realname"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input placeholder="请输入新手机号" v-model="userInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="工作单位">
                <el-input placeholder="请输入新工作单位" v-model="userInfo.workunit"></el-input>
            </el-form-item>
            <el-form-item label="工作地址">
                <el-input placeholder="请输入新工作地址" v-model="userInfo.workaddress"></el-input>
            </el-form-item>
          </el-form>
           <div class="bot_box">
              <el-button type="primary" @click="changeUserSub">保存</el-button>
                <el-button @click="goBack">返回</el-button>
           </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changePassword, changeUserDetail, info } from '@/api/index'
export default {
  name: 'UserCenter',
  data () {
    return {
      showPwd: false,
      showDetial: true,
      userInfo: {},
      selectId: 1,
      form: {
        pwd: '',
        newPwd: '',
        pword: ''
      },
      rules: {
        pwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        pword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 个人中心展示
    showUserDetail () {
      this.showPwd = false
      this.showDetial = true
      this.selectId = 1
    },
    // 修改密码
    changePwd () {
      this.selectId = 2
      this.showPwd = true
      this.showDetial = false
    },
    // 个人中心修改
    changeUserSub () {
      const { realname, phone, workaddress, workunit } = this.userForm
      console.log('log----119', realname, phone, workaddress, workunit)
      if (realname !== '' && phone !== '' && workaddress !== '' && workunit !== '') {
        changeUserDetail({
          realname: realname,
          phone: phone,
          workunit: workunit,
          workaddress: workaddress
        }).then(res => {
          if (res.state === 'ok') {
            this.getUserInfo()
            this.$message.success('修改成功')
          }
        })
      } else if (realname === '') {
        this.$message.warning('请输入姓名')
      } else if (phone === '') {
        this.$message.warning('请输入手机号')
      } else if (workaddress === '') {
        this.$message.warning('请输入工作单位')
      } else if (workunit === '') {
        this.$message.warning('请输入工作地址')
      }
    },
    // 获取个人信息
    getUserInfo () {
      info().then(res => {
        if (res.state === 'ok') {
          this.userForm = res.data
        }
        console.log(res)
      })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交
    submitForm () {
      if (this.form.newPwd === this.form.pword) {
        changePassword({
          pass: this.form.pwd,
          newpass: this.form.newPwd,
          checknewpass: this.form.pword
        }).then(res => {
          if (res.state === 'ok') {
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        })
      } else {
        console.log(1212131231)
        this.$message.warning('新密码输入不一致,请重新输入')
      }
    },
    // 返回
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.userInfo = JSON.parse(JSON.stringify(this.user))
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped lang="scss">
.tent_box {
  width: 40%;
  margin: 60px auto;
  .arr_role {
    color: #909993;
    background-color: #FBFBFB;
    padding-left: 13px;
  }
  .tlt_box {
    text-align: center;
    color: #101010;
    font-size: 18px;
  }
  .bot_box {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
}
}
.cont_box {
  display: flex;
  font-size: 16px;
  color: #909993;
  cursor: pointer;
  justify-content: space-around;
  width: 40%;
  margin: 60px auto;
  .user_detail {
    margin-right: 20px
  }
  .change_pwd {
    margin-left: 20px
  }
  .select_box {
    color:#3CB3FF;
  }
}
</style>
