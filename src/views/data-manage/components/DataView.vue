<template>
  <el-dialog
    class="data-view"
    center
    width="850px"
    title="查看数据"
    :visible="show"
    @close="$emit('update:show', false)">
      <custom-map v-if="viewType === 0" :key="currentData.url" :shp-data="currentData.url" :bounds="bounds" />
      <custom-map v-if="viewType === 1" :key="currentData.url" :tif-data="currentData.url" :bounds="bounds" />
      <iframe ref="iframe" class="iframe" v-if="viewType === 2" :src="$fileServer + currentData.url" frameborder="0"></iframe>
  </el-dialog>
</template>

<script>
import CustomMap from './CustomMap'

export default {
  components: {
    CustomMap
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    currentData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      ...this.$attrs
    }
  },
  methods: {},
  created () {},
  computed: {
    viewType () {
      return this.currentData.type
    },
    bounds () {
      const { maxX, maxY, minX, minY } = this.currentData
      return { maxX, maxY, minX, minY }
    }
  }
}
</script>

<style lang="scss">
  .data-view {
    .el-dialog {
      .el-dialog__body {
        width: 850px;
        height: 520px;
        padding: 10px !important;
        .iframe {
          width: 100%;
          height: 100%;
          .viewer-close {
            display: none;
          }
        }
      }
    }
  }
</style>
