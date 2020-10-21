<template>
  <el-dialog center width="500px" :title="update ? '修改田间操作' : '添加田间操作'" :visible="dialog" @close="$emit('update:dialog', false)" @open="handleOpen" @closed="handleClosed">
    <el-form ref="recordAddForm" :model="form" :rules="recordRules" size="mini">
      <el-form-item label-width="80px" label="地块名称" prop="name">
        <el-input placeholder="请输入地块名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="种植作物" prop="type">
        <el-select v-model="form.type" placeholder="请选择种植作物">
          <el-option v-for="item in dataType" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="80px" label="操作内容" prop="content">
        <el-input type="textarea" placeholder="请输入操作内容" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="上传图片" prop="img">
        <el-upload
          class="record-add-upload"
          accept=".png,.jpg,.jpeg"
          action=""
          multiple
          :limit="5"
          :file-list="fileList"
          list-type="picture-card"
          :on-remove="handleRemove"
          :http-request="handleUploadFile">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="$emit('update:dialog', false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { recordRules } from '@/utils/formRules'
import { addLandRecord, landRecordUpload, updateLandRecord } from '@/api'

export default {
  name: 'RecordAdd',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    dataType: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    },
    update: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        type: '',
        content: '',
        img: []
      },
      recordRules,
      fileList: []
    }
  },
  methods: {
    async handleUploadFile ({ file }) {
      const { name } = file
      const names = name.split('.')
      const suffix = names[names.length - 1].toLocaleLowerCase()
      if (suffix === 'png' || suffix === 'jpg' || suffix === 'jpeg') {
        const formData = new FormData()
        formData.append('file', file)
        try {
          const { url } = await landRecordUpload(formData)
          this.form.img.push(url)
          this.fileList.push({ name, url: this.$imgServer + url })
        } catch (e) {
          this.form.img = []
          this.fileList = []
        }
      } else {
        this.$message({ type: 'warning', message: '图片类型只能为png、jpg、jpeg格式' })
      }
    },
    confirm () {
      this.$formValidate(this, 'recordAddForm').then(async () => {
        try {
          if (this.update) {
            await updateLandRecord(this.form)
            this.$message({ type: 'success', message: '修改成功' })
          } else {
            await addLandRecord(this.form)
            this.$message({ type: 'success', message: '添加成功' })
          }
          this.$emit('update:dialog', false)
          this.$parent.handleSearch()
        } catch (e) {
          console.log(e)
        }
      })
    },
    handleRemove () {},
    handleOpen () {
      if (this.update) {
        this.form = { ...this.data }
        this.form.img = this.form.imgs.map(({ url }) => url)
        this.fileList = this.form.imgs.map(({ url }) => ({ url: this.$imgServer + url }))
      } else {
        this.form = {
          name: '',
          type: '',
          content: '',
          img: []
        }
      }
    },
    handleClosed () {
      this.fileList = []
    }
  }
}
</script>

<style lang="scss">
  .record-add-upload {
    .el-upload {
      width: 88px;
      height: 88px;
      line-height: 88px;
    }
    .el-upload-list__item {
      width: 88px;
      height: 88px;
    }
  }
</style>
