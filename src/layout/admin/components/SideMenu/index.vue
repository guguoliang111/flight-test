<template>
  <div class="sidemenu-wrapper">
    <logo />
    <el-scrollbar>
      <ul class="menu-list">
        <template v-for="route in sidemenu">
          <li :key="route.path" class="menu-item" :class="{ 'active': isActive(route.path) }">
            <router-link :to="route.path">{{ route.meta.title }}</router-link>
          </li>
        </template>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      sidemenu: []
    }
  },
  components: {
    Logo
  },
  methods: {
    getRoutes () {
      this.sidemenu = [
        { path: '/home', meta: { title: '首页', access: 'basemap' } },
        { path: '/dataSearch', meta: { title: '数据浏览', access: 'thematicdata' } },
        { path: '/dataManage', meta: { title: '数据管理', access: 'task' } },
        { path: '/resourceDir', meta: { title: '目录管理', access: 'datasummary' } },
        { path: '/orderManagement', meta: { title: '订单管理', access: 'progress' } },
        { path: '/userManage', meta: { title: '系统管理', access: 'progress' } }
      ]
    }
  },
  created () {
    this.getRoutes()
  },
  computed: {
    ...mapGetters(['perlist']),
    isActive () {
      return (route) => this.$route.fullPath.includes(route)
    },
    isAccess () {
      return (access) => {
        return this.perlist.some(item => item.includes(access))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidemenu-wrapper {
    height: 100%;
    background: linear-gradient(to top,#3AF8D6,#43E97D);
    .el-scrollbar {
      height: calc(100% - 60px);
    }
    .menu-list {
      width: 100%;
      list-style: none;
      margin: 80px 0 0 0;
      padding: 0;
      text-align: center;
      line-height: 40px;
      .menu-item {
        width: 150px;
        height: 40px;
        font-size: 16px;
        margin: 5px auto;
        border-radius: 50px;
        transition: all 300ms;
        a {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          color: #fff;
        }
        &.active {
          background-color: #29BBFF;
          a {
            color: #fff;
          }
        }
      }
    }
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .svg-icon {
      margin-right: 16px;
    }
    // .submenu-title-noDropdown,
    // .el-submenu__title {
    //   &:hover {
    //     background-color: #263445 !important;
    //   }
    // }

    // .is-active>.el-submenu__title {
    //   color: #f4f4f5 !important;
    // }

    // & .nest-menu .el-submenu>.el-submenu__title,
    // & .el-submenu .el-menu-item {
    //   min-width: 200px !important;
    //   background-color: #1f2d3d !important;

    //   &:hover {
    //     background-color: #1f2d3d !important;
    //   }
    // }
  }
</style>
