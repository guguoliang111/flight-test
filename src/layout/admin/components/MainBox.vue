<template>
  <section class="main-wrapper">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :exclude="blackList">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'MainBox',
  computed: {
    key () {
      return this.$route.path
    }
  },
  data () {
    return {
      blackList: ['BaseMapList', 'TaskList', 'ThematicDataList', 'UserList', 'AuditConfirm', 'ProgressList', 'TaskCreate', 'TaskDetailPage', 'detailList', 'changePassword', 'AuditsDetails', 'msgDetail', 'ThematicDetail']
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
