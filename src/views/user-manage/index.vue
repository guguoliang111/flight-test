<template>
  <div class="user-manage-page">
    <el-card>
      <search-form :items="searchItems" :search="search" @btnClick="handleSearch" />
      <div class="other-btns">
        <el-button type="danger" size="mini" class="btn" @click="handleDeletBatch" >批量删除</el-button>
      </div>
      <el-table
        :data="list"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        ref="taskTable"
        stripe
        :header-row-style="{ background: '#D0EDF7', color: '#303331' }"
        style="width: 100%;font-size: 14px;"
        size="mini" >
          <el-table-column type="selection" align="center" />
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column prop="username" label="用户名" align="left"></el-table-column>
          <el-table-column prop="realname" label="姓名" align="left"></el-table-column>
          <el-table-column prop="identity" label="注册角色" align="left"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="left"></el-table-column>
          <el-table-column prop="workaddress" label="工作地址" align="left"></el-table-column>
          <el-table-column prop="workunit" label="工作单位" align="left"></el-table-column>
          <el-table-column prop="creatime" label="注册时间" align="left"></el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-button type="text" :disabled="scope.row.status === 1" @click="handleClick(scope.row.user_id)">通过</el-button>
              <el-popconfirm title="确定删除这条数据吗？" @onConfirm="deletBatch([scope.row.user_id])">
                <el-button type="text" style="margin-left: 10px;" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
      </el-table>
      <pagination class="pagination" :page="page" @changePage="changePage"></pagination>
    </el-card>
  </div>
</template>

<script>
import { getUserList, auditUser, removeUser } from '@/api/index'
import { mapGetters } from 'vuex'
import pagination from '@/mixins/pagination'
import SearchForm from '@/components/SearchForm'

export default {
  name: 'UserManage',
  components: {
    SearchForm
  },
  mixins: [pagination],
  data () {
    return {
      searchItems: [],
      search: {
        username: '',
        roleId: null,
        time: []
      },
      userType: [
        { id: 1, name: '管理员', value: 2 },
        { id: 2, name: '普通用户', value: 4 }
      ],
      loading: false
    }
  },
  methods: {
    async getList () { // 获取用户列表
      this.loading = true
      try {
        const { data: { list, totalRow } } = await getUserList({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          ...this.search
        })
        this.list = list
        this.page.total = totalRow
      } catch (err) {
        this.$message({ type: 'error', message: '获取用户列表失败' })
      } finally {
        this.loading = false
      }
    },
    async deletBatch (ids) { // 数据删除
      const { data: { state, msg } } = await removeUser({ ids })
      if (state === 'ok') {
        this.$message({ type: 'success', message: msg })
        this.pageNum = 1
        this.getList()
      }
    },
    handleSearch () {
      this.page.pageNum = 1
      this.getList()
    },
    handleDeletBatch () {
      if (this.multipleSelection.length > 0) {
        const ids = this.multipleSelection.map(item => item.id)
        this.deletBatch(ids)
      } else {
        this.$message({ type: 'warning', message: '请先选择要删除的用户' })
      }
    },
    async handleClick (id) { // 点击通过
      const result = await auditUser({ id, status: 0 })
      if (result.state === 'ok') {
        this.$message({
          message: result.data,
          type: 'success'
        })
      } else {
        this.$message({
          message: result.data,
          type: 'error'
        })
      }
    },
    handleEditDir () {}
  },
  created () {
    this.searchItems = [
      { id: 1, label: '用户名', type: 'input', value: 'username', placeholder: '请输入用户名' },
      { id: 2, label: '注册角色', type: 'select', value: 'roleId', placeholder: '请选择角色', selectOption: this.userType },
      { id: 3, label: '注册时间', type: 'date-picker', value: 'time' },
      { id: 4, type: 'button', btnType: 'primary', btnTxt: '检索', btnClick: 'search' }
    ]
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss" scoped>
  .user-manage-page {
    height: 100%;
    border-radius: 6px;
    .el-card {
      height: 100%;
      .other-btns {
        margin-bottom: 10px;
      }
    }
  }
</style>
