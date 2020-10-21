<!--
 * @Descripttion: 更多配置参考 https://github.com/livelyPeng/pl-table
 * @Version: 1.0.0版本
 * @Author: 张彤
 * @Date: 2020-07-21 10:48:32
 * @LastEditors: 张彤
 * @LastEditTime: 2020-08-04 18:47:20
-->
<template>
  <plx-table-grid
    class="table-grid"
    :width="width"
    :height="height"
    stripe :header-row-style="{ background: '#F6F5FA' }"
    size="mini"
    :data="data"
    @cell-mouse-enter="handleMouseEnter"
    @cell-mouse-leave="handleMouseLeave"
    @row-click="handleRowClick"
    @header-click="handleHeaderClick">
      <plx-table-column type="index" width="100"/>
      <template v-for="item in field">
        <plx-table-column
          :key="item.name"
          :prop="item.name"
          :label="item.name"
          :width="item.width || 120"
          :align="item.align || 'center'"/>
      </template>
  </plx-table-grid>
</template>

<script>
import { PlxTableGrid, PlxTableColumn } from 'pl-table'
import 'pl-table/themes/index.css'
import 'pl-table/themes/plTableStyle.css'
export default {
  name: 'DataTable',
  components: {
    PlxTableGrid,
    PlxTableColumn
  },
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    field: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleMouseEnter (row) {
      this.$emit('mouseEnter', row)
    },
    handleMouseLeave (row) {
      this.$emit('mouseLeave', row)
    },
    handleRowClick (row) {
      this.$emit('rowClick', row)
    },
    handleHeaderClick (column, event) {
      this.$emit('headerClick', { column, event })
    }
  }
}
</script>
