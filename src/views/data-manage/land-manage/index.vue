<template>
  <div class="land-manage-page">
    <el-row :gutter="30">
      <el-col :span="4">
        <div class="left">
          <div class="title">地块列表</div>
          <el-scrollbar>
            <el-checkbox-group v-model="selectedLand">
              <el-checkbox v-for="item in landList" :label="item.id" :key="item.id" @change="handleCheckboxChange($event, item.id)">
                {{ item.dk_name }}
                <i class="el-icon-close" @click.prevent="deleteLand(item.id)"></i>
              </el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="right">
          <custom-map
            ref="cusMap"
            @drawRect="handleDrawRect"
            @drawPolygon="handleDrawPolygon">
          </custom-map>
          <div class="props-tips" v-if="showPropsTips">
            <el-scrollbar>
              <p v-for="(val, key) of field" :key="key">{{ key }}</p>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-drawer
      title="地块信息"
      :visible.sync="drawer"
      direction="rtl">
        <land-info :key="currentData.id || latlngs.join('')" :data="currentData.record" :latlngs="latlngs" :layer="layer" :shape="shape" @closeDrawer="drawer = false" />
    </el-drawer>
  </div>
</template>

<script>
import { getTkAllCenter, getDkDetail } from '@/api/api'
import { delLand } from '@/api'
import CustomMap from '../components/CustomMap'
import LandInfo from '../components/LandInfo'

export default {
  name: 'LandManage',
  components: {
    CustomMap,
    LandInfo
  },
  data () {
    return {
      selectedLand: [],
      landList: [],
      drawer: false,
      currentData: {},
      field: {},
      latlngs: [],
      showPropsTips: false,
      geojsonLayers: {},
      layer: null,
      shape: ''
    }
  },
  methods: {
    async getList () {
      const { data } = await getTkAllCenter()
      this.landList = data.center
    },
    async getLandDetail (id) {
      const { data } = await getDkDetail({ id })
      this.latlngs = []
      this.currentData = data
      this.currentData.id = data.record.id
      const layer = this.$refs.cusMap.addGeoJson(JSON.parse(this.currentData.geojson.st_asgeojson))
      this.geojsonLayers[id] = layer
      layer.on('click', (e) => {
        this.drawer = true
      })
    },
    handleDrawRect ({ latlngs, layer }) {
      console.log(latlngs, layer)
      layer.on('click', (e) => {
        this.currentData = {}
        this.latlngs = latlngs
        this.drawer = true
        this.layer = layer
        this.shape = '矩形'
      })
    },
    handleDrawPolygon ({ latlngs, layer }) {
      layer.on('click', (e) => {
        this.currentData = {}
        this.latlngs = latlngs
        this.drawer = true
        this.layer = layer
        this.shape = '多边形'
      })
    },
    handleCheckboxChange (flag, id) {
      if (flag) {
        this.getLandDetail(id)
      } else {
        this.geojsonLayers[id].remove()
        delete this.geojsonLayers[id]
      }
    },
    deleteLand (id) {
      this.$confirm('此操作将永久删除该地块, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delLand({ id })
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  },
  created () {
    this.selected = []
    this.getList()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.cusMap.showDrawBtn()
    })
  }
}
</script>

<style lang="scss">
  .land-manage-page {
    height: 100%;
    .el-row {
      height: 100%;
      .el-col {
        height: 100%;
        .left {
          height: 100%;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          .title {
            height: 35px;
            line-height: 35px;
            padding: 0 15px;
            background-color: #f0f0f0;
          }
          .el-scrollbar {
            height: calc(100% - 35px);
            .el-checkbox-group {
              padding: 15px;
              .el-checkbox {
                width: 100%;
                margin-bottom: 15px;
                .el-checkbox__label {
                  width: 100%;
                  position: relative;
                  &:hover {
                    i {
                      display: block;
                    }
                  }
                  i {
                    display: none;
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
              }
            }
          }
        }
        .right {
          height: 100%;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          position: relative;
          .props-tips {
            width: 160px;
            height: 100px;
            position: absolute;
            bottom: 10px;
            left: 10px;
            z-index: 999;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgba(0,0,0,0.65);
            .el-scrollbar {
              height: 100%;
              p {
                padding: 0 10px;
                margin: 5px 0;
              }
            }
          }
        }
      }
    }
    .el-drawer {
      width: 800px !important;
      .el-drawer__header {
        background-color: #49C4FF;
        margin-bottom: 0;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        span {
          color: #fff;
          outline: none;
          border: none;
        }
      }
      .el-drawer__body {
        padding: 20px;
      }
    }
  }
</style>
