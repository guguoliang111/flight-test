<template>
  <el-container class="layout-container">
    <el-aside class="layout-aside" width="210px">
      <side-menu />
    </el-aside>
    <el-container class="layout-wrapper">
      <el-header class="layout-header">
        <navbar />
      </el-header>
      <el-main class="layout-main">
        <main-box />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { SideMenu, MainBox, Navbar } from './components'
export default {
  name: 'Layout',
  components: {
    SideMenu,
    MainBox,
    Navbar
  }
}
</script>

<style lang="scss" scoped>
  .layout-container {
    position: relative;
    width: 100%;
    height: 100%;
    .layout-aside {
      height: 100%;
      overflow: hidden;
      transition: width 0.28s;
      background-color: #394255;
    }
    .layout-wrapper {
      .layout-header {
        overflow: hidden;
        position: relative;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
      }
      .layout-main {
        overflow-x: hidden;
        background-color: #F6F5FA;
        height: 100%;
      }
    }
  }
</style>
