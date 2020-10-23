<template>
  <div class="data-manege-page">
    <el-card>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/OrderManagement/shoppingYrolley">购物车</el-menu-item>
        <el-menu-item index="/OrderManagement/applicationRecord">申请记录</el-menu-item>
        <el-menu-item index="/OrderManagement/orderHistory">历史订单</el-menu-item>
        <el-menu-item index="/OrderManagement/orderReview">订单审核</el-menu-item>
      </el-menu>
      <div class="inner-wrap">
        <router-view />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DataManage',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
  .data-manege-page {
    height: 100%;
    border-radius: 6px;
    .el-card {
      height: 100%;
      .el-card__body {
        height: 100%;
        padding: 0;
        .el-menu {
          .el-menu-item{
            border-bottom-width: 0;
          }
        }
      }
      .inner-wrap {
        padding: 20px;
        height: calc(100% - 61px);
      }
    }
  }
</style>
