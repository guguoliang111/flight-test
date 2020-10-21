<template>
  <div class="page-container">
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="4">
          <div class="left">
            <div class="title">
              图层列表
              <i class="el-icon-circle-plus-outline" @click="dialog = true"></i>
            </div>
            <el-checkbox-group v-model="selectedLayer">
              <el-checkbox v-for="item in layerList" :label="item.id" :key="item.id" @change="handleCheckboxChange($event, item)">
                {{ item.name }}
                <i class="el-icon-close" @click.prevent="deleteThisData(item.id)"></i>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="right">
            <custom-map ref="cusMap" />
            <el-button class="go-back" type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <data-add :dialog.sync="dialog" @updateList="handleUpdateList" />
  </div>
</template>

<script>
import { dataView, deleteDataLayer } from '@/api/api'
import { getShuiba } from '@/api'
import CustomMap from '../components/CustomMap'
import DataAdd from '../components/DataAdd'

export default {
  name: 'DataManage',
  components: {
    CustomMap,
    DataAdd
  },
  data () {
    return {
      layerList: [],
      selectedLayer: [],
      dialog: false
    }
  },
  methods: {
    handleCheckboxChange (flag, item) {
      const { id, url, type, maxX, maxY, minX, minY } = item
      if (flag) {
        if (type === 0) {
          if (this.$route.params.flag === '1') {
            this.handleShowGeoJson(id, url, { maxX, maxY, minX, minY })
          } else {
            const layer = this.$refs.cusMap.addShp([item])
            this.shpLayers[id] = layer
          }
        } else if (type === 1) {
          const layer = this.$refs.cusMap.addTif([item])
          this.tifLayers[id] = layer
        } else if (type === 3) {
          const layer = this.$refs.cusMap.addImg([item])
          this.imgLayers[id] = layer
        } else if (type === 4) {
          const layer = this.$refs.cusMap.addPolygon([item])
          this.polygonLayers[id] = layer
        }
      } else {
        if (type === 0) {
          if (this.$route.params.flag === '1') {
            this.shuibaLayers[id].remove()
            delete this.shuibaLayers[id]
          } else {
            this.shpLayers[id].remove()
            delete this.shpLayers[id]
          }
        } else if (type === 1) {
          this.tifLayers[id].remove()
          delete this.tifLayers[id]
        } else if (type === 3) {
          this.imgLayers[id].remove()
          delete this.imgLayers[id]
        } else if (type === 4) {
          this.polygonLayers[id].remove()
          delete this.polygonLayers[id]
        }
      }
    },
    async getDetail () {
      const { data: { list } } = await dataView({ id: this.$route.params.id })
      this.layerList = list
    },
    async handleShowGeoJson (id, url, bounds) {
      const { features } = await getShuiba('shuiba')
      const layer = this.$refs.cusMap.addShuiba(features)
      this.shuibaLayers[id] = layer
    },
    handleUpdateList (list) {
      this.layerList = list
    },
    deleteThisData (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteDataLayer({ ids: [id] })
        this.getDetail()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  },
  created () {
    this.getDetail()
    this.shpLayers = {}
    this.tifLayers = {}
    this.shuibaLayers = {}
    this.imgLayers = {}
    this.polygonLayers = {}
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    height: 100%;
    .box-card {
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
              position: relative;
              i {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
              }
            }
            .el-checkbox-group {
              padding: 15px;
              .el-checkbox {
                width: 100%;
                margin-bottom: 15px;
                ::v-deep .el-checkbox__label {
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
          .right {
            height: 100%;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            position: relative;
            .go-back {
              position: absolute;
              top: 20px;
              right: 20px;
              z-index: 999;
            }
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
    }
  }
</style>
