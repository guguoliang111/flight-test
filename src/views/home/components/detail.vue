<template>
  <div class="container">
    <div class="tlt_box">
      <i class="el-icon-menu"></i> 地块分布
    </div>
    <div class="top_box">
      <!-- 左侧地图 -->
      <div class="left_box">
        <Map class="map_box" className="map-box" style="height:100%; border-radius: 10px;" ref="map" :center="[40.82, 114.88]">
          <div class="top_left">
            <el-dropdown @command="clickYg" placement="bottom">
              <span class="el-dropdown-link">
                <i class="iconfont iconyaogan"></i>
                遥感
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="x in yaogList" :key="x.id" :style="{'color': selectid == x.id ? '#20C1EE' : ''}" :command="x">{{x.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <p style="margin-left: 15px" @click="clickItem"><i class="iconfont iconshexiangtou"></i>摄像头</p>
          </div>
          <div class="top_right">
            <el-button size="mini" @click="$router.go(-1)" type="primary">返回</el-button>
          </div>
          <!-- <div v-if="isShow" class="block">
            <Swiper  class="swiper_box"></Swiper>
          </div> -->
        </Map>
      </div>
      <div class="right_box">
        <div class="top_box">
          <div class="tlt_box">
            <i class="el-icon-menu"></i>
            <span>种植详情</span>
          </div>
          <div class="content_box">
            <div class="content_left">
              <div class="left_img">
                <img :src="$imgServer + fieldDetail.dk_url" alt="">
              </div>
            </div>
            <div class="content_right">
              <div class="right_msg">
                <h3>{{fieldDetail.type}}</h3>
              </div>
              <div class="msg_box_t">
                <div class="msg_box">
                  <p><span>田名称：</span>{{fieldDetail.dk_name}}</p>
                  <p><span>田亩数：</span>{{fieldDetail.dk_farmland}} 亩</p>
                  <p><span>周长：</span>{{fieldDetail.dk_perimeter}} 米</p>
                  <p><span>土地类型：</span>{{fieldDetail.dk_type}}</p>
                  <p><span>地址：</span>{{fieldDetail.dk_address}}</p>
                </div>
                <div class="left_msg">
                  <p><span>海拔：</span>{{fieldDetail.dk_altitude}} 米</p>
                  <p><span>坡度：</span>{{fieldDetail.dk_slope}} 度</p>
                  <p><span>密度:</span>{{fieldDetail.dk_density}}</p>
                  <p><span>灌溉方式:</span>{{fieldDetail.dk_irrigation}}</p>
                  <p><span>播种时间：</span>{{fieldDetail.dk_begin_time}}</p>
                </div>
                <div class="left_msg">
                  <p><span>种植户：</span>{{fieldDetail.dk_growers}}</p>
                  <p><span>联系方式：</span>{{fieldDetail.dk_phone}}</p>
                  <p><span>所属农场：</span>{{fieldDetail.dk_farm}}</p>
                  <p><span>负责人：</span>{{fieldDetail.dk_person}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bot_box">
          <div class="tlt_box">
            <i class="el-icon-menu"></i>
            <span>气象情况</span>
          </div>
          <div class="cont_bot_box">
            <div class="tleft_box">
              <div class="t_top">
                <div class="top_left">
                  <div>{{theDay.wea}}</div>
                  <div>{{theDay.date}}</div>
                </div>
                <div class="top_cont">
                  <img :src="`/images/qximg/${bigimgname[theDay.wea_img]}`" alt="">
                </div>
                <div class="top_right">
                  <div class="right_wd">{{theDay.tem}}</div>
                  <div><span style="margin-right: 10px;">今天</span> <span class="right_day">{{theDay.week}}</span></div>
                </div>
              </div>
              <div class="t_cont">
                <ul>
                  <li>
                    <img :src="'/images/qximg/kqzl.png'" alt="">
                    <span>{{theDay.air_level}}</span>
                  </li>
                  <li>
                    <img :src="'/images/qximg/fx.png'" alt="">
                    <span>{{theDay.win}}</span>
                  </li>
                  <li>
                    <img :src="'/images/qximg/fj.png'" alt="">
                    <span>{{theDay.win_speed}}</span>
                  </li>
                  <li>
                    <img :src="'/images/qximg/kqsd.png'" alt="">
                    <span>{{theDay.humidity}}%</span>
                  </li>
                  <li>
                    <img :src="'/images/qximg/kqzs.png'" alt="">
                    <span>{{theDay.air}}</span>
                  </li>
                </ul>
              </div>
              <div class="t_bot">
                <ul>
                  <li v-for="(x, t) in theDay.hours" :key="t">
                    <span>{{x.tem}}</span>
                    <img :src="`/images/qximg/${imgname[x.wea_img]}`" alt="">
                    <span>{{x.day}}</span>
                    <!-- <span>27/14:00</span> -->
                  </li>
                </ul>
              </div>
            </div>
            <div class="tright_box">
              <div class="tr_top">
                <span>未来七日天气情况</span>
              </div>
              <div class="tr_bot">
                <ul>
                  <li v-for="(item,index) in weather.data" :key="index">
                    <span style="width: 99px; display: inline-block;">{{item.day}}</span>
                    <img :src="`/images/qximg/${imgname[item.wea_img]}`" alt="">
                    <span>{{item.tem2}}</span>
                    <span>{{item.tem1}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  ref="jw" class="bot_box">
      <el-tabs style="height: 100%" type="border-card">
        <el-tab-pane ref="tableCot" style="height: 100%">
          <span slot="label"><i class="el-icon-date"></i> 土壤</span>
            <el-table align="center" :height="jwHeight - 20" :header-cell-style="headClass" stripe :data="bute" style="width: 100%; height: calc(100% - 40px)">
              <el-table-column align="center" label="序号" type="index" width="50">
              </el-table-column>
              <el-table-column label="元素" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.name === 'PH'"></span>
                  <span v-else-if="scope.row.name === '有机质'">g/Kg</span>
                  <span v-else-if="scope.row.name === '速效氮'">mg/Kg</span>
                  <span v-else-if="scope.row.name === '速效磷'">mg/kg</span>
                  <span v-else-if="scope.row.name === '速效钾'">mg/kg</span>
                  <span v-else-if="scope.row.name === '全氮'">g/kg</span>
                </template>
              </el-table-column>
              <el-table-column label="分级" align="center" width="680">
                <template slot-scope="scope">
                  <div class="name-wrapper">
                      <div v-if="scope.row.name === 'PH'" class="element_box">
                        <div style="width: 33.3%" :class="[ 4 < scope.row.value && scope.row.value <= 6.6 ? 'box_1' : 'box_2']">酸性</div>
                        <div style="width: 33.3%" :class="[ 6.6 < scope.row.value && scope.row.value < 7.6 ? 'box_8' : 'box_5']">中性</div>
                        <div style="width: 33.3%" :class="[ 7.6 < scope.row.value && scope.row.value < 10 ? 'box_4' : 'box_4_1']">碱性</div>
                      </div>
                      <div v-else class="element_box">
                        <div style="width: 25%" :class="[ 0 < scope.row.value && scope.row.value <= 25 ? 'box_4' : 'box_4_1']">偏低</div>
                        <div style="width: 25%" :class="[ 25 < scope.row.value && scope.row.value <= 50 ? 'box_8' : 'box_5']">适中</div>
                        <div style="width: 25%" :class="[ 50 < scope.row.value && scope.row.value <= 75 ? 'box_1' : 'box_2']">丰富</div>
                        <div style="width: 25%" :class="[ 75 < scope.row.value && scope.row.value <= 100 ? 'box_9_1' : 'box_9']">极富</div>
                      </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="测量值">
                <template slot-scope="scope">
                  <span>{{scope.row.value}}</span>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"> 积温积雨</span>
          <div style="width: 100%; height: 100%">
            <!-- <Chart :showId="3" :width="jwWidth" :height="jwHeight"></Chart> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"> 环境</span>
          <div style="width: 100%; position: relative; height: 100%">
            <div class="left_select">
                <el-select @change="changeSelectPir" size="mini" v-model="jwSearch.year" placeholder="请选择">
                  <el-option v-for="item in pirData" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
            </div>
            <div class="right_select">
              <el-radio-group size="mini" @change="changeTrType" v-model="trType">
                <el-radio-button label="土壤湿度"></el-radio-button>
                <el-radio-button label="土壤温度"></el-radio-button>
              </el-radio-group>
            </div>
            <Chart ref="chart2" :showId="3" :width="jwWidth" :height="jwHeight"></Chart>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"> 施肥建议</span>
          <div class="sf_suggest">
            <div style="width: 100%;" v-if="fieldDetail.dk_fertilizer" v-html="fieldDetail.dk_fertilizer"></div>
            <div class="not_msg" v-else>暂无数据</div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"> 病虫害预警</span>
          <div v-if="showDetail" style="width: 100%; height: 100%">
            <div class="topS_box">
              <el-select @change="changeSelectPes" size="mini" v-model="pesVal" placeholder="请选择">
                <el-option v-for="item in optType" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
              <div>
                <el-radio-group @change="changeRadio" size="mini" v-model="radio1">
                  <el-radio-button name="近期易发病害" label="近期易发病害"></el-radio-button>
                  <el-radio-button name="近期易发虫害" label="近期易发虫害"></el-radio-button>
                  <el-radio-button name="近期易发草害" label="近期易发草害"></el-radio-button>
                </el-radio-group>
              </div>
              <div style="width:190px">
              </div>
            </div>
            <!-- <div class="tab_box">
              <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
              </ul>
            </div> -->
            <div>
              <ul  class="infinite-list" style="overflow:auto; max-height: 150px">
                <template v-if="this.pstVal === '病害'">
                  <li v-for="(i, index) in tableD" :key="i.id" class="infinite-list-item">
                    <p style="font-size: 18px">{{index + 1}}、{{i.diseases_name}}</p>
                    <p style="color: #909993; font-size: 14px; padding-left: 24px; line-height: 21px;">{{i.diseases_condition}} <span @click.stop="checkDetail(i)" style="color: #49B4FA; cursor: pointer;">【查看详情】</span> </p>
                  </li>
                </template>
                <template v-else-if="this.pstVal === '虫害'">
                  <li v-for="(i, index) in tableD" :key="i.id" class="infinite-list-item">
                    <p style="font-size: 18px">{{index + 1}}、{{i.pests_name}}</p>
                    <p style="color: #909993; font-size: 14px; padding-left: 24px; line-height: 21px;">{{i.pests_features}} <span @click.stop="checkDetail(i)" style="color: #49B4FA; cursor: pointer;">【查看详情】</span> </p>
                  </li>
                </template>
                <template v-else>
                  <li v-for="(i, index) in tableD" :key="i.id" class="infinite-list-item">
                    <p style="font-size: 18px">{{index + 1}}、{{i.grass_name}}</p>
                    <p style="color: #909993; font-size: 14px; padding-left: 24px; line-height: 21px;">{{i.grass_about}} <span @click.stop="checkDetail(i)" style="color: #49B4FA; cursor: pointer;">【查看详情】</span> </p>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div v-else style="width: 100%; height: 100% padding: 14px;">
            <div class="del_title">
              <h3 v-if="warningdetails.type === '病害'" >{{warningdetails.diseases_name}}</h3>
              <h3 v-else-if="warningdetails.type === '虫害'" >{{warningdetails.pests_name}}</h3>
              <h3 v-else>{{warningdetails.grass_name}}</h3>
              <el-button @click="showDetail = true" size="mini" class="el_btn">返回</el-button>
            </div>
            <ul class="ul_box">
              <li class="clearfix li_box">
                <div style="float: left">【描述】</div>
                <div style="color: #909993; float: right; margin-left: 26px;" v-if="warningdetails.type === '病害'">{{warningdetails.diseases_condition}}</div>
                <div style="color: #909993; float: right; margin-left: 26px;" v-else-if="warningdetails.type === '虫害'">{{warningdetails.pests_features}}</div>
                <div style="color: #909993; float: right; margin-left: 26px;" v-else>{{warningdetails.grass_about}}</div>
              </li>
              <li class="clearfix li_box">
                <div style="float: left">【防治方法】</div>
                <div style="color: #909993; float: right; margin-left: 26px;" v-if="warningdetails.type === '病害'">{{warningdetails.diseases_methon}}</div>
                <div style="color: #909993; float: right; margin-left: 26px;" v-else-if="warningdetails.type === '虫害'">{{warningdetails.pests_methon}}</div>
                <div style="color: #909993; float: right; margin-left: 26px;" v-else>{{warningdetails.grass_methon}}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">市场信息</span>
          <div class="sc_box">
            <div class="right_box">
               <el-autocomplete
                class="inline-input"
                size="mini"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
              <el-select @change="changeItem" size="mini" v-model="value" placeholder="请选择">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="left_box">
              <p>
                昨日均价:
                <span>{{price.avg}}元/斤</span>
              </p>
              <p>昨日最高: <span>{{price.max}}元/斤</span></p>
              <p>昨日最低: <span>{{price.min}}元/斤</span></p>
            </div>
          </div>
          <Chart ref="chart" style="margin-top: -30px" :showId="4" :width="jwWidth" :height="jwHeight"></Chart>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
// import Swiper from './swiper.vue'
import Chart from './chart'
import { getWeather } from '@/api/index'
import { getDkDetail, getSoilAttribute, getCamera, searchName, getTkRemoteData, getHnwj, getDiseases, searchJwAndJy, getYears } from '@/api/api'
export default {
  name: 'PlotDetail',
  components: {
    Map,
    Chart
    // Swiper
  },
  data () {
    return {
      selectid: 0,
      isShow: false,
      radio1: '近期易发病害',
      jwHeight: null,
      state: '',
      jwWidth: null,
      loading: false,
      count: 0,
      priceData: {},
      weather: {},
      tHeight: null,
      yaogList: [],
      pirData: [],
      theDay: {},
      pstVal: '病害',
      price: {
        max: '0',
        min: '0',
        avg: '0'
      },
      jwSearch: {
        id: this.$route.query.id,
        year: 2020,
        type: 0
      },
      showDetail: true,
      warningdetails: {},
      imgname: {
        xue: 'xue.png',
        lei: 'lei.png',
        shachen: 'shac.png',
        wu: 'wu.png',
        bingbao: 'bingbao.png',
        yun: 'yun.png',
        yu: 'yu.png',
        yin: 'yin.png',
        qing: 'qing.png'
      },
      bigimgname: {
        xue: 'xue (2).png',
        lei: 'lei (2).png',
        shachen: 'shac (2).png',
        wu: 'wu (2).png',
        bingbao: 'bingbao (2).png',
        yun: 'yun (2).png',
        yu: 'yu (2).png',
        yin: 'yin (2).png',
        qing: 'qing (2).png'
      },
      bute: [],
      tableData: [],
      pesVal: '秧苗期',
      optType: [
        { name: '秧苗期' },
        { name: '分蘖期' },
        { name: '拔节期' },
        { name: '孕穗期' },
        { name: '抽穗期' },
        { name: '灌浆期' },
        { name: '成熟期' }
      ],
      options: [
        {
          value: '0',
          label: '近七日'
        },
        {
          value: '1',
          label: '一个月'
        }
      ],
      trType: '土壤湿度',
      ygList: [],
      value: '',
      tableD: [],
      search: {
        name: '',
        id: ''
      },
      fieldDetail: {},
      restaurants: []
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    // 选择日期
    changeSelectPir (val) {
      console.log(val)
      this.jwSearch.year = val
      this.getJwAndJy(this.jwSearch)
    },
    // 环境 选择类型(湿度/ 温度)
    changeTrType (val) {
      if (val === '土壤湿度') {
        this.jwSearch.type = 0
        this.getJwAndJy(this.jwSearch)
      } else {
        this.jwSearch.type = 1
        this.getJwAndJy(this.jwSearch)
      }
    },
    // 获取积温积雨数据
    getJwAndJy (val) {
      searchJwAndJy(val).then(res => {
        var listTkey = []
        var listTval = []
        var listFval = []
        for (var i in res.data.list10) {
          listTkey.push(i)
          listTval.push(res.data.list10[i])
        }
        for (var k in res.data.list40) {
          listFval.push(res.data.list40[k])
        }
        this.$refs.chart2.qxChart(listTkey, listTval, listFval)
      })
    },
    // 获取遥感信息
    getTkRemoteData () {
      getTkRemoteData({ id: this.$route.query.id }).then(res => {
        console.log(res.data.list)
        this.ygList = res.data.list
      })
    },
    // 市场信息 模糊检索
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 模糊检索
    outputVal () {
      searchName({ name: this.state }).then(res => {
        const data = res.data.data
        data.map(item => {
          item.value = item.product
        })
        this.restaurants = data
      })
    },
    searchWpName () {
      console.log(11111)
    },
    // 病虫害预警
    getDiseases (name, val) {
      getDiseases({ type: name, period: val }).then(res => {
        console.log('log-------441', res.data)
        if (res.data.state === 'ok') {
          this.tableD = res.data.data
        }
      })
    },
    // 病虫害预警 查看详情
    checkDetail (val) {
      this.showDetail = false
      this.warningdetails = val
      console.log('log-------val426', val)
    },
    // 病虫害预警选择成长期
    changeSelectPes (val) {
      console.log('log------451')
      this.getDiseases(this.pstVal, val)
    },
    // 市场信息 选择名称
    handleSelect (item) {
      this.search.name = item.value
    },
    // 市场信息下拉框
    changeItem (item) {
      if (this.search.name !== '') {
        console.log(this.search.name, item)
        getHnwj({ name: this.search.name, type: item, id: this.$route.query.id }).then(res => {
          console.log('log----res', res)
          this.price.max = res.data.max
          this.price.min = res.data.min
          this.price.avg = res.data.avg
          const Arr1 = []
          const Arr2 = []
          res.data.data.list.map(item => {
            if (item.price.indexOf('两') !== -1) {
              item.value = Number(item.price.match(/(\S*)两/)[1]) / 10
            } else {
              item.value = Number(item.price.match(/(\S*)元/)[1])
            }
            Arr1.push(item.up_time)
            Arr2.push(item.value)
          })
          this.priceData.Arr1 = Arr1
          this.priceData.Arr2 = Arr2
          console.log('log------480', this.priceData)
          this.$refs.chart.scChart(this.priceData)
        })
      } else {
        this.$message.warning('请先选择作物品种')
      }
    },
    // 点击遥感
    clickYg (command) {
      console.log(command)
      // const type = command.type
      console.log(this.ygList)
      if (this.selectid === command.id) {
        this.selectid = 0
      } else {
        this.selectid = command.id
        this.ygList.map(item => {
          if (item.dir_name === command.name) {
            if (item.type === 1 || item.type === 5) {
              console.log('tif')
              console.log(item)
              const latlon = [[item.topLeftLatitude, item.topLeftLongitude], [item.bottomRightLatitude, item.bottomRightLongitude]]
              this.$refs.map.addDelTif(item, latlon)
            }
            if (item.type === 3) {
              console.log(item)
              this.$refs.map.detailImageTransform(item)
            }
            if (item.type === 4) {
              console.log('SP')
              console.log(item)
              this.$refs.map.detailAddPolygon(item)
            }
          }
        })
      }
    },
    // 点击左上角数据
    clickItem (val) {
      getCamera({ id: this.$route.query.id }).then(res => {
        var data = res.data.data
        this.$refs.map.addMarkObj(data)
      })
    },
    // 获取土壤模块信息
    getSoilAttribute () {
      getSoilAttribute({
        id: this.$route.query.id
      }).then(res => {
        const bute = res.data.data
        const arr = []
        for (var val in bute) {
          var obj = {}
          obj.name = val
          obj.value = bute[val]
          arr.push(obj)
        }
        this.bute = arr
      })
    },
    // tab>>>header背景色
    headClass () {
      return 'background-color: #E3F0F7;'
    },
    // 获取详情信息
    getDkDetail () {
      getDkDetail({ id: this.$route.query.id }).then(res => {
        this.fieldDetail = res.data.record
        this.$refs.map.addDetailGeoJson(res.data.geojson.st_asgeojson)
      })
    },
    // 获取7日天气
    getWeather () {
      const _this = this
      getWeather({
        lat: _this.$route.query.lat,
        lon: _this.$route.query.lon
      }).then(res => {
        this.weather = res.data
        for (var i = 0; i < this.weather.data.length; i++) {
          this.weather.data[i].win = this.weather.data[i].win.join(',')
        }
        this.theDay = this.weather.data[0]
        for (var k = 0; k < this.theDay.hours.length; k++) {
          if (this.theDay.hours[k].wea.search('云') !== -1) {
            this.theDay.hours[k].wea_img = 'yun'
          } else if (this.theDay.hours[k].wea.search('雨') !== -1) {
            this.theDay.hours[k].wea_img = 'yu'
          } else if (this.theDay.hours[k].wea.search('阴') !== -1) {
            this.theDay.hours[k].wea_img = 'yin'
          } else if (this.theDay.hours[k].wea.search('晴') !== -1) {
            this.theDay.hours[k].wea_img = 'qing'
          } else if (this.theDay.hours[k].wea.search('雷') !== -1) {
            this.theDay.hours[k].wea_img = 'lei'
          } else if (this.theDay.hours[k].wea.search('雪') !== -1) {
            this.theDay.hours[k].wea_img = 'xue'
          } else if (this.theDay.hours[k].wea.search('雾') !== -1) {
            this.theDay.hours[k].wea_img = '雾'
          } else if (this.theDay.hours[k].wea.search('冰雹') !== -1) {
            this.theDay.hours[k].wea_img = 'bingbao'
          } else if (this.theDay.hours[k].wea.search('沙尘') !== -1) {
            this.theDay.hours[k].wea_img = 'shachen'
          }
        }
      })
    },
    changeRadio (val) {
      console.log(val)
      if (val === '近期易发病害') {
        this.pstVal = '病害'
        this.getDiseases(this.pstVal, this.pesVal)
      } else if (val === '近期易发虫害') {
        this.pstVal = '虫害'
        this.getDiseases(this.pstVal, this.pesVal)
      } else {
        this.pstVal = '草害'
        this.getDiseases(this.pstVal, this.pesVal)
      }
    }
  },
  created () {
    this.getWeather()
    getYears({}).then(res => {
      this.pirData = res.data.list
    })
    this.yaogList = JSON.parse(sessionStorage.getItem('yaogList'))
  },
  activated () {
    this.getDkDetail()
    this.getSoilAttribute()
    this.getTkRemoteData()
    this.outputVal()
    this.getDiseases(this.pstVal, this.pesVal)
  },
  mounted () {
    this.jwWidth = this.$refs.jw.offsetWidth
    this.jwHeight = this.$refs.jw.offsetHeight - 50
    this.getJwAndJy(this.jwSearch)
    window.onresize = () => {
      return (() => {
        this.jwWidth = this.$refs.jw.offsetWidth
        this.jwHeight = this.$refs.jw.offsetHeight - 50
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-select > .el-input {
  width: 80px;
}
::v-deep .el-tabs__content {
  padding: 6px;
}
.block {
  position: absolute;
  top: 70px;
  left: 10px;
  z-index: 999;
  width: 150px;
  height: 300px;
}
.container {
  width: 100%;
  height: 100%;
  .tlt_box {
    color: #303331;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .top_box {
    width: 100%;
    display: flex;
    height: 528px;
    .left_box {
      width: calc(100% - 920px);
      height: 100%;
      .map_box {
        position: relative;
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
        .top_right {
          position: absolute;
          top: 5px;
          right: 12px;
          z-index: 999;
          height: 20px;
        }
      }
    }
    .right_box {
      width: 900px;
      height: 528px;
      margin-left: 20px;
      .top_box {
        height: 170px;
        background-color: #fff;
        border-radius: 10px;
        position: relative;
        .tlt_box {
          position: absolute;
          top: -30px;
          color: #303331;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .content_box {
          display: flex;
          width: 100%;
          padding: 10px;
          .content_left {
            display: flex;
            align-items: center;
            .left_img {
              height: 95%;
              width: 234px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .content_right {
            width: 100%;
            margin-left: 10px;
            line-height: 26px;
            .right_msg {
              height: 26px;
            }
            .msg_box_t {
              display: flex;
              justify-content: space-between;
            }
            // display: flex;
            // justify-content: space-between;
            // .left_msg {
            //   color: #4f4f4f;
            //   font-size: 14px;
            //   line-height: 25px;
            //   margin-top: 25px;
            // }
          }
        }
      }
      .bot_box {
        width: 100%;
        height: 322px;
        background-color: #fff;
        border-radius: 10px;
        position: relative;
        margin-top: 4%;
        .tlt_box {
          position: absolute;
          top: -27px;
          color: #303331;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .cont_bot_box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .tleft_box {
            width: 68%;
            padding: 20px;
            .t_top {
              width: 100%;
              display: flex;
              color:rgba(48,51,49,1);
              justify-content: space-between;
              align-items: center;
              height: 88px;
              border-bottom: 1px solid #F1F1F1;
              .top_left {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
              }
              .top_cont {
                width: 88px;
                height: 88px;
                img {
                  width: 100%;
                }
              }
              .top_right {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .right_wd {
                  font-size:36px;
                  font-weight:400;
                  font-family:'Microsoft YaHei';
                  color:rgba(34,180,255,1);
                }
                .right_day {
                  font-size:16px;
                  font-family:Microsoft YaHei;
                  font-weight:700;
                  color:rgba(48,51,49,1);
                }
              }
            }
            .t_cont {
              width: 100%;
              color:rgba(48,51,49,1);
              padding: 10px 0;
              border-bottom: 1px solid #F1F1F1;
              ul {
                padding: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                li {
                  list-style: none;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  align-items: center;
                  img {
                    width: 36px;
                    height: 36px;
                  }
                  span {
                    margin-top: 6px;
                  }
                }
              }
            }
            .t_bot {
              margin-top: 14px;
              ul {
                width: 100%;
                padding: 0;
                display: flex;
                justify-content: space-between;
                li {
                  list-style: none;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  align-items: center;
                }
              }
            }
          }
          .tright_box {
            width: 32%;
            padding: 1.3% 20px;
            height: 100%;
            color:rgba(48,51,49,1);
            font-size:16px;
            border-left: 1px solid #F1F1F1;
            .tr_top {
              width: 100%;
              text-align: center;
              color: #303331;
              font-size: 16px;
              margin-top: 5%;
              font-weight: 700;
            }
            .tr_bot {
              width: 100%;
              ul {
                width: 100%;
                padding: 0;
                margin: 12% 0 0 0;
                li {
                  width: 100%;
                  font-size: 14px;
                  list-style: none;
                  color: #606662;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  img {
                    width: 29px;
                    height: 29px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .bot_box {
    width: 100%;
    height: calc(100% - 566px);
    margin-top: 20px;
    .element_box {
      margin: 0 auto;
      display: flex;
      width: 400px;
      .box_1 {
        background-color: #ff9569;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_2 {
        background-color: #f5ceb4;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_3 {
        background-color: #faafb8;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_4 {
        background-color: #2f92d9;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_4_1 {
        background-color: #2f92d9;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
        opacity: 0.6;
      }
      .box_5 {
        background-color: #9fe8c3;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_6 {
        background-color: #f5ceb4;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_7 {
        background-color: #faafb8;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_8 {
        background-color: #00d570;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_9 {
        background-color: #FBAFB9;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
      .box_9_1 {
        background-color: #f5485f;
        border-radius: 3px;
        text-align: center;
        color: floralwhite;
      }
    }
    .sf_suggest {
      width: 100%;
      height: 100%;
      .not_msg {
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 20px;
        color:#ccc;
      }
      .th_box {
        height: 42px;
        line-height: 42px;
        background-color: rgba(240, 247, 251, 1);
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        text-align: center;
        font-family: Roboto;
      }
      .tjfa_box {
        height: 185px;
        line-height: 185px;
        background-color: rgba(240, 247, 251, 1);
      }
    }
    .topS_box {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    .tab_box {
      margin-top: 20px;
      height: 100%;
      ul {
        height: 100%;
      }
    }
    .sc_box {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .left_box {
        display: flex;
        margin-right: 3%;
        z-index: 999;
        p {
          width: 200px;
          color: #ccc;
          margin-right: 2%;
        }
      }
      .right_box {
        z-index: 999;
      }
    }
  }
}
.del_title {
  display: flex;
  padding: 14px;
  position: relative;
  justify-content: center;
  border-bottom: 1px solid #EEEEEE;
  .el_btn {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #49B4FA;
    color: #fff;
  }
}
.ul_box {
  margin-top: 10px;
  width: 100%;
  max-height: 150px;
  overflow:auto;
  .li_box {
    width: 100%;
    list-style: none;
    line-height: 20px;
  }
}
.left_select {
  position: absolute;
  left: 30%;
  top: 0;
  z-index: 999;
}
.right_select {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
}
</style>
