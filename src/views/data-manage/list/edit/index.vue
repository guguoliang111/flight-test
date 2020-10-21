<template>
  <el-dialog
    class="choose-dir"
    title="编辑"
    :visible="isEditData"
    @open="handleOpen"
    @close="$emit('update:isEditData', false)"
    width="30%"
    center>
    <el-row>
      <el-col :span="5">
        <label>选择父级</label>
      </el-col>
      <el-col :span="9">
        <el-select v-model="editDataDir.level1" placeholder="一级目录" @change="handleDirChange">
          <el-option
            v-for="i in dir"
            :key="i.id"
            :label="i.name"
            :value="i.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-select v-model="editDataDir.level2" placeholder="二级目录">
          <el-option
            v-for="i in level2Dir"
            :key="i.id"
            :label="i.name"
            :value="i.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:isEditData', false)">取 消</el-button>
      <el-button type="primary" @click="handleUpdate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { changeDataDir } from '@/api/api'

export default {
  name: 'DataEdit',
  props: ['isEditData', 'dir', 'currentRow'],
  data () {
    return {
      editDataDir: {
        level1: '',
        level2: ''
      },
      level2Dir: []
    }
  },
  methods: {
    async handleUpdate () {
      if (this.editDataDir.level2 || this.editDataDir.level1) {
        try {
          await changeDataDir({
            directory_id: this.editDataDir.level2 || this.editDataDir.level1,
            data_id: this.currentRow.id
          })
          this.$message({ type: 'success', message: '修改成功' })
          this.$emit('update:isEditData', false)
          this.editDataDir = {
            level1: '',
            level2: ''
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message({ type: 'warning', message: '请先选择目录' })
      }
    },
    handleDirChange (id) {
      this.level2Dir = this.dir[this.dir.findIndex(item => item.id === id)].children.map(({ name, id }) => ({ name, value: id }))
    },
    handleOpen () {}
  }
}
</script>

<style lang="scss">
  .choose-dir {
    .el-dialog {
      height: 200px;
      min-height: 200px;
      label {
        line-height: 36px;
      }
    }
  }
</style>
