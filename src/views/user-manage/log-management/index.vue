<template>
  <div class="data-manage-list">
    <!-- 搜索表单组件 -->
    <search-form :items="searchItems" :search="search" @change="handleLevel1Change" @btnClick="handleSearch" />
    <div style="margin-bottom: 10px">
      <el-radio-group v-model="radio" size="small">
        <el-radio-button label="系统日志" ></el-radio-button>
        <el-radio-button label="订单日志"></el-radio-button>
        <el-radio-button label="光谱数据入库日志"></el-radio-button>
      </el-radio-group>
    </div>
    <el-table
      :data="dataList"
      ref="taskTable"
      stripe
      :header-row-style="{ background: '#D0EDF7', color: '#303331' }"
      style="width: 100%;font-size: 14px;"
      size="mini"
      >
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column prop="name" label="日志类型" align="center"></el-table-column>
        <el-table-column prop="edit" label="操作人名称" align="center" ></el-table-column>
        <el-table-column prop="people" label="登录IP" align="center" ></el-table-column>
        <el-table-column prop="bigtime" label="记录时间" align="center" ></el-table-column>
        <el-table-column prop="msg" label="操作说明" align="center"> </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination class="pagination" :page="page" @changePage="changePage"></pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { dataManageList } from '@/api/api'

import pagination from '@/mixins/pagination'
import SearchForm from '@/components/SearchForm'

export default {
  components: {
    SearchForm
  },
  mixins: [pagination],
  data () {
    return {
      radio: '系统日志',
      isEditData: false,
      isDownData: false,
      searchItems: [],
      search: {
        name: '',
        type: '',
        times: [],
        level1: null,
        level2: null
      },
      dataList: [
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        },
        {
          name: '系统日志',
          edit: '王小虎',
          people: '192.168.1.112',
          bigtime: '2020-10-20  15:24:45',
          msg: '新添加了一个用户'
        }
      ],
      dataType: [
        { id: 1, name: '矢量数据', value: 0, ext: '.shp' },
        { id: 2, name: '影像数据', value: 1, ext: '.tif' },
        { id: 3, name: '资料数据', value: 2, ext: '.xlsx' },
        { id: 4, name: '影像数据', value: 3, ext: '.tiff' },
        { id: 5, name: 'jp2数据', value: 4, ext: '.jp2' },
        { id: 5, name: '影像数据', value: 5, ext: '.tif' }
      ],
      currentEditData: {},
      currentDownData: {}
    }
  },
  methods: {
    getList () { // 数据列表
      // this.loading.dataList = true
      // try {
      //   const { data: { page: { list, totalRow } } } = await dataManageList({
      //     pageNum: this.page.pageNum,
      //     pageSize: this.page.pageSize,
      //     name: this.search.name,
      //     type: this.search.type,
      //     times: this.search.times,
      //     directoryid: this.search.level2 || this.search.level1
      //   })
      //   this.list = list
      //   this.page.total = totalRow
      // } catch (err) {
      //   this.$message({ type: 'error', message: '获取数据列表失败' })
      // } finally {
      //   this.loading.dataList = false
      // }
    },
    handleEdit (row) { // 数据编辑
      this.isEditData = true
      this.currentEditData = row
    },
    handleDown (row) { // 数据提取
      this.isDownData = true
      this.currentDownData = row
    },
    handleSearch () { // 检索
      this.page.pageNum = 1
      this.getList()
    },
    // getType (row, column, cellValue, index) {
    //   return this.dataType.find(item => item.value === cellValue).name
    // },
    // getExt (row, column, cellValue, index) {
    //   return this.dataType.find(item => item.value === cellValue).ext
    // },
    handleLevel1Change (id) {
      this.search.level2 = null
      this.searchItems[1].selectOption = id ? this.dir[this.dir.findIndex(item => item.id === id)].children.map(({ name, id }) => ({ name, value: id })) : []
    }
  },
  created () {
    this.searchItems = [
      { id: 1, label: '操作人名称', type: 'input', value: 'name', placeholder: '请输入操作人名称' },
      // { id: 2, type: 'select', value: 'level2', placeholder: '请选择二级分类', selectOption: [] },
      { id: 3, label: '操作IP', type: 'input', value: 'name', placeholder: '请输入操作IP' },
      { id: 5, label: '记录时间', type: 'date-picker', value: 'times' },
      { id: 6, type: 'button', btnType: 'danger', btnTxt: '检索' }
    ]
  },
  mounted () {
    this.searchItems[0].selectOption = this.dir.map(({ name, id, children }) => ({ name, value: id, children }))
  },
  computed: {
    ...mapGetters(['dir'])
  }
}
</script>
<style lang="scss" scoped>

</style>
