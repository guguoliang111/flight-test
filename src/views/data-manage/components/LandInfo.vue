<template>
  <el-form class="land-info" ref="landInfo" :model="landInfo" :rules="landRules" size="medium" label-width="110px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="地块名称" prop="dk_name">
          <el-input v-model="landInfo.dk_name" placeholder="请输入地块名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地块亩数(亩)" prop="dk_farmland">
          <el-input v-model="landInfo.dk_farmland" placeholder="请输入地块亩数"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地块周长(米)" prop="dk_perimeter">
          <el-input v-model="landInfo.dk_perimeter" placeholder="请输入地块周长"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地块类型" prop="type">
          <el-input v-model="landInfo.type" placeholder="请输入地块类型"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="土地类型" prop="dk_type">
          <el-input v-model="landInfo.dk_type" placeholder="请输入土地类型"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="海拔(米)" prop="dk_altitude">
          <el-input v-model="landInfo.dk_altitude" placeholder="请输入海拔"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="坡度(度)" prop="dk_slope">
          <el-input v-model="landInfo.dk_slope" placeholder="请输入坡度"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="密度" prop="dk_density">
          <el-input v-model="landInfo.dk_density" placeholder="请输入密度"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="灌溉方式" prop="dk_irrigation">
          <el-input v-model="landInfo.dk_irrigation" placeholder="请输入灌溉方式"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地址" prop="dk_address">
        <el-input v-model="landInfo.dk_address" placeholder="请输入地址"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="播种日期" prop="time">
          <el-date-picker
            v-model="landInfo.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleDateChange">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="种植户" prop="dk_growers">
          <el-input v-model="landInfo.dk_growers" placeholder="请输入种植户"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系方式" prop="dk_phone">
          <el-input v-model="landInfo.dk_phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="负责人" prop="dk_person">
          <el-input v-model="landInfo.dk_person" placeholder="请输入负责人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属农场" prop="dk_farm">
          <el-input v-model="landInfo.dk_farm" placeholder="请输入所属农场"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="施肥建议" prop="dk_fertilizer">
          <el-input type="textarea" v-model="landInfo.dk_fertilizer"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="confirm(latlngs.length > 0 ? 'add' : 'update')">确定</el-button>
      <el-button @click="$emit('closeDrawer')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateLandInfo, addLand } from '@/api'
import { landRules } from '@/utils/formRules'

export default {
  name: 'LandInfo',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    latlngs: {
      type: Array
    },
    layer: {
      type: Object
    },
    shape: {
      type: String
    }
  },
  data () {
    return {
      landRules,
      landInfo: {}
    }
  },
  methods: {
    async confirm (flag) {
      this.$formValidate(this, 'landInfo').then(async () => {
        if (flag === 'update') {
          await updateLandInfo(this.landInfo)
        } else {
          await addLand(this.landInfo)
          this.layer.remove()
          this.$parent.$parent.getList()
        }
        this.$message({ type: 'success', message: '发布成功' })
      })
    },
    handleDateChange (date) {
      this.landInfo.dk_begin_time = date[0]
      this.landInfo.dk_end_time = date[1]
    }
  },
  created () {
    this.landInfo = this.data
    this.landInfo.name = this.shape
    const latlngsStr = this.latlngs.map(({ lat, lng }) => `${lng} ${lat}`).join(',')
    this.$set(this.landInfo, 'latlons', latlngsStr || '')
    this.$set(this.landInfo, 'time', (this.data.dk_begin_time || this.data.dk_end_time) ? [this.data.dk_begin_time, this.data.dk_end_time] : [])
  }
}
</script>

<style lang="scss">
  .land-info {
    .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409eff;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 98px;
        height: 98px;
        line-height: 98px;
        text-align: center;
      }
      .avatar {
        width: 98px;
        height: 98px;
        display: block;
      }
    }
    .el-date-editor {
      width: 100%;
      .el-range-separator {
        padding: 0 15px;
      }
    }
  }
</style>
