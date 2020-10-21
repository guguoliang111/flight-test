<!--
 * @Descripttion: coding...
 * @Version: 1.0.0版本
 * @Author: 张彤
 * @Date: 2020-07-21 13:29:45
 * @LastEditors: 张彤
 * @LastEditTime: 2020-07-28 16:34:53
-->
<template>
  <el-button
    :type="type"
    :size="size"
    :class="className"
    :disabled="disabled"
    :style="{ 'color': color, 'background-color': bgc, 'border-color': borderColor ? borderColor : bgc }"
    :icon="icon"
    @click="handleClick">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    color: {
      type: String,
      default: '#fff'
    },
    bgc: {
      type: String,
      default: '#409EFF'
    },
    size: {
      type: String,
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button {
    font-size: 14px !important;
    &--text {
      border-color: transparent !important;
      color: #1890ff !important;
      background-color: transparent !important;
    }
  }
</style>
