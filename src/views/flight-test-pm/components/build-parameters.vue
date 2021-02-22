<template>
  <div class="build-par">
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      :modal="false"
      width="58%"
      :before-close="handleClose">
      <div style="display: flex">
        <BuildForm />
        <ParameterFiltrs />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BuildForm from './build-form'
import ParameterFiltrs from './parameter-filtrs'
export default {
  name: 'BuildParameters',
  components: {
    BuildForm,
    ParameterFiltrs
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.build-par{

}
</style>
