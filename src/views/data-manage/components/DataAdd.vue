<template>
  <el-dialog center width="350px" title="添加数据" :visible="dialog" @close="$emit('update:dialog', false)">
    <el-form ref="dataAddForm" :model="form" :rules="dataAddRules" size="mini">
      <el-form-item label-width="80px" label="数据名称" prop="name">
        <el-input placeholder="请输入数据名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="所属时间" prop="data_time">
        <el-date-picker
          v-model="form.data_time"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label-width="80px" label="上传文件" prop="file">
        <el-upload
          class="upload-demo"
          accept=".zip"
          action=""
          :file-list="fileList"
          :http-request="handleChooseFile">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">支持扩展名：.zip</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleAdd">立即添加</el-button>
      <el-button @click="$emit('update:dialog', false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { dataAddRules } from '@/utils/formRules'
import { dataAdd } from '@/api'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        data_time: '',
        file: null
      },
      dataAddRules,
      fileList: []
    }
  },
  methods: {
    handleChooseFile ({ file }) {
      const { name } = file
      const names = name.split('.')
      const suffix = names[names.length - 1].toLocaleLowerCase()
      if (suffix !== 'zip') {
        this.fileList = []
        this.$message({ type: 'warning', message: '文件类型只能为zip格式' })
      } else {
        this.form.file = file
        this.fileList = [{ name }]
      }
    },
    handleAdd () {
      this.$formValidate(this, 'dataAddForm').then(async () => {
        const formData = new FormData()
        formData.append('id', this.$route.params.id)
        formData.append('name', this.form.name)
        formData.append('data_time', this.form.data_time)
        formData.append('file', this.form.file)
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
          this.$message({ type: 'success', message: '添加成功' })
        } catch (e) {
          console.log(e)
        } finally {
          load.close()
        }
      })
    }
  }
}
</script>
