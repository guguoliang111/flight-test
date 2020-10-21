<template>
  <div class="xlsx-view-list">
    <!-- 搜索表单组件 -->
    <search-form :items="searchItems" :search="search" @btnClick="handleSearch" />
    <div class="other-btns">
      <el-button type="danger" size="mini" class="btn" @click="handleDeletBatch" >批量删除</el-button>
      <el-button type="primary" size="mini" class="btn" @click="handleDownBatch" >数据提取</el-button>
      <el-button type="warning" size="mini" @click="handleOpenAdd" class="btn">添加</el-button>
      <el-button type="primary" size="mini" class="btn goback" @click="$router.go(-1)" >返回上级</el-button>
    </div>
    <el-table
      v-if="currentType === '1'"
      :data="list"
      ref="taskTable"
      stripe
      :header-row-style="{ background: '#D0EDF7', color: '#303331' }"
      style="width: 100%;font-size: 14px;"
      size="mini"
      v-loading="loading.dataList"
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"/>
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column prop="product" label="产品/品种" align="center"></el-table-column>
        <el-table-column prop="place" label="所在产地" align="center"></el-table-column>
        <el-table-column prop="price" label="价格" align="center"></el-table-column>
        <el-table-column prop="status" label="升/降" align="center"></el-table-column>
        <el-table-column prop="status" label="走势图" align="center"></el-table-column>
        <el-table-column prop="up_time" label="时间" align="center"></el-table-column>
    </el-table>
    <el-table
      v-else
      :data="list"
      ref="taskTable"
      stripe
      :header-row-style="{ background: '#D0EDF7', color: '#303331' }"
      style="width: 100%;font-size: 14px;"
      size="mini"
      v-loading="loading.dataList"
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"/>
        <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
        <el-table-column v-for="(val, key) of tableData" :label="val" :prop="key" :key="key" align="center"></el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination class="pagination" :page="page" @changePage="changePage"></pagination>
    <!-- 上传组件 -->
    <data-upload :is-upload-data.sync="isUploadData" @updateList="handleUpdateList" />
  </div>
</template>

<script>
import { getExcelData, getProductCategory, deleteExcelData } from '@/api/api'
import { downExcelData } from '@/api'
import pagination from '@/mixins/pagination'
import SearchForm from '@/components/SearchForm'
import DataUpload from './upload'
import { saveAs } from 'file-saver'

export default {
  components: {
    SearchForm,
    DataUpload
  },
  mixins: [pagination],
  data () {
    return {
      isUploadData: false,
      searchItems: [],
      search: {
        name: '',
        address: '',
        times: []
      },
      dataType: [],
      loading: {
        dataList: false
      },
      currentEditData: {},
      currentDownData: {},
      currentType: '1',
      tableData: {}
    }
  },
  methods: {
    async getList () { // 数据列表
      this.loading.dataList = true
      try {
        const { data: { page: { list, totalRow }, fields } } = await getExcelData({
          id: parseInt(this.$route.params.id),
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          ...this.search
        })
        if (this.currentType !== '1') {
          this.tableData = fields.reduce((obj, item) => {
            if (item.fldcnn !== 'Id') {
              const key = item.fldname
              obj[key] = item.fldcnn
              return obj
            } else {
              return obj
            }
          }, {})
        }
        this.list = list
        this.page.total = totalRow
      } catch (err) {
        this.$message({ type: 'error', message: '获取数据列表失败' })
      } finally {
        this.loading.dataList = false
      }
    },
    async getCategory () {
      const { data: { list } } = await getProductCategory({
        id: parseInt(this.$route.params.id)
      })
      this.dataType = list.map((item, index) => {
        return {
          id: index + 1,
          name: item,
          value: item
        }
      })
    },
    handleSearch () { // 检索
      this.page.pageNum = 1
      this.getList()
    },
    handleUpdateList () {
      this.handleSearch()
    },
    handleOpenAdd () {
      this.isUploadData = true
    },
    async deletBatch (ids) {
      const { data: { state } } = await deleteExcelData({
        id: parseInt(this.$route.params.id),
        ids
      })
      if (state === 'ok') {
        this.$message({ type: 'success', message: '删除成功' })
        this.pageNum = 1
        this.getList()
      }
    },
    async downBatch (ids) {
      const result = await downExcelData({
        id: parseInt(this.$route.params.id),
        ids
      })
      saveAs(result)
    },
    handleDeletBatch () {
      if (this.multipleSelection.length > 0) {
        const ids = this.multipleSelection.map(item => item.id)
        this.deletBatch(ids)
      } else {
        this.$message({ type: 'warning', message: '请先选择要删除的数据' })
      }
    },
    handleDownBatch () {
      if (this.multipleSelection.length > 0) {
        const ids = this.multipleSelection.map(item => item.id)
        this.downBatch(ids)
      } else {
        this.$message({ type: 'warning', message: '请先选择要提取的数据' })
      }
    }
  },
  async created () {
    this.currentType = this.$route.params.type
    if (this.currentType === '1') {
      await this.getCategory()
      this.searchItems = [
        { id: 1, label: '产品/品种', type: 'select', value: 'name', changeEvent: true, placeholder: '请选择产品/品种', filterable: true, selectOption: this.dataType },
        { id: 2, label: '所在产地', type: 'input', value: 'address', placeholder: '请输入所在产地' },
        { id: 3, label: '时间', type: 'date-picker', value: 'times' },
        { id: 4, type: 'button', btnType: 'danger', btnTxt: '检索' }
      ]
    } else {
      this.page.pageSize = 17
      this.getList()
    }
  }
}
</script>

<style lang="scss">
  .xlsx-view-list {
    .other-btns {
      margin-bottom: 10px;
      position: relative;
      .goback {
        position: absolute;
        right: 0;
      }
    }
  }
</style>
