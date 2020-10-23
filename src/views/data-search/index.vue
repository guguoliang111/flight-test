<template>
  <div class="data-search-page">
    <el-card>
      <el-row style="height: 100%">
        <el-col :span="24">
          <div class="top-tools">
            <el-row :gutter="1">
              <el-col class="tool-item" :span="5">
                <h4><i class="iconfont iconzuobiaodizhi-"></i> 快速定位</h4>
                <div>
                  <p style="width: 33%;display: inline-block;">
                    <el-popover
                      placement="bottom-start"
                      width="300"
                      trigger="click"
                      v-model="position.show">
                        <el-row class="data-search-popover">
                          <el-col :span="11">
                            <el-input v-model="position.lon" size="mini" clearable>
                              <template slot="prepend">经度：</template>
                            </el-input>
                          </el-col>
                          <el-col :span="2" style="text-align:center; line-height: 28px;">-</el-col>
                          <el-col :span="11">
                            <el-input v-model="position.lat" size="mini" clearable>
                              <template slot="prepend">纬度：</template>
                            </el-input>
                          </el-col>
                          <el-col :span="11" :offset="13" style="margin-top: 20px;">
                            <el-button type="info" size="mini" @click="position.show = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="jumpToPoint">确定</el-button>
                          </el-col>
                        </el-row>
                        <span style="width: 100%;" slot="reference">坐标</span>
                    </el-popover>
                  </p>
                  <!-- <p style="width: 33%;display: inline-block;">
                    <el-popover
                      placement="bottom-start"
                      width="300"
                      trigger="click"
                      v-model="chooseShp">
                      <el-row class="data-search-popover">
                        <el-col :span="24">
                          <el-upload
                            drag
                            action=""
                            accept=".zip"
                            :show-file-list="false"
                            :http-request="getPositionByShp">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                          </el-upload>
                        </el-col>
                      </el-row>
                      <span style="width: 100%;" slot="reference">SHP</span>
                    </el-popover>
                  </p> -->
                  <p style="width: 33%;display: inline-block;">
                    <el-popover
                      placement="bottom-start"
                      width="300"
                      trigger="click"
                      v-model="address.show">
                        <el-row class="data-search-popover">
                          <el-col :span="24">
                            <select-city :city-list="cityList" v-model="selectedCity" />
                          </el-col>
                          <el-col :span="11" :offset="13" style="margin-top: 20px;">
                            <el-button type="info" size="mini" @click="address.show = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="jumpToArea">确定</el-button>
                          </el-col>
                        </el-row>
                        <span style="width: 100%;" slot="reference">行政区</span>
                    </el-popover>
                  </p>
                </div>
              </el-col>
              <el-col class="tool-item" :span="6">
                <h4><i class="iconfont iconceliang"></i> 地图工具</h4>
                <div>
                  <span style="width: 33%;" @click="drawPoint">i查询</span>
                  <span style="width: 33%;" >漫游</span>
                  <!-- <span style="width: 33%;" @click="takeLineMeasure">距离量算</span> -->
                  <!-- <span style="width: 33%;" @click="takeAreaMeasure">面积量算</span> -->
                </div>
              </el-col>
              <el-col class="tool-item" :span="3">
                <h4><i class="iconfont icontiaojian"></i> 条件查询</h4>
                <div>
                  <el-popover
                    placement="bottom"
                    width="350"
                    trigger="click"
                    v-model="combineSearch">
                    <el-row class="data-search-popover">
                      <el-col :span="24">
                        <select-city :city-list="cityList" v-model="combine.city" />
                      </el-col>
                      <el-col :span="24">
                        <el-select v-model="combine.type" placeholder="请选择数据类型" clearable size="mini" style="width: 100%; margin: 15px 0;">
                          <el-option label="shp" :value="0"></el-option>
                          <el-option label="tiff" :value="1"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="24">
                        <el-date-picker
                          size="mini"
                          clearable
                          style="width: 100%;"
                          v-model="combine.date"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="11" :offset="13" style="margin-top: 20px;">
                        <el-button type="info" size="mini" @click="combineSearch = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="handleSearchByCondition">确定</el-button>
                      </el-col>
                    </el-row>
                    <span slot="reference">复合查询</span>
                  </el-popover>
                </div>
              </el-col>
              <el-col class="tool-item" :span="4">
                <h4><i class="iconfont iconkongjianchaxun"></i> 空间查询</h4>
                <div>
                  <span style="width: 49%;" @click="drawRect">矩形</span>
                  <span style="width: 49%;" @click="drawPolygon">多边形</span>
                </div>
              </el-col>
              <!-- <el-col class="tool-item" :span="6">
                <h4><i class="iconfont iconnewcoinhangqing"></i> 行情</h4>
                <div>
                  <p style="width: 32%;display: inline-block;">
                    <span @click="handleHQ('肥料价格')">肥料价格</span>
                  </p>
                  <p style="width: 32%;display: inline-block;">
                    <span @click="handleHQ('农药价格')">农药价格</span>
                  </p>
                  <p style="width: 36%;display: inline-block;">
                    <el-dropdown style="padding: 0; border-left: none;" @command="handleCommand">
                      <span class="el-dropdown-link">
                        作物价格<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="粮食作物">粮食作物</el-dropdown-item>
                        <el-dropdown-item command="油料作物">油料作物</el-dropdown-item>
                        <el-dropdown-item command="经济作物">经济作物</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </p>
                </div>
              </el-col> -->
            </el-row>
          </div>
        </el-col>
        <el-col :span="5" class="left-menu-col">
          <el-scrollbar class="left-menu">
            <div class="title">图层列表</div>
            <div class="menu-wrap">
              <el-tree
                ref="tree"
                :data="treeData"
                node-key="id"
                :render-content="renderNodes">
              </el-tree>
            </div>
          </el-scrollbar>
        </el-col>
        <el-col :span="19" class="right-map-col">
          <custom-map ref="cusMap"
            @drawPoint="handleDrawPoint"
            @drawLine="handleDrawLine"
            @drawRect="handleDrawRect"
            @drawPolygon="handleDrawPolygon" />
          <search-result v-if="showSearchResult" :map="$refs.cusMap" :data="searchResultData" @resultItemClick="resultItemClick" @close="handleCloseSearchResult" />
        </el-col>
      </el-row>
    </el-card>
    <!-- <el-dialog :title="pages.name" :visible.sync="dialogTableVisible" @close="closeDialog">
      <div class="search_box">
        <div class="lab_box">
          <label>作物名称</label>
          <el-input style="width: 170px" size="small" v-model="pages.type" placeholder="请输入作物名称"></el-input>
        </div>
        <div class="lab_box">
          <label>作物产地</label>
          <el-input style="width: 170px" size="small" v-model="pages.address" placeholder="请输入作物名称"></el-input>
        </div>
        <div class="lab_box">
          <label>时间</label>
          <el-date-picker
            style="width: 170px"
              size="small"
            v-model="pages.time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="lab_box">
          <el-button style="background-color: #1DC7EC; color:#fff" @click="searchIng" size="small">筛选</el-button>
        </div>
      </div>
      <el-table height="450" style="margin-top: 18px" :header-cell-style="{background:'#D4EDF9'}" :data="gridData">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="tag" width="100" label="产品/品种" align="center"></el-table-column>
        <el-table-column property="place" label="所在产地" align="center"></el-table-column>
        <el-table-column property="price" width="100"  label="价格" align="center"></el-table-column>
        <el-table-column property="status" label="升降" align="center"></el-table-column>
        <el-table-column property='' label="走势图" align="center">
          <template slot-scope="scope">
              <p v-if="scope.row.statuse === 2">
                <img src="@/assets/images/steady.png" alt="">
              </p>
              <p v-else-if="scope.row.statuse === 1">
                <img src="@/assets/images/goup.png" alt="">
              </p>
              <p v-else>
                <img src="@/assets/images/decline.png" alt="">
              </p>
          </template>
        </el-table-column>
        <el-table-column property="up_time" label="时间" align="center"></el-table-column>
      </el-table>
        <el-pagination style="text-align: center; margin-top: 20px" background layout="total, prev, pager, next, jumper" @current-change="setPage" :page-size="page.pageSize" @prev-click="setPage" @next-click="setPage" :total="page.total"></el-pagination>
    </el-dialog> -->
    <el-dialog title="作物品种" class="el_dialog" :visible.sync="isShow">
      <img class="img" src="@/assets/images/show.jpg" alt="">
    </el-dialog>
  </div>
</template>

<script>
import CustomMap from '../data-manage/components/CustomMap'
import SelectCity from '@/components/SelectCity'
import SearchResult from './components/result'
import pagination from '@/mixins/pagination'
import { getWeatherList, getEarlyWarning, uploadShp, getCitys, getCityPosition, getShuiba } from '@/api'
import { getLastData, searchByPoint, searchByArea, searchByCondition, getExcelData, getHnwjByNamer, getHnwfljgByName, getHnwnyjgByName } from '@/api/api'

export default {
  name: 'DataSearch',
  mixins: [pagination],
  components: {
    CustomMap,
    SelectCity,
    SearchResult
  },
  data () {
    return {
      isShow: false,
      dialog: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      position: {
        show: false,
        lon: null,
        lat: null
      },
      address: {
        show: false,
        province: '',
        city: '',
        county: ''
      },
      treeData: [],
      chooseShp: false,
      cityList: [],
      selectedCity: null,
      combineSearch: false,
      combine: {
        city: '',
        type: null,
        date: []
      },
      searchResultData: null,
      showSearchResult: false,
      dialogShow: false,
      dialogTableVisible: false,
      tpage: {
        pageNum: 1,
        pageSize: 10,
        id: ''
      },
      pages: {
        name: '',
        time: '',
        address: '',
        type: '',
        pageNum: 1,
        pageSize: 10
      },
      gridData: [],
      cropList: []
    }
  },
  methods: {
    async getLayerList () {
      const { oneLevelLists } = await getWeatherList()
      oneLevelLists.unshift({
        id: 'yj01',
        name: '预警',
        oneLevelData: [
          {
            id: 'yj02',
            name: '3H'
          },
          {
            id: 'yj03',
            name: '6H'
          },
          {
            id: 'yj04',
            name: '12H'
          },
          {
            id: 'yj05',
            name: '24H'
          }
        ]
      })
      this.treeData = this.recursiveList(oneLevelLists)
    },
    // 关闭弹框时触发
    closeDialog () {
      console.log(this.nodeId,this.$refs.tree,this.$refs.tree.getNode(this.nodeId))
      this.$refs.tree.setChecked(this.nodeId, false)
    },
    recursiveList (list) {
      return list.map(item => {
        if (item.oneLevelData && item.oneLevelData.length > 0) {
          return {
            id: item.id,
            label: item.name,
            children: this.recursiveList(item.oneLevelData)
          }
        } else {
          return {
            id: item.id,
            label: item.name,
            type: item.type
          }
        }
      })
    },
    renderNodes (h, { node, data, store }) {
      console.log(node.checked)
      return (
        <span class="custom-tree-node">
          {
            data.children && data.children.length > 0
              ? <span>{node.label}</span>
              : <el-checkbox checked = {node.checked} onChange={ (e) => { this.handleCheckboxChange(e, data) } }><span>{node.label}</span></el-checkbox>
          }
        </span>
      )
    },
    handleCheckboxChange (flag, node) {
      // if (typeof node.id === 'string' && node.id.includes('yj')) {
      if (flag) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      // } else {
      //   const { id, type, label } = node
      //   if (type === 0) {
      //     this.viewShpData(flag, id, type, label)
      //   } else if (type === 2) {
      //     this.nodeId = id
      //     this.handleHQ(label)
      //   } else if (type === 1) {
      //     this.viewTifData(flag, id, type, label)
      //   } else if (type === 3) {
      //     this.viewImgData(flag, id, type, label)
      //   } else if (type === 4) {
      //     this.viewPolygonData(flag, id, type, label)
      //   }
      // }
    },
    async viewShpData (flag, id, type, label) {
      if (flag) {
        if (label === '水坝') {
          const { features } = await getShuiba('shuiba')
          const layer = this.$refs.cusMap.addShuiba(features)
          this.shpLayers[id] = layer
        } else {
          const { data } = await getLastData({ id })
          if (data.state !== 'fail') {
            const layer = this.$refs.cusMap.addShp([data.data])
            this.shpLayers[id] = layer
          }
        }
      } else {
        this.shpLayers[id] && this.shpLayers[id].remove()
      }
    },
    async viewTifData (flag, id, type) {
      if (flag) {
        const { data } = await getLastData({ id })
        if (data.state !== 'fail') {
          const layer = this.$refs.cusMap.addTif([data.data])
          this.tifLayers[id] = layer
        }
      } else {
        this.tifLayers[id] && this.tifLayers[id].remove()
      }
    },
    async viewImgData (flag, id, type) {
      if (flag) {
        const { data } = await getLastData({ id })
        if (data.state !== 'fail') {
          const layer = this.$refs.cusMap.addImg(data.data)
          this.imgLayers[id] = layer
        }
      } else {
        this.imgLayers[id] && this.imgLayers[id].remove()
      }
    },
    async viewPolygonData (flag, id, type) {
      if (flag) {
        const { data } = await getLastData({ id })
        if (data.state !== 'fail') {
          const layer = this.$refs.cusMap.addPolygon(data.data)
          this.polygonLayers[id] = layer
        }
      } else {
        this.polygonLayers[id] && this.polygonLayers[id].remove()
      }
    },
    async getEarlyWarning (id, params) {
      const { yj } = await getEarlyWarning({ time: params })
      this.$refs.cusMap.addWeatherPoints(id, yj)
    },
    jumpToPoint () {
      if (this.position.lat && this.position.lon) {
        this.$refs.cusMap.flyToPoint([this.position.lat, this.position.lon])
      } else {
        this.$message.warning('请输入经纬度')
      }
    },
    async jumpToArea () {
      if (this.selectedCity) {
        const { data } = await getCityPosition({
          id: this.selectedCity[this.selectedCity.length - 1],
          type: this.selectedCity.length - 1
        })
        this.$refs.cusMap.flyTo({ maxX: data.st_xmax, maxY: data.st_ymax, minX: data.st_xmin, minY: data.st_ymin })
      } else {
        this.$message.warning('请选择地区')
      }
    },
    takeLineMeasure () { // 测距
      this.$refs.cusMap.createLine()
    },
    takeAreaMeasure () { // 测面积
      this.polygonType = 1
      this.$refs.cusMap.createPolygon()
    },
    async handleDrawPoint (layer) { // 点查询
      if (this.showSearchResult) {
        this.searchResultData = null
        this.showSearchResult = false
      }
      layer.changeIcon({
        prefix: 'fa',
        icon: 'fa-spinner',
        markerColor: 'blue',
        spin: true
      })
      const { lat, lng } = layer.getLatLng()
      const { data } = await searchByPoint({ latitude: lat, longitude: lng })
      layer.changeIcon({
        prefix: 'fa',
        icon: '',
        markerColor: 'blue',
        spin: false
      })
      if (data.data && data.data.length > 0) {
        this.searchResultData = data.data
        this.showSearchResult = true
        layer.on('click', e => {
          this.searchResultData = data.data
          this.showSearchResult = true
        })
      } else {
        this.$message.info('没有查询到数据')
      }
    },
    handleDrawLine (layer) {
      const [firstPoint, lastPoint] = layer.getLatLngs()
      layer.bindPopup(`${(firstPoint.distanceTo(lastPoint) / 1000).toFixed(4)} km`).openPopup()
    },
    async handleDrawRect (layer) { // 面查询
      if (this.showSearchResult) {
        this.searchResultData = null
        this.showSearchResult = false
      }
      const latlons = [...layer.getLatLngs()[0], layer.getLatLngs()[0][0]].map(({ lat, lng }) => `${lng} ${lat}`).join(',')
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const { data } = await searchByArea({ latlons })
        loading.close()
        if (data.data && data.data.length > 0) {
          this.searchResultData = data.data
          this.showSearchResult = true
          layer.on('click', e => {
            this.searchResultData = data.data
            this.showSearchResult = true
          })
        } else {
          this.$message.info('没有查询到数据')
        }
      } catch (e) {
        console.log(e)
      } finally {
        loading.close()
      }
    },
    handleDrawPolygon (layer) {
      if (this.polygonType === 1) {
        const area = this.$refs.cusMap.measureArea(layer.getLatLngs()[0])
        console.log(area)
        layer.bindPopup(`${area.toFixed(4)} ㎡`).openPopup()
      } else {
        this.handleDrawRect(layer)
      }
    },
    drawPoint () {
      this.$refs.cusMap.createPoint()
    },
    drawRect () {
      this.$refs.cusMap.createRect()
    },
    drawPolygon () {
      this.polygonType = 2
      this.$refs.cusMap.createPolygon()
    },
    async getPositionByShp ({ file }) {
      const { name } = file
      const names = name.split('.')
      const suffix = names[names.length - 1].toLocaleLowerCase()
      if (suffix !== 'zip') {
        this.$message({ type: 'warning', message: '文件类型只能为zip格式' })
      } else {
        const formData = new FormData()
        formData.append('file', file)
        const { data: { url, maxX, maxY, minX, minY } } = await uploadShp(formData)
        this.chooseShp = false
        this.$refs.cusMap.addShp(url, { maxX, maxY, minX, minY })
      }
    },
    async getCitys () {
      const { data } = await getCitys()
      this.cityList = data
    },
    resultItemClick ({ flag, node }) {
      this.handleCheckboxChange(flag, node)
    },
    handleCloseSearchResult () {
      this.searchResultData = null
      this.showSearchResult = false
    },
    async handleSearchByCondition () { // 复合查询
      if (this.showSearchResult) {
        this.searchResultData = null
        this.showSearchResult = false
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const { data } = await searchByCondition({
          countyId: this.combine.city[this.combine.city.length - 1],
          type: this.combine.type,
          time: this.combine.date
        })
        loading.close()
        if (data.data && data.data.length > 0) {
          this.searchResultData = data.data
          this.showSearchResult = true
        } else {
          this.$message.info('没有查询到数据')
        }
      } catch (e) {
        console.log(e)
      } finally {
        loading.close()
      }
    },
    handleHQ (name) {
      console.log(name)
      if (name === '作物品种') {
        this.getExcelData(this.tpage)
      } else if (name === '经济作物') {
        this.pages.name = name
        this.getHNamer(this.pages)
        this.dialogTableVisible = true
      } else if (name === '油料作物') {
        this.pages.name = name
        this.getHNamer(this.pages)
        this.dialogTableVisible = true
      } else if (name === '粮食作物') {
        this.pages.name = name
        this.getHNamer(this.pages)
        this.dialogTableVisible = true
      } else if (name === '肥料价格') {
        this.pages.name = name
        this.getFlamer(this.pages)
        this.dialogTableVisible = true
      } else if (name === '农药价格') {
        this.pages.name = name
        this.getNyamer(this.pages)
        this.dialogTableVisible = true
      }
    },
    getExcelData (data) {
      getExcelData(data).then(res => {
        this.cropList = res.data.page.list
        this.dialogShow = true
        this.page.pageNum = res.data.page.pageNum
        this.page.pageSize = res.data.page.pageSize
        this.page.total = res.data.page.totalRow
      })
    },
    getHNamer (page) {
      getHnwjByNamer(page).then(res => {
        if (res.data.state === 'ok') {
          this.msgForAll(res)
        }
      })
    },
    getFlamer (page) {
      getHnwfljgByName(page).then(res => {
        if (res.data.state === 'ok') {
          this.msgForAll(res)
        }
      })
    },
    getList () {},
    setPage (e) {
      this.pages.pageNum = e
      this.tpage.pageNum = e
      if (this.pages.name === '经济作物') {
        this.getHNamer(this.pages)
      } else if (this.pages.name === '油料作物') {
        this.getHNamer(this.pages)
      } else if (this.pages.name === '粮食作物') {
        this.getHNamer(this.pages)
      } else if (this.pages.name === '肥料价格') {
        this.getFlamer(this.pages)
      } else if (this.pages.name === '农药价格') {
        this.getNyamer(this.pages)
      } else {
        this.getExcelData(this.tpage)
      }
    },
    searchIng () {
      // this.$message.warning('点击检索')
      this.pages.pageNum = '1'
      if (this.pages.time === null) {
        this.pages.time = ''
      }
      if (this.pages.name === '肥料价格') {
        this.getFlamer(this.pages)
      } else if (this.pages.name === '农药价格') {
        this.getNyamer(this.pages)
      } else {
        this.getHNamer(this.pages)
      }
    },
    msgForAll (arr) {
      this.page.pageNum = arr.data.data.pageNum
      this.page.pageSize = arr.data.data.pageSize
      this.page.total = arr.data.data.totalRow
      const list = arr.data.data.list
      for (let i = 0; i < list.length; i++) {
        if (list[i].status !== '-') {
          if (list[i].status.substring(0, 1) === '-') {
            list[i].statuse = 0
          } else {
            list[i].statuse = 1
          }
        } else {
          list[i].statuse = 2
        }
      }
      this.gridData = list
    },
    getNyamer (page) {
      getHnwnyjgByName(page).then(res => {
        if (res.data.state === 'ok') {
          this.msgForAll(res)
        }
      })
    },
    handleCommand (name) {
      this.handleHQ(name)
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this.tifLayers = {}
    this.shpLayers = {}
    this.imgLayers = {}
    this.polygonLayers = {}
    this.getCitys()
    this.getLayerList()
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-card__body {
   height: 100%;
}
  .data-search-page {
    height: 100%;
    .el-card {
      height: 100%;
      .el-card__body {
        height: 100%;
        .el-row {
          width: 100%;
          height: 100%;
          .top-tools {
            height: 100px;
            background: #F9F9F9;
            box-shadow: inset 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            .tool-item {
              h4 {
                font-size: 14px;
                color: #303331;
                margin-bottom: 20px;
                padding-left: 40px;
                i {
                  width: 16px;
                  height: 16px;
                  font-size: 16px;
                  display: inline-block;
                }
              }
              div {
                height: 30px;
                line-height: 30px;
                padding: 0 25px;
                border-left: 2px solid #606662;
                border-right: 2px solid #606662;
                text-align: center;
                span {
                  display: inline-block;
                  cursor: pointer;
                }
              }
              &:nth-of-type(1) {
                div {
                  border-left: none;
                }
              }
              &:nth-of-type(5) {
                div {
                  border-right: none;
                }
              }
            }
          }
          .left-menu-col {
            height: calc(100% - 120px);
            .left-menu {
              width: calc(100% - 20px);
              height: 100%;
              box-shadow: inset 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
              border-radius: 8px;
              padding-top: 35px;
              .title {
                width: 100%;
                height: 35px;
                line-height: 35px;
                padding: 0 15px;
                background-color: #f0f0f0;
                position: absolute;
                top: 0;
                box-shadow: inset 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
                i {
                  position: absolute;
                  right: 15px;
                  top: 50%;
                  transform: translateY(-50%);
                  cursor: pointer;
                }
              }
              .menu-wrap {
                padding: 10px 20px;
              }
            }
          }
          .right-map-col {
            height: calc(100% - 120px);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
          }
        }
      }
    }
  }
  .search_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .lab_box {
      display: flex;
      align-items: center;
    }
  }
  .data-search-popover {
    .el-input-group__prepend {
      padding: 0 0 0 10px;
    }
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
</style>
