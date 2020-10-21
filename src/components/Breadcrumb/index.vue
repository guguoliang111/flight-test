<template>
  <div class="left_tlt">
    <div class="top_icon">
      <i class="el-icon-menu"></i>
    </div>
    <h2 class="top_tlt">土壤智能管理平台</h2>
  </div>
  <!-- <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == breadcrumbList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb> -->
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'

export default {
  data () {
    return {
      breadcrumbList: null
    }
  },
  watch: {
    $route (route) {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isHome(first)) {
        matched = [].concat(matched)
      }
      this.breadcrumbList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isHome (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    },
    pathCompile (path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
.left_tlt {
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
  .top_icon {
    color: #1EC2FF;
    font-size: 24px;
    }
  .top_tlt {
    margin-left: 3%;
    color: #4B4B4B;
    letter-spacing:5px;
  }
}
  .breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    margin-left: 8px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
