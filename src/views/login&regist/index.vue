<template>
  <div class="login-page">
    <div class="login-title">
      <img src="./logo.png">
      <div class="sys-title">
        <h1>典型地物光谱数据库管理系统</h1>
      </div>
    </div>
    <div class="login-wrap">
      <component :is="activeName"></component>
    </div>
  </div>
</template>

<script>
import Login from './login'
import Regist from './regist'

export default {
  components: {
    Login,
    Regist
  },
  computed: {
    activeName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(./bg.png);
  background-size: 100% 100%;
  background-position: center center;
  position: relative;

  .login-title {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    clear: both;
    overflow: hidden;
    text-align: center;

    img {
      width: 90px;
      height: 90px;
    }

    .sys-title {
      height: 60px;
      color: #fff;
      letter-spacing: 2px;

      h1 {
        font-size: 24px;
        font-weight: 400;
        margin-top: 10px;
      }

      sub {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }

  .login-wrap {
    width: 420px;
    padding: 36px 40px;
    opacity: 0.9;
    border-radius: 6px;
    position: absolute;
    top: 250px;
    left: 50%;
    transform: translateX(-50%);
    clear: both;
    overflow: hidden;

    .el-tabs {
      ::v-deep .el-tabs__header {
        .el-tabs__nav-wrap::after {
          background-color: transparent;
        }

        .el-tabs__nav {
          width: 100%;
          text-align: center;

          .el-tabs__active-bar {
            left: 75px;
            background-color: #f0ff00;
          }

          .el-tabs__item {
            width: 95px;
            text-align: center;
            font-size: 20px;
            color: #fff;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
