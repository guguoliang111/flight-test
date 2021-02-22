<template>
  <div style="width: 350px">
    <div class="build-title">构建参数组向导</div>
    <div class="build-form">
      <el-form v-model="form">
        <el-form-item label="参数组名称">
          <el-input></el-input>         
        </el-form-item>
        <el-form-item label="采样率">
          <el-input></el-input>         
        </el-form-item>
        <el-form-item label="分隔符">
          <el-input></el-input>         
        </el-form-item>
        <el-form-item class="build-but">
          <el-button type="primary">添加参数</el-button>
          <el-button type="primary">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildForm',
  data () {
    return {
      form: {}
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.build-title{
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background-color: #64aaeb;
  justify-content: center;
  font-size: 20px;
  color: rgb(90, 86, 86);
}
.build-form{
  display: flex;
  justify-content: center;
  border: 1px solid #cec2c2;
  border-top: none;
  .el-form-item{
    justify-content: flex-end;
  }
  .build-but{
  .el-button{
      margin-right: 30px;
      width: 100px;
    }
  }
  
}
</style>