<template>
  <div class="page-container">
    <div class="page-title">地块分布</div>
    <!-- <el-card class="box-card"> -->
    <!-- <div class="map_chaart"> -->
    <div class="card_box">
      <div style="width: 70%; height: 100%">
        <Map class="leaflet_box" style="height: 100%; border-radius: 10px;" className="map-box" ref="map" :center="[40.82, 114.88]" :tile="baseMapList">
           <l-marker v-for="(x, index) in qyData" :key="index" :lat-lng="[x.lat,x.lon]">
              <l-icon
              :icon-size="[45,30]"
              :iconAnchor="[15,30]"
              :icon-url="`/images/yjimg/${sjname[x.codename]}/${colorname[x.signallevel]}`"
              >
              </l-icon>
            <l-popup class="qyxqcon">
              <div class="qyxq">
                <!-- <h2> -->
                  <!-- {{x.name}} -->
                  <!-- <span v-if="userid==x.userid" @click="goAlter(x)" style="margin-left: 5px" class="sqck iconfont iconxiugai"></span> -->
                <!-- </h2> -->
                  <!-- <img :src="$updateImg(x.logo)" alt=""> -->
                  <!-- <el-image v-if="x.logo" style="width: 100%; height: 100%" :src="GLOBAL.imgserverip + x.logo"></el-image> -->
                  <p v-if="x.issuecontent">{{x.issuecontent}}</p>
                  <!-- <p v-if="x.address">企业地址：{{x.address}}</p> -->
                  <!-- <p v-if="x.faren">法人代表：{{x.faren}}</p> -->
                  <!-- <p v-if="x.fanwei">经营范围：{{x.fanwei}}</p> -->
                  <!-- <p v-if="x.zijin">注册资金：{{x.zijin}}</p> -->
                  <!-- <p v-if="x.breed">牧草品种：{{x.breed}}</p> -->
                  <!-- <p v-if="x.yield">牧草产量：{{x.yield}}吨/年</p> -->
                  <!-- <p v-if="x.repertory">牧草库存：{{x.repertory}}吨</p> -->
                  <!-- <p v-if="x.telephone">联系方式：{{x.telephone}}</p> -->
                  <!-- <div @click="checkDetails(x)" class="detile_box"> -->
                  <!-- <span>查看详情</span> -->
                  <!-- <router-link target="_blank" :to="{path:'/companydetail',query:{list: x}}">查看详情</router-link> -->
                <!-- </div> -->
              </div>
            </l-popup>
          </l-marker>
          <div class="top_left">
            <el-dropdown @command="clickItem" placement="bottom">
              <span class="el-dropdown-link">
                预警
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="3">3H</el-dropdown-item>
                <el-dropdown-item command="6">6H</el-dropdown-item>
                <el-dropdown-item command="12">12H</el-dropdown-item>
                <el-dropdown-item command="24">24H</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="clickWeather" placement="bottom">
              <span class="el-dropdown-link">
                气象
              </span>
              <el-dropdown-menu  slot="dropdown">
                <el-dropdown-item command="1">气温</el-dropdown-item>
                <el-dropdown-item command="1">降水量</el-dropdown-item>
                <el-dropdown-item command="1">辐射</el-dropdown-item>
                <el-dropdown-item command="1">比湿</el-dropdown-item>
                <el-dropdown-item command="1">蒸散发</el-dropdown-item>
                <el-dropdown-item command="1">土壤湿润</el-dropdown-item>
                <el-dropdown-item command="1">土壤温度</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link">
                土壤
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>砂粒 (%)</el-dropdown-item>
                <el-dropdown-item>黏粒 (%)</el-dropdown-item>
                <el-dropdown-item>粉粒 (%)</el-dropdown-item>
                <el-dropdown-item>pH_H20</el-dropdown-item>
                <el-dropdown-item>电导率 (dS/m)</el-dropdown-item>
                <el-dropdown-item>有机碳 (% C)</el-dropdown-item>
                <el-dropdown-item>总氮 (g/kg)</el-dropdown-item>
                <el-dropdown-item>有效磷 (mg/kg)</el-dropdown-item>
                <el-dropdown-item>有效钾 (mg /Kg)</el-dropdown-item>
                <el-dropdown-item>交换性钙 (mg/Kg)</el-dropdown-item>
                <el-dropdown-item>交换性镁 (mg/Kg)</el-dropdown-item>
                <el-dropdown-item>交换性钠 (mg/Kg)</el-dropdown-item>
                <el-dropdown-item>CEC (cmol(+)/Kg)</el-dropdown-item>
                <el-dropdown-item>Base Saturation (%)</el-dropdown-item>
                <el-dropdown-item>Bulk Density (g/cm3)</el-dropdown-item>
                <el-dropdown-item>孔隙率 (%)</el-dropdown-item>
                <el-dropdown-item>饱和导水率 (cm/d)</el-dropdown-item>
                <el-dropdown-item>土壤呼吸 (CO2 - Kg/ha/d)</el-dropdown-item>
                <el-dropdown-item>土壤厚度 (cm)</el-dropdown-item>
                <el-dropdown-item>土壤分类 (WRB)</el-dropdown-item>
                <el-dropdown-item>饱和含水量 (cm3 cm-3)</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link">
                土地利用
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>GlobeLand30</el-dropdown-item>
                <el-dropdown-item>ESACCl-LC</el-dropdown-item>
                <el-dropdown-item>ChinaEco100</el-dropdown-item>
                <el-dropdown-item>水体</el-dropdown-item>
                <el-dropdown-item>农作物</el-dropdown-item>
                <el-dropdown-item>保护区</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link">
                作物管理
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>农田熟制</el-dropdown-item>
                <el-dropdown-item>物候</el-dropdown-item>
                <el-dropdown-item>施肥量</el-dropdown-item>
                <el-dropdown-item>灌溉面积</el-dropdown-item>
                <el-dropdown-item>水坝</el-dropdown-item>
                <el-dropdown-item>作物品种</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link">
                遥感
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Landsat</el-dropdown-item>
                <el-dropdown-item>Sentinel-1</el-dropdown-item>
                <el-dropdown-item>Sentinel-2</el-dropdown-item>
                <el-dropdown-item>GF-1</el-dropdown-item>
                <el-dropdown-item>GF-6</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link">
                市场
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>肥料价格</el-dropdown-item>
                <el-dropdown-item>农药价格</el-dropdown-item>
                <el-dropdown-item>作物价格</el-dropdown-item>
                <el-dropdown-item>人工成本</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
              <Chart :showId="1" :width="240" :dataList="dataList" :height="220"></Chart>
            </div>
            <div class="char_box1">
              <Chart :showId="1" :width="240" :dataList="chalList" :height="220"></Chart>
            </div>
          </div>
        </div>
        <div class="calendar_box">
          <div class="calendar_tlt">
            <i class="el-icon-menu"></i>
            <span>作物种植物日历</span>
          </div>
          <Calendar></Calendar>
        </div>
        <div class="bot_box">
          <div class="bot_tlt">
            <i class="el-icon-menu"></i>
            <span>田间操作记录</span>
          </div>
          <div style="border-radius: 20px;">
           <vue-seamless-scroll :data="listData" :class-option="optionLeft" class="seamless-warp">
              <ul class="item">
                  <li class="item_li" v-for="(item, index) in listData" :key="index">
                    <div class="li_top">
                      <div class="top_left">
                        <div class="dian_box"></div>
                        <div class="assice_box">{{item.assice}}</div>
                        <div class="pinz_box">{{item.pinz}}</div>
                      </div>
                      <div class="top_right">{{item.date}}</div>
                    </div>
                    <div class="li_bot">
                      <div class="bot_top">{{item.title}}</div>
                      <div class="bot_bot">
                        <img v-for="(x, i) in item.imgs" :key="i" :src="x.url" alt="">
                      </div>
                    </div>
                  </li>
              </ul>
          </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LMarker, LPopup, LIcon } from 'vue2-leaflet'
import pagination from '@/mixins/pagination'
import Map from '@/components/Map'
import Chart from './chart'
import Calendar from '../calendar'
import { getEarlyWarning, getShp } from '@/api/index'
import { baseMapRules } from '@/utils/formRules'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('basemap')

export default {
  name: 'BaseMapList',
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
      listData: [
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        {
          assice: '陕西西安示范田',
          pinz: '小麦',
          title: '王小虎在田间进行了灌溉操作。',
          date: '2017-12-16',
          imgs: [
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        }
      ],
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
        sum: '1250块',
        data: [
          { value: 312, name: '小麦' },
          { value: 435, name: '玉米' },
          { value: 123, name: '棉花' },
          { value: 435, name: '大豆' }
        ]
      },
      chalList: {
        title: '地块面积',
        sum: '1280万亩',
        data: [
          { value: 312, name: '小麦' },
          { value: 235, name: '玉米' },
          { value: 423, name: '棉花' },
          { value: 335, name: '大豆' }
        ]
      },
      dialog: false,
      qyData: [],
      tableData: [{
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      }, {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      },
      {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      },
      {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      },
      {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      },
      {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      },
      {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      }, {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      },
      {
        date: '试验田',
        name: '陕西',
        address: '大豆',
        Mnum: '20.5亩'
      }],
      loading: true,
      activeName: '1',
      uploadForm: {
        name: '',
        uploadUrl: '',
        status: 2,
        file: ''
      },
      date: new Date(),
      baseMapRules,
      update: false,
      page: {
        pageNum: 1,
        pageSize: 3,
        total: 0
      },
      baseMapStatus: 2,
      currentRow: null
    }
  },
  methods: {
    ...mapMutations(['setList']),
    // 获取shp
    getShp () {
      getShp({}).then(res => {
        console.log('log-----1111', res)
        if (res.state === 'ok') {
          const geoList = res.geolist
          for (let i = 0; i < geoList.length; i++) {
          }
        }
      })
    },
    getList () {
      // 获取底图列表
      // const send = {
      //   pageNum: this.page.pageNum,
      //   pageSize: this.page.pageSize
      // }
    },
    // 点击地图上预警选项
    clickItem (command) {
      getEarlyWarning({ time: command }).then(res => {
        this.qyData = res.yj
      })
      // this.$router.push('/admin/baseMap/detail')
    },
    // 点击地图上方气象选项
    clickWeather (command) {
      console.log(command, '触发')
      this.$router.push('/admin/baseMap/detail')
    },
    composeValue (val) {
      console.log(val)
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
    this.$refs.map.addShp()
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  .card_box {
    display: flex;
    height: 98%;
    .leaflet_box {
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
        width: 40%;
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
      .tlt_box {
        font-size: 18px;
        font-weight: 700;
        position: absolute;
        top: -29px;
      }
    }
    width: 30%;
    padding: 0 20px;
    height: 100%;
    .calendar_box {
      width: 100%;
      position: relative;
      background-color: #fff;
      border-radius: 20px;
      margin-top: 8%;
      .calendar_tlt {
        position: absolute;
        top: -9%;
        font-size: 18px;
        font-weight: 700;
      }
    }
    .bot_box {
      position: relative;
      background-color: #fff;
      border-radius: 20px;
      margin-top: 8%;
      .bot_tlt {
        font-size: 18px;
        font-weight: 700;
        position: absolute;
        top: -12%;
      }
    }
    .redio_chart {
      display: flex;
      background-color: #fff;
      align-items: center;
      height: 200px;
      border-radius: 20px;
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
  height: 229px;
  overflow: hidden;
  .item {
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
          justify-content: space-between;
          margin-top: 10px;
          margin-bottom: 10px;
          img {
            width: 96px;
            height: 58px;
          }
        }
      }
    }
  }
}
</style>
