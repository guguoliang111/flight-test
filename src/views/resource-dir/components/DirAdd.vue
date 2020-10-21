<template>
  <el-dialog class="dir-add-page" center width="490px" title="编辑目录" :visible="dialog"
    @close="$emit('update:dialog', false)"
    @closed="handleClosed">
      <el-form ref="dirAddForm" :model="form" size="mini">
        <el-form-item label-width="80px" label="一级目录" prop="level1">
          <el-autocomplete
            v-model="form.level1"
            :fetch-suggestions="getDirList"
            placeholder="请选择或输入一级目录"
            @select="handleSelect($event, 1)">
          </el-autocomplete>
        </el-form-item>
        <el-form-item label-width="80px" label="二级目录" prop="level2">
          <el-autocomplete
            v-model="form.level2"
            :fetch-suggestions="getSubDirList"
            :disabled="!form.level1"
            placeholder="请选择或输入二级目录"
            @focus="handleFocus($event, 2)"
            @select="handleSelect($event, 2)">
          </el-autocomplete>
        </el-form-item>
        <el-form-item label-width="80px" label="三级目录" prop="level3">
          <el-autocomplete
            v-model="form.level3"
            :fetch-suggestions="getSubDirList"
            :disabled="!form.level2"
            placeholder="请选择或输入三级目录"
            @focus="handleFocus($event, 3)"
            @select="handleSelect($event, 3)">
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <el-button type="danger" @click="handleDel">删除</el-button>
        <el-button @click="$emit('update:dialog', false)">取消</el-button>
      </div>
  </el-dialog>
</template>

<script>
import { dirList, subDirList, dirAdd, dirDelete } from '@/api/api'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dir: {
        level1: [],
        level2: [],
        level3: []
      },
      form: {
        level1: '',
        level2: '',
        level3: ''
      },
      currentDir: 1,
      currentSelectDir: {
        level1: null,
        level2: null,
        level3: null
      }
    }
  },
  methods: {
    handleFocus (e, flag) {
      this.currentDir = flag
    },
    handleSelect ({ id }, flag) {
      this.currentSelectDir[`level${flag}`] = id
    },
    async handleAdd () {
      if (this.form.level3 || this.form.level2 || this.form.level1) {
        const { data } = await dirAdd(this.form)
        this.$message({ type: 'success', message: data.msg })
        this.handleClosed()
      } else {
        this.$message({ type: 'warning', message: '至少选择或填写一级目录' })
      }
    },
    async handleDel () {
      let delDirId = null
      if (this.form.level3) {
        delDirId = this.dir.level3.find(item => item.name === this.form.level3).id
      } else if (this.form.leve2) {
        delDirId = this.dir.level2.find(item => item.name === this.form.level2).id
      } else if (this.form.level1) {
        delDirId = this.dir.level1.find(item => item.name === this.form.level1).id
      }
      if (delDirId) {
        await dirDelete({ id: delDirId })
        this.$message({ type: 'success', message: '目录删除成功' })
        this.handleClosed()
      } else {
        this.$message({ type: 'warning', message: '至少选择或填写一级目录' })
      }
    },
    getDirList (queryString, cb) { // 一级目录
      dirList({ level: 1 }).then(({ data }) => {
        this.dir.level1 = data.data
        cb(this.dir.level1.map(item => ({ ...item, value: item.name })))
      })
    },
    getSubDirList (queryString, cb) { // 子目录
      if (this.form[`level${this.currentDir - 1}`]) {
        try {
          subDirList({ parentId: this.currentSelectDir[`level${this.currentDir - 1}`] }).then(({ data }) => {
            this.dir[`level${this.currentDir}`] = data.data
            cb(this.dir[`level${this.currentDir}`].map(item => ({ ...item, value: item.name })))
          })
        } catch (err) {
          cb()
          this.$message({ type: 'error', message: '获取子目录失败' })
        }
      } else {
        cb()
        this.$message({ type: 'warning', message: '请先选择上级目录' })
      }
    },
    handleClosed () {
      this.currentDir = 1
      this.dir = {
        level1: [],
        level2: [],
        level3: []
      }
      this.form = {
        level1: '',
        level2: '',
        level3: ''
      }
      this.currentSelectDir = {
        level1: null,
        level2: null,
        level3: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dir-add-page {
    .el-autocomplete {
      width: 100%;
    }
  }
</style>
