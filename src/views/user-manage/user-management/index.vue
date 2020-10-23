<template>
  <div class="data-manage-list">
    <!-- 搜索表单组件 -->
    <search-form :items="searchItems" :search="search" @change="handleLevel1Change" @btnClick="handleSearch" />
    <div class="btn_box">
      <el-butto class="del">删除</el-butto>
      <el-butto class="change">添加</el-butto>
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
        <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="edit" label="用户角色" align="center" ></el-table-column>
        <el-table-column prop="people" label="联系电话" align="center" ></el-table-column>
        <el-table-column prop="juese" label="工作单位" align="center" ></el-table-column>
        <el-table-column prop="bigtime" label="入库时间" align="center" ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDown(scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
        },
        {
          name: '王小虎',
          edit: '普通用户',
          people: '15785647859',
          juese: '北京地物光谱实验室',
          bigtime: '2020-10-20  15:24:45'
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
      { id: 1, label: '用户名称', type: 'input', value: 'name', placeholder: '请输入申请人名称' },
      // { id: 2, type: 'select', value: 'level2', placeholder: '请选择二级分类', selectOption: [] },
      { id: 3, label: '用户角色', type: 'input', value: 'name', placeholder: '请输入用户角色' },
      { id: 5, label: '入库时间', type: 'date-picker', value: 'times' },
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
.btn_box {
  display: flex;
  margin-bottom: 10px;
  .del {
    background-color: #FE4B4B;
    padding: 3px 10px;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
  .change {
    margin-left: 10px;
    background-color: #4BC2FE;
    padding: 3px 10px;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
