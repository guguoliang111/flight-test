<template>
  <div class="par_filtrs">
    <div class="build-title">构建参数组向导</div>
    <div class="par_filtrs-div">
      <div class="par_filtrs_title">条件查询</div>
      <div class="par_filtrs_form">
        <el-form v-model="form">
          <el-form-item label="参数名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="科目">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="试验点">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="参数类型">
            <el-input ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="par_filtrs_title">挑选参数</div>
      <div class="par_filtrs_com">
        <el-transfer v-model="value" :data="data"></el-transfer>
        <div class="butt">
          <el-button type="primary">确定</el-button>
          <el-button type="primary" @click="Return">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParameterFiltrs',
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`
        })
      }
      return data
    }
    return {
      form: {},
      data: generateData(),
      value: [1, 4]
    }
  },
  methods: {
    Return () {
      this.$parent.$parent.dialogVisible = false
      console.log(this.$parent)
    }
  }
}
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.par_filtrs{
  width: 670px;
  margin-left: 30px;
  .build-title,.par_filtrs_title{
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    background-color: #64aaeb;
    justify-content: center;
    font-size: 20px;
    color: rgb(90, 86, 86);
  }
  .par_filtrs-div{
    border: 1px solid #cec2c2;
    padding: 10px;
    box-sizing: border-box;
    .par_filtrs_form{
      border: 1px solid #cec2c2;
    }
    .par_filtrs_com{
      border: 1px solid #cec2c2;
      padding: 10px;
      box-sizing: border-box;
      .el-transfer{
        @{deep}.el-transfer-panel{
          width: 240px;
        }
        @{deep}.el-button{
          border: 1px solid #dcdfe6;
          color: #c0c4cc;
          border-radius: 100%;
          width: 46px;
          height: 46px;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          @{deep}.el-icon-arrow-left{
            font-size: 16px;
          }
        }
        @{deep}.is-disabled{
          background-color: #f5f7fa;
        }
      }
      .butt{
        width: 100%;
        display: flex;
        justify-content: center;
        .el-button{
          margin: 10px 30px 0 30px;
        }
      }
    }
    .el-form{
      display: flex;
      flex-wrap: wrap;
      @{deep}.el-form-item__label{
        width: 100px;
      }
    }
  }
}
</style>
