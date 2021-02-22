<template>
  <div class="home">
    <el-container style="height: 100%">
      <el-aside :style="{ width: this.isCollapse ? '' : '230px' }">
        <el-menu
          default-active="1-4-1"
          background-color="#28333E"
          text-color="#fff"
          class="el-menu-vertical-demo menuLeft"
          @open="handleOpen"
          @close="handleClose"
          :collapse-transition="false"
          :collapse="isCollapse"
          :router="true"
        >
        <div class="title">
          <div v-show="!isCollapse" style="display:flex;align-items: center;">
              <img src="@/assets/img/logo.png" alt="" style="width: 30px;height: 30px">
              <div style="margin-left:10px">试飞信息化系统</div>
          </div>
        <img v-show="isCollapse" src="@/assets/img/logo.png" alt="">
        </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">试飞数据同步</span>
            </template>
            <el-menu-item index="1-1">试飞数据同步</el-menu-item>
            <el-menu-item index="1-2">气象数据同步</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">试飞数据预处理</span>
            </template>
            <el-menu-item index="2-1">原始数据预处理</el-menu-item>
            <el-menu-item index="2-2">工程值数据预处理</el-menu-item>
            <el-menu-item index="2-3">视频音频数据预处理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">试飞数据管理</span>
            </template>
            <el-submenu index="3-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">试飞数据预处理</span>
              </template>
              <el-menu-item index="3-1-1">试飞大纲管理</el-menu-item>
              <el-menu-item index="3-1-2">试飞科目管理</el-menu-item>
              <el-menu-item index="3-1-3">试飞试验点管理</el-menu-item>
              <el-menu-item index="3-1-4">架次任务信息管理</el-menu-item>
              <el-menu style="width: 228px;"
                background-color="#28333e"
                mode="horizontal" text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect">
                <el-submenu index="2">
                  <template slot="title" style="width: 228px;padding: 0">试飞配置文件管理</template>
                  <el-menu-item index="2-1">机载配置文件管理</el-menu-item>
                  <el-menu-item index="2-2">ARINC 429 ICD文件管理</el-menu-item>
                  <el-menu-item index="2-3">ARINC 664 ICD文件管理</el-menu-item>
                  <el-menu-item index="2-4">IMD ICD文件管理</el-menu-item>
                  <el-menu-item index="2-5">传感器校线文件管理</el-menu-item>
                  <el-submenu index="2-6">
                    <template slot="title">实验信息文件合成</template>
                    <el-menu-item index="2-6-1">选项1</el-menu-item>
                    <el-menu-item index="2-6-2">选项2</el-menu-item>
                    <el-menu-item index="2-6-3">选项3</el-menu-item>
                  </el-submenu>
                </el-submenu>
                </el-menu>
              <el-menu-item index="/flightTestpm">试飞参数管理</el-menu-item>
              <el-menu-item index="3-1-7">专题应用判据信息管理</el-menu-item>
              <el-menu-item index="3-1-8">专题库管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">试飞数据管理</span>
              </template>
              <el-menu-item index="3-2-1">源码数据管理</el-menu-item>
              <el-menu-item index="3-2-2">工程量数据管理</el-menu-item>
              <el-menu-item index="3-2-3">视频音频数据管理</el-menu-item>
              <el-menu-item index="3-2-4">气象数据管理</el-menu-item>
              <el-menu-item index="3-2-5">标签数据管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3-3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">试飞数据预处理</span>
              </template>
              <el-menu-item index="3-3-1">用户行为日志</el-menu-item>
              <el-menu-item index="3-3-2">设备运行日志</el-menu-item>
            </el-submenu>
            <el-submenu index="3-4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">BI报告管理</span>
              </template>
              <el-menu-item index="3-4-1">在线设计</el-menu-item>
              <el-menu-item index="3-4-2">报告管理</el-menu-item>
              <el-menu-item index="3-4-2">模板管理</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">试飞数据通用服务</span>
            </template>
            <el-menu-item index="4-1">数据查询</el-menu-item>
            <el-menu-item index="4-2">数据下载</el-menu-item>
            <el-menu-item index="4-3">数据预览</el-menu-item>
            <el-menu-item index="4-4">数据回放</el-menu-item>
            <el-menu-item index="4-5">数据可视化</el-menu-item>
            <el-menu-item index="4-6">规则引擎设计</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">试飞数据分析</span>
            </template>
            <el-menu-item index="5-1">数据集管理</el-menu-item>
            <el-menu-item index="5-2">通用APP</el-menu-item>
            <el-menu-item index="5-3">架次分析</el-menu-item>
            <el-menu-item index="5-4">排故分析</el-menu-item>
            <el-menu-item index="5-5">科目分析</el-menu-item>
            <el-menu-item index="5-6">数据建模平台</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">试飞数据专题应用</span>
            </template>
            <el-menu-item index="6-1">动力故障字报告</el-menu-item>
            <el-menu-item index="6-2">架次快速报告</el-menu-item>
            <el-menu-item index="6-3">试飞报告</el-menu-item>
            <el-menu-item index="6-4">试飞分析报告</el-menu-item>
            <el-menu-item index="6-5">科目试飞报告</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="7-1">数据归档</el-menu-item>
            <el-menu-item index="7-2">数据备份</el-menu-item>
            <el-menu-item index="7-3">日志展示</el-menu-item>
            <el-menu-item index="7-4">系统公告</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="8-1">用户管理</el-menu-item>
            <el-menu-item index="8-2">角色管理</el-menu-item>
            <el-menu-item index="8-3">权限管理</el-menu-item>
            <el-menu-item index="8-4">岗位管理</el-menu-item>
            <el-menu-item index="8-5">部门管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container
        class="test"
        :class="this.isCollapse ? 'blocoll' : 'blocoll2'"
      >
        <el-header height="95px">
          <el-row :gutter="20" style="border-bottom: 1px solid whitesmoke">
            <el-col :span="20">
              <i
                :class="this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                class="el-iconColl"
                @click="collapse"
              ></i>
            </el-col>
            <div class="logmar">
              <i class="el-icon-bell"></i>
              <div class="bellNum">0</div>
              <el-dropdown>
                <div style="display: flex;align-items:center">
                  <div class="logbut">管</div>
                  <span style="margin-left:10px;cursor: pointer;">管理员</span>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>基本登录</el-dropdown-item>
                  <el-dropdown-item>注册登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-row>
          <!-- 头部点击后的导航 -->
          <div class="layui-tab">
            <div class="arrow-left">
              <i class="el-icon-arrow-left"></i>
            </div>
            <div class="routDiv">
              <!-- <span>首页</span> -->
            <NavigationBars />

            </div>
            <div class="arrow-right">
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="arrow-down">
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavigationBars from './components/navigation-bars'
export default {
  name: 'home',
  components: {
    NavigationBars
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {}
  }
}
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.home{
  height: 100%;
}
.menuLeft {
  overflow: hidden;
  height: 100%;
  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: #5FB878;
    font-size: 20px;
  }
  img{
    width: 40px;
    height: 40px;
  }
}
.el-header {
  width: 100%;
  line-height: 50px;
  padding: 0;
  border-bottom: 1px solid whitesmoke;
  position: relative;
  .el-row {
    margin: 0 !important;
    padding: 0 !important;
  }
  .layui-tab {
    background-color: #fff;
    position: relative;
    display: flex;
    padding-right: 0;
    .arrow-left{
      border-right: 1px solid whitesmoke;
    }
    div {
      padding: 0 14px 0 10px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      font-size: 22px;
      color: #666464;
      cursor: pointer;
    }
    .routDiv {
      // border-right: 1px solid whitesmoke;
      font-size: 16px;
      line-height: 30px;
      span {
        margin: 0 10px;
      }
    }
    .arrow-right {
      position: absolute;
      top: 0;
      right: 34px;
      border-left: 1px solid whitesmoke;
      border-right: none;
    }
    .arrow-down {
      position: absolute;
      top: 0;
      right: 0;
      border-left: 1px solid whitesmoke;
    }
  }
  .el-iconColl {
    line-height: 50px;
    font-size: 26px;
    cursor: pointer;
    color: rgb(102, 100, 100);
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 229px;
  min-height: 400px;
}
.logmar {
  position: absolute;
  top: 5px;
  right: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-icon-bell {
    font-size: 18px;
    color: #666464;
    cursor: pointer;
  }
  .bellNum {
    width: 18px;
    height: 18px;
    background-color: #ff5722;
    line-height: 18px;
    text-align: center;
    color: #fff;
    margin-left: 3px;
    font-size: 14px;
    cursor: pointer;
  }
  .el-dropdown{
    display: flex;
    align-items: center;
  }
}
@{deep}.el-submenu{
  width: 228px;
}
@{deep}.el-submenu__title{
  // padding: 0;
  border-bottom: none !important;
  color: #fff !important;
  padding-left: 60px;
}
.logbut {
  width: 28px;
  height: 28px;
  background-color: rgb(97, 159, 195);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  margin-left: 15px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.el-main {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: whitesmoke;
}
</style>
