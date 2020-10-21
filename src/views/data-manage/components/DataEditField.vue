<template>
  <el-dialog center width="490px" title="添加数据" :visible="show" @close="$emit('update:show', false)" @open="handleOpen">
    <el-form ref="dataAddForm" :model="form" size="mini">
      <el-form-item label-width="80px" :label="item" v-for="item in generateForm" :key="item">
        <el-input v-model="form[item]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleAdd">立即添加</el-button>
      <el-button @click="$emit('update:show', false)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { dataEditFieldSave } from '@/api/api'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    field: {
      type: Object,
      default: () => ({})
    },
    latlngs: {
      default: null
    }
  },
  data () {
    return {
      generateForm: [],
      form: {}
    }
  },
  methods: {
    handleOpen () {
      this.generateForm = Object.keys(this.field)
      this.generateForm.forEach(item => {
        this.$set(this.form, item, '')
      })
    },
    async handleAdd () {
      const { data } = await dataEditFieldSave({
        id: this.$route.query.id,
        json: this.form,
        latlons: this.latlngs.map(item => `${item.lat} ${item.lng}`).join(',')
      })
      console.log(data)
    }
  }
}
</script>
