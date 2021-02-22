<template>
  <div class="bars">
    <!-- <div class="navbar" v-for="item in navlist" :key="item.path">
      <div></div>
      <div>{{item.meta.title}}</div>
      <i class="el-icon-close navbar-close"></i>
    </div> -->
    <el-menu :default-active="this.$router.path" router mode="horizontal" >
      <el-menu-item v-for="(item,i) in navlist" :key="i" :index="item.name" class="navbar">
        <div></div>
        <div>{{ item.meta.title }}</div>
        <div></div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavigationBars',
  data () {
    return {
      navlist: [
        {
          path: '/welcome',
          meta: { title: '主页' }
        }
      ]
    }
  },
  watch: {
    $route: {
      handler (v, o) {
        this.navlist.push(v)
        console.log(v, o)
      }
    }
  },
  mounted () {
    let url = window.location.href
    console.log(url)
  }
}
</script>

<style lang="less" scoped>
.bars{
  .el-menu{
    border-bottom: none
  }
}
.navbar{
  font-size: 16px;
  color: #666464;
  height: 36px;
  line-height: 38px;
  border-bottom: none;
  display: flex;
  align-items: center;
  position: relative;
  border-right: 1px solid whitesmoke;
  .navbar-close{
    font-size: 14px;
    position: absolute;
    top: 5px;
    right: -22px;
    color: #666464;
  }
}
.navbar>div:nth-child(1){
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(216, 209, 209);
}
.navbar>div:nth-child(2){
  margin-left: 10px;
}
</style>
