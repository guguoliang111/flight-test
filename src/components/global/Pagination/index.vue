<!--
 * @Descripttion: coding...
 * @Version: 1.0.0版本
 * @Author: 张彤
 * @Date: 2020-06-08 11:09:22
 * @LastEditors: 张彤
 * @LastEditTime: 2020-07-16 10:48:20
-->
<template>
  <div class="pagination-container">
    <el-pagination
      style="text-align:right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="pageSizes"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.total"
      @next-click="nextPage"
      @prev-click="lastPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Object,
      default: () => ({
        pageNum: 0,
        pageSize: 0,
        total: 0
      })
    },
    pageSizes: {
      type: Array,
      default: () => ([15, 30, 50])
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.$emit('changePage', { currentPage: this.page.pageNum, pageSize: pageSize })
    },
    handleCurrentChange (currentPage) {
      this.$emit('changePage', { currentPage: currentPage, pageSize: this.page.pageSize })
    },
    lastPage () {
      this.page.pageNum--
      this.$emit('changePage', { currentPage: this.page.pageNum, pageSize: this.page.pageSize })
    },
    nextPage () {
      this.page.pageNum++
      this.$emit('changePage', { currentPage: this.page.pageNum, pageSize: this.page.pageSize })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container{
  height: 32px;
  .el-pagination{
    text-align: center !important;
  }
}
</style>
