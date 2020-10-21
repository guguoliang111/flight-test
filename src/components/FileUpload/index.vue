<!--
 * @Descripttion: coding...
 * @Version: 1.0.0版本
 * @Author: 张彤
 * @Date: 2020-06-28 15:33:59
 * @LastEditors: 张彤
 * @LastEditTime: 2020-06-28 16:17:37
-->

<template>
  <div class="upload-case">
    <button @click="selectFile">点击上传</button>
    <input class="file-input" ref="fileRef" type="file" :multiple="multiple" :accept="accept" @change="handleChange">
  </div>
</template>

<script>
import { fileUpload } from '@/api/index'
export default {
  props: {
    limit: {
      type: Number
    },
    accept: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    handleChange (e) {
      this.$nextTick(() => {
        this.files = e.target.files
        if (this.limit && this.files.length > this.limit) {
          this.$message.warning(`上传文件数不能超过${this.limit}`)
        } else {
          const formData = new FormData()
          formData.append('file', this.files[0])
          fileUpload({ url: this.action, file: formData }).then((res) => {
            console.log(res)
          })
        }
      })
    },
    selectFile () {
      console.log(this.$refs.fileRef)
      // this.$refs.fileRef.$el.click()
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-case {
    .file-input {
      display: none;
    }
  }
</style>
