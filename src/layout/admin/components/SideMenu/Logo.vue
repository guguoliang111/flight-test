<template>
  <div class="sidemenu-logo-container" :class="{ 'collapse': collapse }">
    <router-link key="collapse" class="sidemenu-logo-link" to="/">
      <img src="./logo.png" class="sidemenu-logo">
      <h1 class="sidemenu-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '土壤管理智能平台',
      collapse: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidemenu-logo-container {
    position: relative;
    width: 100%;
    padding-top: 50px;
    text-align: center;
    overflow: hidden;
    & .sidemenu-logo-link {
      width: 100%;
      height: 100%;
      & .sidemenu-logo {
        width: 100px;
        height: 100px;
        vertical-align: middle;
      }
      & .sidemenu-title {
        display: inline-block;
        margin: 0;
        padding: 20px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
        line-height: 1.5;
      }
    }
  }
</style>
