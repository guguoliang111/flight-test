<template>
  <div class="sidebar-wrapper" :class="{ 'has-logo': showLogo }">
    <logo />
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        background-color="#545c64"
        text-color="#fff"
        :unique-opened="false"
        active-text-color="#ffd04b"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
  components: {
    Logo,
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-wrapper {
    height: 100%;
    &.has-logo {
      .el-scrollbar {
        height: calc(100% - 60px);
      }
    }
    ::v-deep .el-scrollbar {
      height: 100%;
      .el-scrollbar__wrap {
        overflow-x: hidden !important;
      }
      .el-scrollbar__bar {
        &.is-vertical {
          right: 0;
        }
        &.is-horizontal {
          display: none;
        }
      }
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
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
