export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      multipleSelection: []
    }
  },
  methods: {
    changePage (page) {
      const { currentPage, pageSize } = page
      this.page.pageNum = currentPage
      this.page.pageSize = pageSize
      this.getList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    exportExcel (theader, filterData, fileName) {
      const that = this
      if (that.multipleSelection.length) {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = theader
          const filterVal = filterData
          const list = that.multipleSelection
          const data = that.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: fileName
          })
          that.$refs.taskTable.clearSelection()
          that.getList()
        })
      } else {
        that.$message({
          message: '请选择要导出的数据',
          type: 'warning'
        })
      }
    }
  },
  created () {
    this.getList()
  }
}
