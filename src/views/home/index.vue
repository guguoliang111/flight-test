<template>
  <div class="page-container">
    <div class="page-title">地块分布</div>
    <div class="card_box">
      <div style="width:calc(100% - 480px); height: 100%">
        <Map class="leaflet_box" style="height: 98%; border-radius: 5px;" className="map-box" ref="map" @showDetail="showDetail" :center="[40.82, 114.88]">
           <l-marker v-for="(x, index) in qyData" :key="index" :lat-lng="[x.lat,x.lon]">
              <l-icon
              :icon-size="[45,30]"
              :iconAnchor="[15,30]"
              :icon-url="`/images/yjimg/${sjname[x.codename]}/${colorname[x.signallevel]}`"
              >
              </l-icon>
            <l-popup class="qyxqcon">
              <div class="qyxq">
                  <p v-if="x.issuecontent">{{x.issuecontent}}</p>
              </div>
            </l-popup>
          </l-marker>
          <div class="top_left">
            <el-dropdown @command="clickItem" placement="bottom">
              <span class="el-dropdown-link">
                <i class="iconfont iconyujing"></i>
                预警
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :style="{'color': selectid == '3' ? '#20C1EE' : ''}" command="3">3H</el-dropdown-item>
                <el-dropdown-item :style="{'color': selectid == '6' ? '#20C1EE' : ''}"  command="6">6H</el-dropdown-item>
                <el-dropdown-item :style="{'color': selectid == '12' ? '#20C1EE' : ''}"  command="12">12H</el-dropdown-item>
                <el-dropdown-item :style="{'color': selectid == '24' ? '#20C1EE' : ''}"  command="24">24H</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div style="padding: 0 10px;" v-for="x in dataListL" :key="x.id">
              <el-popover
                style="min-width: 50px"
                placement="bottom"
                trigger="hover"
                >
                <el-tree ref="tree" :data="x.oneLevelData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                <el-button style="color: #606266" type="text" slot="reference">
                  <i v-if="x.name === '气象'" class="iconfont iconqixiang"></i>
                  <i v-if="x.name === '土壤'" class="iconfont iconturang"></i>
                  <i v-if="x.name === '土地利用'" class="iconfont icontudiliyong"></i>
                  <i v-if="x.name === '作物管理'" class="iconfont iconzuowu-shuidao"></i>
                  <i v-if="x.name === '遥感'" class="iconfont iconyaogan"></i>
                  <i v-if="x.name === '市场'" class="iconfont iconjob"></i>
                  {{x.name}}
                </el-button>
              </el-popover>
            </div>
          </div>
        </Map>
      </div>
      <div class="right_box">
        <div class="pos_box">
          <div class="tlt_box">
            <i class="el-icon-menu"></i>
            <span>田块统计信息</span>
          </div>
          <div class="redio_chart">
            <div class="char_box1">
              <Chart :showId="1" :width="220" :dataList="dataList" :height="220"></Chart>
            </div>
            <div class="char_box1">
              <Chart :showId="1" :width="240" :dataList="chalList" :height="220"></Chart>
            </div>
          </div>
        </div>
        <div class="calendar_box">
          <div class="calendar_tlt">
            <i class="el-icon-menu"></i>
            <span>物候历</span>
          </div>
          <Calendar></Calendar>
          <div class="bot_tlt">
            <i class="el-icon-menu"></i>
            <span>田间操作记录</span>
          </div>
        </div>
        <div class="bot_box">
          <div style="border-radius: 20px; height: calc(100% - 586px); ">
           <vue-seamless-scroll :data="listData" :class-option="optionLeft" class="seamless-warp">
              <ul class="item">
                  <li class="item_li" v-for="(item, index) in listData" :key="index">
                    <div class="li_top">
                      <div class="top_left">
                        <div class="dian_box"></div>
                        <div class="assice_box">{{item.name}}</div>
                        <div class="pinz_box">{{item.type}}</div>
                      </div>
                      <div class="top_right">{{item.time}}</div>
                    </div>
                    <div class="li_bot">
                      <div class="bot_top">{{item.content}}</div>
                      <div class="bot_bot">
                        <img v-for="(x, i) in item.imgs" :key="i" :src="$imgServer + x.url" alt="">
                      </div>
                    </div>
                  </li>
              </ul>
          </vue-seamless-scroll>
          </div>
        </div>
      </div>
      <!-- 市场弹窗 -->
      <el-dialog :title="pages.name" :visible.sync="dialogTableVisible">
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
      </el-dialog>
      <!-- 作物品种弹窗 -->
      <el-dialog title="作物品种" :visible.sync="dialogShow">
        <el-table height="484" :header-cell-style="{background:'#D4EDF9'}" :data="cropList">
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column property="product" label="产品/品种" align="center"></el-table-column>
        </el-table>
         <el-pagination style="text-align: center; margin-top: 20px" background layout="total, prev, pager, next, jumper" @current-change="setPage" :page-size="page.pageSize" @prev-click="setPage" @next-click="setPage" :total="page.total"></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { LMarker, LPopup, LIcon } from 'vue2-leaflet'
import pagination from '@/mixins/pagination'
import Map from '@/components/Map'
import Chart from './components/chart'
import Calendar from './calendar'
import { getEarlyWarning, getGeoJson, getWeatherList } from '@/api/index'
import { getTkStatistics, getTkAllCenter, getHnwjByNamer, getHnwfljgByName, getHnwnyjgByName, getOperationRecord, getChemical, getLastData, getExcelData } from '@/api/api'
import { baseMapRules } from '@/utils/formRules'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')

export default {
  name: 'Home',
  mixins: [pagination],
  components: {
    Map,
    Chart,
    Calendar,
    LMarker,
    LPopup,
    LIcon
    // LTooltip
  },
  data () {
    return {
      input: '',
      dialogShow: false,
      value: '',
      value1: '',
      dataListL: [],
      gridData: [],
      dialogTableVisible: false,
      datacs: [],
      cropList: [],
      defaultProps: {
        children: 'oneLevelData',
        label: 'name'
      },
      listData: [],
      sjname: {
        大风: 'dafeng',
        寒潮: 'hanchao',
        干旱: 'ganhan',
        暴雨: 'baoyu',
        森林火险: 'huoxian',
        雷电: 'leidian',
        雷雨大风: 'leiyu',
        高温: 'gaowen',
        冰雹: 'bingbao',
        大雾: 'dawu',
        强对流: 'qita',
        干热风: 'ganrefeng',
        沙尘暴: 'shachenbao',
        暴雪: 'baoxue',
        道路结冰: 'daolujiebing',
        霾: 'mai',
        台风: 'taifeng'
      },
      colorname: {
        红色: 'red.png',
        橙色: 'orange.png',
        蓝色: 'blue.png',
        黄色: 'yellow.png'
      },
      weather: {},
      dataList: {
        title: '地块数量',
        sum: '',
        data: [
          // { value: 312, name: '小麦' },
          // { value: 435, name: '玉米' },
          // { value: 123, name: '棉花' },
          // { value: 435, name: '大豆' }
        ]
      },
      chalList: {
        title: '地块面积',
        sum: '',
        data: [
          // { value: 312, name: '小麦' },
          // { value: 235, name: '玉米' },
          // { value: 423, name: '棉花' },
          // { value: 335, name: '大豆' }
        ]
      },
      dialog: false,
      qyData: [],
      tableData: [],
      loading: true,
      activeName: '1',
      uploadForm: {
        name: '',
        uploadUrl: '',
        status: 2,
        file: ''
      },
      qbstr: '',
      date: new Date(),
      baseMapRules,
      update: false,
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
      baseMapStatus: 2,
      currentRow: null,
      selectid: 0,
      qxid: Number
    }
  },
  methods: {
    // 动态渲染
    // renderContent (h, { node, data, store }) {
    //   const that = this
    //   console.log(that.showColor)
    //   return (<span class = { that.showColor ? 'sw_color' : (!that.showColor ? '' : 'sw_color') } on-click={ () => that.showMsgDetaid(node.label) }>{node.label}</span>)
    // },
    // showMsgDetaid (val) {
    //   console.log('触发llll', val)
    //   if (val === this.vname) {
    //     console.log('chufa111')
    //     this.showColor = false
    //     this.vname = ''
    //   } else {
    //     console.log('chufa2222')
    //     this.vname = val
    //     this.showColor = true
    //   }
    // },
    // 获取首页列表
    getWeatherList () {
      getWeatherList({}).then(res => {
        if (res.state === 'ok') {
          const list = res.oneLevelLists
          // for (let i = 0; i < list.length; i++) {
          //   console.log(list[i])
          //   list[i].twoLevelLists = list[i].twoLevelLists.concat(list[i].oneLevelData)
          //   for (let k = 0; k < list[i].twoLevelLists.length; k++) {
          //     list[i].twoLevelLists[k].twoLevelLists = list[i].twoLevelLists[k].twoLevelLists.concat(list[i].twoLevelLists[k].oneLevelData)
          //   }
          // }
          this.dataListL = list
          list.map(item => {
            if (item.name === '遥感') {
              console.log(item.oneLevelData)
              sessionStorage.setItem('yaogList', JSON.stringify(item.oneLevelData)) // 存入一个值
            }
          })
        }
      })
    },
    // 数据遍历
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
    // 获取首页作物价格列表
    getHNamer (page) {
      getHnwjByNamer(page).then(res => {
        if (res.data.state === 'ok') {
          this.msgForAll(res)
        }
      })
    },
    // 获取首页作物价格列表
    getNyamer (page) {
      getHnwnyjgByName(page).then(res => {
        if (res.data.state === 'ok') {
          this.msgForAll(res)
        }
      })
    },
    // 获取首页肥料价格列表
    getFlamer (page) {
      getHnwfljgByName(page).then(res => {
        if (res.data.state === 'ok') {
          this.msgForAll(res)
        }
      })
    },
    // 获取施肥量
    getChemical () {
      getChemical({}).then(res => {
        this.sfList = res.data.data
        this.$refs.map.addShp('tr:xzqh_shi_84', this.sfList)
      })
    },
    // 获取作物品种
    getExcelData (data) {
      getExcelData(data).then(res => {
        this.cropList = res.data.page.list
        this.dialogShow = true
        this.page.pageNum = res.data.page.pageNum
        this.page.pageSize = res.data.page.pageSize
        this.page.total = res.data.page.totalRow
      })
    },
    // 点击左上菜单栏
    handleNodeClick (e, node, data) {
      if (node.childNodes.length > 0) {
        return
      }
      if (e.name === '施肥量') {
        this.getChemical()
      } else if (e.name === '水坝') {
        getGeoJson('shuiba').then(res => {
          const geolist = res.features
          this.$refs.map.addGeoJson(geolist)
        })
      } else if (e.name === '作物品种') {
        this.tpage.id = e.id
        this.getExcelData(this.tpage)
      } else if (e.name === '经济作物') {
        this.pages.name = e.name
        this.getHNamer(this.pages)
        this.dialogTableVisible = true
      } else if (e.name === '油料作物') {
        this.pages.name = e.name
        this.getHNamer(this.pages)
        this.dialogTableVisible = true
      } else if (e.name === '粮食作物') {
        this.pages.name = e.name
        this.getHNamer(this.pages)
        this.dialogTableVisible = true
      } else if (e.name === '肥料价格') {
        this.pages.name = e.name
        this.getFlamer(this.pages)
        this.dialogTableVisible = true
      } else if (e.name === '农药价格') {
        this.pages.name = e.name
        this.getNyamer(this.pages)
        this.dialogTableVisible = true
      } else {
        const type = e.type
        console.log(type)
        getLastData({
          id: e.id
        }).then(res => {
          console.log('log-----483', res)
          const data = res.data.data
          if (type === 0) {
            console.log('shp')
            this.$refs.map.addShp(data.url)
          }
          if (type === 1 || type === 5) {
            console.log('tif', type)
            const list = res.data
            const latlon = [[list.max_lat, list.max_lon], [list.min_lat, list.min_lon]]
            this.$refs.map.addTif(list, type, latlon)
          }
          if (type === 3) {
            const latlons = res.data
            this.$refs.map.imageTransform(latlons)
          }
          if (type === 4) {
            const latlons = res.data
            console.log('SP')
            this.$refs.map.addPolygon(latlons)
          }
        })
        // this.$refs.map.addTif(e.url)
      // } else if (e.type.toString() === '2') {
      //   console.log('oooo')
      }
    },
    // 查看地块详情
    showDetail (lat) {
      this.$router.push({
        path: '/detail',
        query: {
          lat: lat.lon,
          lon: lat.lat,
          id: lat.id
        }
      })
    },
    // 获取所有地块信息
    getTkAllCenter () {
      getTkAllCenter({}).then(res => {
        setTimeout(() => {
          this.$refs.map.addShowDot(res.data.center)
        }, 500)
      })
    },
    // 翻页
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
    // 获取统计信息
    getTkStatistics () {
      const that = this
      getTkStatistics({}).then(res => {
        that.chalList.sum = (res.data.areaCount / 10000).toFixed(2) + '万亩'
        that.dataList.sum = res.data.numCount + '块'
        that.dataList.data = res.data.typesNum.map(item => {
          return {
            name: item.type,
            value: item.count
          }
        })
        that.chalList.data = res.data.typesArea.map(item => {
          return {
            name: item.type,
            value: (item.area / 10000).toFixed(2)
          }
        })
      })
    },
    ...mapMutations(['setList']),
    // 获取shp
    // getShp () {
    //   getShp({}).then(res => {
    //     if (res.state === 'ok') {
    //       const geoList = res.geolist
    //       for (let i = 0; i < geoList.length; i++) {
    //       }
    //     }
    //   })
    // },
    getList () {},
    // 点击地图上预警选项
    clickItem (command) {
      if (this.selectid === command) {
        this.qyData = []
        this.selectid = 0
      } else {
        getEarlyWarning({ time: command }).then(res => {
          this.selectid = command
          this.qyData = res.yj
        })
      }
      // this.$router.push('/admin/baseMap/detail')
    },
    // 点击地图上方气象选项
    clickWeather (command) {
      this.qxid = command
      getEarlyWarning({ type: command }).then(res => {
        if (res.state === 'ok') {
          var imageBounds = [
            [15.5, 72.4],
            [54.5, 136.5]
          ]
          this.$refs.map.imageOverlay(this.$geoServer + '/qx_spider/Meteorological/img/' + res.img.url, imageBounds, this.qxid)
        }
      })
    },
    // 点击遥感
    clickYg (command) {
      var imageBounds = [
        [36.7082, 113.36],
        [36.3017, 115.467],
        [34.465, 114.907],
        [34.8654, 112.849]
      ]
      if (this.qbstr === command) {
        this.$refs.map.imageTransform(this.$imgServer + '/upload/GF1_WFV3_E114.1_N35.6_20200907_L1A0005044872.jpg', imageBounds, this.qbstr)
        this.qbstr = ''
      } else {
        this.qbstr = command
        this.$refs.map.imageTransform(this.$imgServer + '/upload/GF1_WFV3_E114.1_N35.6_20200907_L1A0005044872.jpg', imageBounds, this.qbstr)
      }
    },
    composeValue (val) {
    },
    // 获取田间操作记录
    getOperationRecord () {
      getOperationRecord({ pageNum: 1, pageSize: 20 }).then(res => {
        this.listData = res.data.data.list
      })
    },
    // 点击检索
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
    }
  },
  computed: {
    optionLeft () {
      return {
        direction: 1
      }
    }
  },
  mounted () {
  },
  created () {
    this.getTkStatistics()
    this.getTkAllCenter()
    this.getWeatherList()
    this.getOperationRecord()
  }
}
</script>

<style lang="scss" scoped>
/* 点击后的当前节点的样式 */
 ::v-deep .el-tree-node.is-current > .el-tree-node__content {
  // background: rgb(48, 65, 86);
  color: #4AA9E3;
  background: none;
}
.sw_color {
  color: #4AA9E3;
}

::v-deep .el-popover .el-popper {
 min-width: 100px;
}
::v-deep .el-table thead {
  background-color: #D4EDF9;
}
::v-deep .el-tree-node__expand-icon.is-leaf {
  display: none;
}
::v-deep .el-dialog__close {
  color: #000 !important;
}
// ::v-deep .el-button {
//   color: #fff;
// }
::v-deep .el-dialog__header {
  background-color: #fff;
  border-bottom: 1px solid #EEEEEE;
  color: #000;
  .el-dialog__title {
    color: #000;
  }
  .el-dialog__headerbtn {
    color: #000;
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
.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
.page-container {
  .card_box {
    display: flex;
    height: 98%;
    .leaflet_box {
      // width: 70%;
      width:calc(100% - 500px);
      position: absolute;
      top: 30px;
      left: 0;
      .top_left {
        border-radius: 8px;
        padding: 0 10px;
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 5px;
        left: 10px;
        height: 30px;
        opacity: 0.8;
        background-color: #fff;
        z-index: 999;
      }
    }
  }
  .bot_chart {
    width: 100%;
    height: 30%;
  }
  // .map_chaart {
  //   width: 100%;
  //   display: flex;
  // }
  .right_box {
    .pos_box {
      position: relative;
      height: 220px;
      .tlt_box {
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        position: absolute;
        top: -29px;
      }
    }
    width: 480px;
    // padding: 0 20px;
    margin-left: 20px;
    height: 100%;
    .calendar_box {
      width: 100%;
      height: 314px;
      height: 290px;
      position: relative;
      background-color: #fff;
      border-radius: 5px;
      margin-top: 38px;
      .calendar_tlt {
        position: absolute;
        display: flex;
        align-items: center;
        top: -28px;
        font-size: 18px;
        font-weight: 700;
      }
      .bot_tlt {
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        position: absolute;
        bottom: -28px;
      }
    }
    .bot_box {
      position: relative;
      background-color: #fff;
      border-radius: 5px;
      margin-top: 38px;
      overflow: hidden;
      height: calc(100% - 586px);
    }
    .redio_chart {
      display: flex;
      background-color: #fff;
      align-items: center;
      // height: 200px;
      border-radius: 5px;
    }
  }
  .box-card {
    width: 100%;
    .other-btns {
      width: 200px;
      border: 1px solid #dcdfe6;
      position: relative;
      .btn {
        width: 99px;
        margin: 0;
        border-radius: 0;
        color: #909993 !important;
        ::v-deep i {
          &.el-icon-delete {
            color: #ff0000;
          }
          &.el-icon-upload {
            color: #55b4ff;
          }
        }
      }
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        width: 1px;
        height: 16px;
        background-color: #dcdfe6;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.gray-btn {
  color: #c0c4cc !important;
}
.seamless-warp {
  overflow: hidden;
  .item {
    overflow: hidden;
    height: calc(100% - 586px);
    width: 100%;
    padding: 0;
    .item_li {
      width: 100%;
      list-style: none;
      .li_top {
        width: 100%;
        display: flex;
        padding: 10px 20px;
        background-color: #E5EFF6;
        justify-content: space-between;
        align-items: center;
        .top_left {
          display: flex;
          align-items: center;
          position: relative;
          .dian_box {
            width: 6px;
            position: absolute;
            left: -6%;
            height: 6px;
            border-radius: 6px;
            background-color: rgba(79, 202, 255, 1);
          }
          .assice_box {

          }
          .pinz_box {
            padding: 4px 12px;
            margin-left: 5px;
            border-radius: 30px;
            color: #fff;
            background-color: #27C9FF;
          }
        }
        .top_right {
        }
      }
      .li_bot {
        width: 100%;
        padding: 10px 20px;
        .bot_top {

        }
        .bot_bot {
          display: flex;
          margin-top: 10px;
          margin-bottom: 10px;
          img {
            margin-left: 10px;
            width: 96px;
            height: 58px;
          }
          img:first-child {
            margin-left: 0;
            width: 96px;
            height: 58px;
          }
        }
      }
    }
  }
}
</style>
