<template>
  <el-cascader
    :value="value"
    :options="cityList"
    :size="size"
    :props="{ checkStrictly: true, value: 'gid' }"
    clearable
    @change="onChange($event)"></el-cascader>
</template>

<script>
export default {
  name: 'SelectCity',
  model: [
    {
      prop: 'value',
      event: 'change'
    }
  ],
  props: {
    value: {
      default: ''
    },
    size: {
      default: 'mini'
    },
    cityList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="css" scoped>
  .el-cascader {
    width: 100%;
  }
</style>
