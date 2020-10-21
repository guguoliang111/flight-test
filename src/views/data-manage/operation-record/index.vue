<template>
  <div class="data-manage-list">
    <search-form :items="searchItems" :search="search" @btnClick="handleSearch" />
    <div class="other-btns">
      <el-button type="danger" size="mini" class="btn" @click="handleDeletBatch" >批量删除</el-button>
      <el-button type="warning" size="mini" @click="handleOpenAdd" class="btn">添加</el-button>
    </div>
    <el-table
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
        <el-table-column prop="name" label="地块名称" align="center"></el-table-column>
        <el-table-column prop="type" label="种植作物" align="center"></el-table-column>
        <el-table-column prop="username" label="操作人姓名" align="center"></el-table-column>
        <el-table-column prop="content" label="操作内容" align="center"></el-table-column>
        <el-table-column prop="time" label="操作时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除这条数据吗？" @onConfirm="deletBatch([scope.row.id])">
              <el-button type="text" size="mini" style="margin-left: 10px;" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
    <pagination class="pagination" :page="page" @changePage="changePage"></pagination>
    <record-add :dialog.sync="dialog" :data-type="dataType" :data="update ? currentRow : {}" :update="update" />
  </div>
</template>

<script>
import { getOperationRecord, operationRecordDel } from '@/api/api'
import pagination from '@/mixins/pagination'
import SearchForm from '@/components/SearchForm'
import RecordAdd from '../components/RecordAdd'

export default {
  components: {
    SearchForm,
    RecordAdd
  },
  mixins: [pagination],
  data () {
    return {
      searchItems: [],
      search: {
        name: '',
        type: '',
        username: '',
        time: []
      },
      dataType: [
        { id: 1, name: '玉米', value: '玉米' },
        { id: 2, name: '小麦', value: '小麦' },
        { id: 3, name: '大豆', value: '大豆' },
        { id: 4, name: '花生', value: '花生' }
      ],
      loading: {
        dataList: false
      },
      dialog: false,
      currentRow: {},
      update: false
    }
  },
  methods: {
    async getList () { // 数据列表
      this.loading.dataList = true
      try {
        const { data } = await getOperationRecord({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          ...this.search
        })
        this.list = data.data.list
        this.page.total = data.data.totalRow
      } catch (err) {
        this.$message({ type: 'error', message: '获取数据列表失败' })
      } finally {
        this.loading.dataList = false
      }
    },
    async dataAddHandle () { // 数据添加
    },
    async deletBatch (id) { // 数据删除
      const { data: { state } } = await operationRecordDel({ id })
      if (state === 'ok') {
        this.$message({ type: 'success', message: '删除成功' })
        this.pageNum = 1
        this.getList()
      }
    },
    handleDeletBatch () { // 批量删除
      if (this.multipleSelection.length > 0) {
        const ids = this.multipleSelection.map(item => item.id)
        this.deletBatch(ids)
      } else {
        this.$message({ type: 'warning', message: '请先选择要删除的数据' })
      }
    },
    handleEdit (row) { // 数据编辑
      this.update = true
      this.currentRow = row
      this.dialog = true
    },
    handleSearch () { // 检索
      this.page.pageNum = 1
      this.getList()
    },
    handleOpenAdd () {
      this.update = false
      this.dialog = true
    }
  },
  created () {
    this.searchItems = [
      { id: 1, label: '地块名称', type: 'input', value: 'name', placeholder: '请输入地块名称' },
      { id: 2, label: '种植作物', type: 'select', value: 'type', placeholder: '请选择种植作物', selectOption: this.dataType },
      { id: 3, label: '操作人姓名', type: 'input', value: 'username', placeholder: '请输入操作人姓名' },
      { id: 4, label: '操作时间', type: 'date-picker', value: 'time' },
      { id: 5, type: 'button', btnType: 'danger', btnTxt: '检索' }
    ]
  }
}
</script>

<style lang="scss">
  .data-manage-list {
    .other-btns {
      margin-bottom: 10px;
    }
  }
</style>
