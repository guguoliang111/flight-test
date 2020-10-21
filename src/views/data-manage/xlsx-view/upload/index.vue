<template>
  <el-dialog
    class="choose-dir"
    title="添加数据"
    :visible="isUploadData"
    width="30%"
    center
    @open="handleOpen"
    @close="$emit('update:isUploadData', false)">
    <el-row>
      <el-col :span="24">
        <p>数据上传有一定的格式要求，请<el-link type="primary" @click="getTemplate">点击下载</el-link>格式说明文档，严格按照格式要求上传。</p>
      </el-col>
      <el-col :span="5">
        <label>文件上传</label>
      </el-col>
      <el-col :span="18">
        <el-upload
          class="upload-demo"
          action=""
          :http-request="handleUploadFile"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:isUploadData', false)">取 消</el-button>
      <el-button type="primary" @click="handleUploadData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { dataAdd, getXlsxTemplate } from '@/api'
import { saveAs } from 'file-saver'

export default {
  name: 'DataUpload',
  props: ['isUploadData'],
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    async handleUploadData () {
      if (this.file) {
        const formData = new FormData()
        formData.append('id', this.$route.params.id)
        formData.append('file', this.file)
        const load = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        try {
          const { list } = await dataAdd(formData)
          this.$emit('updateList', list)
          this.$emit('update:isUploadData', false)
          this.$message({ type: 'success', message: '添加成功' })
        } catch (e) {
          console.log(e)
        } finally {
          load.close()
        }
      } else {
        this.$message({ type: 'warning', message: '请先上传文件' })
      }
    },
    async getTemplate () {
      const result = await getXlsxTemplate({ id: this.$route.params.id })
      saveAs(result, 'template.xls')
    },
    handleOpen () {
      this.fileList = []
    },
    handleUploadFile ({ file }) {
      const { name } = file
      const names = name.split('.')
      const suffix = names[names.length - 1].toLocaleLowerCase()
      if (suffix === 'xlsx' || suffix === 'xls') {
        this.file = file
        this.fileList = [{ name }]
      } else {
        this.fileList = []
        this.$message({ type: 'warning', message: '文件类型只能为xlsx、xls格式' })
      }
    }
  }
}
</script>

<style lang="scss">
  .choose-dir {
    .el-dialog {
      height: 260px;
      min-height: 260px;
      p {
        line-height: 1.5;
        margin-bottom: 20px;
      }
      label {
        line-height: 36px;
      }
    }
  }
</style>
