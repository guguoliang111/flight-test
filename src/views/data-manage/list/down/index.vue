<template>
  <el-dialog
    class="choose-dir"
    title="数据提取"
    :visible="isDownData"
    width="30%"
    center
    @open="handleOpen"
    @close="$emit('update:isDownData', false)">
    <el-row>
      <el-col :span="5">
        <label>选择日期</label>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:isDownData', false)">取 消</el-button>
      <el-button type="primary" @click="handleDown">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { dataDown } from '@/api'
// import { saveAs } from 'file-saver'

export default {
  name: 'DataDown',
  props: ['isDownData', 'currentRow'],
  data () {
    return {
      date: ''
    }
  },
  methods: {
    async handleDown () {
      if (this.date) {
        try {
          await dataDown({
            id: this.currentRow.id,
            time: this.date
          })
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message({ type: 'warning', message: '请先选择日期' })
      }
    },
    handleOpen () {
      this.date = ''
    }
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
