<template>
  <div class="data-manege-page">
    <el-card>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/dataManage/list">数据列表</el-menu-item>
        <el-menu-item index="/dataManage/landManage">地块管理</el-menu-item>
        <el-menu-item index="/dataManage/operationRecord">田间操作记录</el-menu-item>
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
