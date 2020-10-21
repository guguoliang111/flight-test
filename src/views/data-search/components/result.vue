<template>
  <div class="search-result">
    <h5>
      查询结果
      <i class="el-icon-close" @click="handleCloseSearchResult"></i>
    </h5>
    <el-scrollbar class="search-data-list">
      <el-checkbox-group v-model="selected">
        <el-checkbox v-for="item in data" :label="item.id" :key="item.id" @change="handleCheckboxChange($event, item)">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: ['data', 'map', 'show'],
  data () {
    return {
      selected: []
    }
  },
  methods: {
    handleCheckboxChange (flag, item) {
      const { id, type } = item
      if (flag) {
        if (type === 0) {
          const layer = this.map.addShp([item])
          this.shpLayers[id] = layer
        } else if (type === 1) {
          const layer = this.map.addTif([item])
          this.tifLayers[id] = layer
        } else if (type === 3) {
          const layer = this.map.addImg([item])
          this.imgLayers[id] = layer
        } else if (type === 4) {
          const layer = this.map.addPolygon([item])
          this.polygonLayers[id] = layer
        }
      } else {
        if (type === 0) {
          this.shpLayers[id].remove()
          delete this.shpLayers[id]
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
    handleCloseSearchResult () {
      Object.keys(this.tifLayers).forEach(item => this.tifLayers[item].remove())
      Object.keys(this.shpLayers).forEach(item => this.shpLayers[item].remove())
      Object.keys(this.imgLayers).forEach(item => this.imgLayers[item].remove())
      Object.keys(this.polygonLayers).forEach(item => this.polygonLayers[item].remove())
      this.$emit('close')
    }
  },
  created () {
    this.tifLayers = {}
    this.shpLayers = {}
    this.imgLayers = {}
    this.polygonLayers = {}
  }
}
</script>

<style lang="scss">
  .search-result {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
    width: 200px;
    height: 350px;
    background-color: #fff;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    border-radius: 4px;
    h5 {
      position: relative;
      height: 35px;
      background-color:#62C5FF;
      line-height: 35px;
      padding: 0 10px;
      color: #fff;
      font-size: 14px;
      i {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
    .el-scrollbar {
      height: 315px;
      .el-checkbox-group {
        padding: 10px;
        .el-checkbox {
          width: 100%;
          margin-bottom: 15px;
          .el-checkbox__label {
            width: 100%;
          }
        }
      }
    }
  }
</style>
