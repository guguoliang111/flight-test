<template>
  <div>
    <div class="parman">
      <div class="title">试飞数据查看</div>
      <div>
        <el-form v-model="form">
          <div>
            <div class="formInt">
              <el-form-item label="参数名">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="参数代号">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="参数类型">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="数据类型">
                <el-input></el-input>
              </el-form-item>
            </div>
            <div class="formInt">
              <el-form-item label="参数名">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="参数代号">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="参数类型">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="数据类型">
                <el-input></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">重置</el-button>
            <el-button type="primary" @click="buildPar">构建参数组</el-button>
          </div>
          <BuildParameters ref="RefBuildParameters" />
        </el-form>
      </div>
      <div>
          <el-table
          :data="tableData"
          height="600"
          border
          style="width: 100%">
          <el-table-column  align="center" prop="para_num" label="序号"></el-table-column>
          <el-table-column  align="center" prop="para_name" label="参数名"></el-table-column>
          <el-table-column  align="center" prop="para_code" label="参数代号"></el-table-column>
          <el-table-column  align="center" prop="para_type" label="参数类型"></el-table-column>
          <el-table-column  align="center" prop="Samples" label="采样率"></el-table-column>
          <el-table-column  align="center" prop="data_type" label="数据类型"></el-table-column>
          <el-table-column  align="center" prop="Resolu" label="分辨率"></el-table-column>
          <el-table-column  align="center" prop="Subjects" label="科目"></el-table-column>
          <el-table-column  align="center" prop="Testpoints" label="试验点"></el-table-column>
          <el-table-column  align="center" prop="value_sec" label="参数取值范围"></el-table-column>
          <el-table-column  align="center" prop="Desc" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import BuildParameters from './components/build-parameters'
export default {
  name: 'flightTestPM',
  components: {
    BuildParameters
  },
  data () {
    return {
      form: {},
      tableData: [
        {
          para_name: '22222',
          para_code: '2222',
          para_type: '429',
          Samples: '32',
          data_type: 'int'
        }
      ]
    }
  },
  methods: {
    buildPar () {
      this.$refs.RefBuildParameters.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.parman{
  width: 100%;
  .title{
    width: 100%;
    height: 60px;
    background-color: rgb(130, 184, 245);
    line-height: 60px;
    text-align: center;
    font-size: 28px;
  }
  .el-form{
    display: flex;
    align-items: center;
    .formInt{
      display: flex;
      align-items: center;
    }
    .el-form-item{
      display: flex;
      align-items: center;
      margin: 3px 20px;
      .el-form-item__label{
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        background-color: #64aaeb;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
}
</style>
