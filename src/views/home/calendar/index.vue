<template>
  <div class="main">
    <template v-if="isShow">
      <div class="choose_year">
        <div class="icon" @click="chooseYears(-1)"><i class="fa fa-angle-double-left"></i></div>
        <div class="icon" @click="chooseMonth(-1)"><i class="fa fa-angle-left"></i></div>
        <div class="date">{{year}}.{{month.toString().padStart(2, '0')}}</div>
        <div class="icon" @click="chooseMonth(1)"><i class="fa fa-angle-right"></i></div>
        <div class="icon" @click="chooseYears(1)"><i class="fa fa-angle-double-right"></i></div>
      </div>
      <div class="days_area">
        <div class="day week" v-for="week in weeks" :key="week">{{week}}</div>
        <div class="day" @click="chooseThisDay(day.gregorian)" v-for="(day, index) in days" :key="index" :class="day.gregorian === today ? 'choose_day' : ''">
          <p>{{day.gregorian}}</p>
          <span>{{day.lunar}}</span>
        </div>
      </div>
    </template>
    <template v-else>
       <div class="bot_box">
          <div class="top_tlt">
            <div style="font-weight: 700">
              <span>{{month.toString()}}月</span>
              <span style="margin-left:20px">{{selectNum}}日</span>
            </div>
            <div>
              <btn @click="hiddenDetail" type="text">返回</btn>
            </div>
          </div>
          <div class="collapse_box">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item name="1">
                <template slot="title">
                  <span style="font-weight: 700">{{month.toString()}}月上旬主要农时</span>
                </template>
                <div>
                  <el-table
                    :data="dirdata.st0"
                    style="width: 100%">
                    <el-table-column
                      prop=""
                      width="54"
                      label="农作物"
                      >
                      <template slot-scope="scope">
                        <div>{{ scope.row.data[0].substring(1) }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="东北"
                      >
                       <template slot-scope="scope">
                        <div v-if="scope.row.data[1] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[1]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="西北">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[2] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[2]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="华北"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[3] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[3]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="黄淮"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[4] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[4]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="江淮">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[5] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[5]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="江南"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[6] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[6]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="华南"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[7] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[7]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="西南">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[1] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[1]}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <span style="font-weight: 700">{{month.toString()}}月中旬主要农时</span>
                </template>
                <div>
                  <el-table
                    :data="dirdata.st1"
                    style="width: 100%">
                    <el-table-column
                      prop=""
                      label="农作物"
                      width="54"
                      >
                      <template slot-scope="scope">
                        <div>{{ scope.row.data[0].substring(1) }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="东北"
                      width="45"
                      >
                       <template slot-scope="scope">
                        <div v-if="scope.row.data[1] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[1]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="西北">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[2] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[2]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="华北"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[3] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[3]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="黄淮"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[4] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[4]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="江淮">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[5] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[5]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="江南"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[6] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[6]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="华南"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[7] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[7]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="西南">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[1] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[1]}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template slot="title">
                  <span style="font-weight: 700">{{month.toString()}}月下旬主要农时</span>
                </template>
                <div>
                  <el-table
                    :data="dirdata.st2"
                    style="width: 100%">
                    <el-table-column
                      prop=""
                      width="54"
                      label="农作物"
                      >
                      <template slot-scope="scope">
                        <div>{{ scope.row.data[0].substring(1) }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="东北"
                      >
                       <template slot-scope="scope">
                        <div v-if="scope.row.data[1] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[1]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="西北">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[2] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[2]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="华北"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[3] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[3]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="黄淮"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[4] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[4]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="江淮">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[5] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[5]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="江南"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[6] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[6]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="华南"
                      width="45"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[7] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[7]}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      width="45"
                      label="西南">
                      <template slot-scope="scope">
                        <div v-if="scope.row.data[1] === ' &nbsp'"></div>
                        <div v-else>{{scope.row.data[1]}}</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
    </template>
  </div>
</template>

<script>
import { getDirMsg } from '@/api/api'
export default {
  name: 'calendar',
  data () {
    return {
      dirdata: [],
      year: 0,
      month: 0,
      today: 0,
      days: [],
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      isShow: true,
      selectNum: 0,
      activeName: '1'
    }
  },
  mounted () {
    const now = new Date()
    this.year = now.getFullYear()
    this.month = now.getMonth() + 1
    this.today = now.getDate()
    this.getDays()
  },
  methods: {
    getDays () { // 获取当前月份所有公历日期及其农历日期
      this.days = []
      const day = new Date()
      day.setFullYear(this.year, this.month - 1, 1) // 此处较之前调整，获取当月第一天
      const month = new Date()
      month.setFullYear(this.year, this.month, 0) // 此处较之前调整，获取当月
      for (let i = 1; i < day.getDay(); i++) { // 当月第一天距离所在周周一的空白占位
        this.days.push({ gregorian: '', lunar: '' })
      }
      for (let i = 1; i <= month.getDate(); i++) { // 获取当月天数填充日历
        this.days.push({ gregorian: i, lunar: this.getLunarDay(this.year, this.month, i) })
      }
    },
    chooseYears (state) { // 改变年份
      this.year += state
      this.today = 1
      this.getDays()
    },
    chooseMonth (state) { // 改变月份
      this.month += state
      this.today = 1
      if (this.month < 1) {
        this.month = 12
        this.chooseYears(-1)
      } else if (this.month > 12) {
        this.month = 1
        this.chooseYears(1)
      } else {
        this.getDays()
      }
    },
    chooseThisDay (day) { // 选择某天，主要是考虑可以当时间选择器用
      this.isShow = false
      this.selectNum = day
      if (day <= 10) {
        this.activeName = '1'
      } else if (day > 10 && day <= 20) {
        this.activeName = '2'
      } else {
        this.activeName = '3'
      }
      getDirMsg({ month: this.month }).then(res => {
        if (res.data.state === 'ok') {
          const dirdata = res.data
          for (var i in dirdata) {
            if (Array.isArray(dirdata[i])) {
              for (let k = 0; k < dirdata[i].length; k++) {
                dirdata[i][k].data = dirdata[i][k].data.replace(/'/g, '').split(',')
              }
            }
          }
          this.dirdata = dirdata
        }
      })
      if (day > 0) {
        this.today = day
      }
    },
    // 点击返回按钮
    hiddenDetail () {
      this.isShow = true
    },
    getLunarDay (solarYear, solarMonth, solarDay) { // 拷贝别人又自己调整过的获取农历日期的代码，想要原来的代码估计百度一下就有了
      const madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
      // const tgString = '甲乙丙丁戊己庚辛壬癸'
      // const dzString = '子丑寅卯辰巳午未申酉戌亥'
      const numString = '一二三四五六七八九十'
      const monString = '正二三四五六七八九十冬腊'
      const CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95]
      if (!(solarYear < 1921 || solarYear > 2999)) { // 注意看此处限定了年份，设置自己需要的范围即可
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11
        const timeArr = [solarYear, solarMonth, solarDay]
        const TheDate = (timeArr.length !== 3) ? new Date() : new Date(timeArr[0], timeArr[1], timeArr[2])
        let total, m, n, k
        let isEnd = false
        const theDateYear = TheDate.getFullYear()
        total = (theDateYear - 1921) * 365 + Math.floor((theDateYear - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38
        if (theDateYear % 4 === 0 && TheDate.getMonth() > 1) {
          total++
        }
        for (m = 0; ; m++) {
          k = (CalendarData[m] < 0xfff) ? 11 : 12
          for (n = k; n >= 0; n--) {
            if (total <= this.getBit(CalendarData[m], n)) {
              isEnd = true
              break
            }
            total = total - this.getBit(CalendarData[m], n)
          }
          if (isEnd) {
            break
          }
        }
        var cMonth, cDay // cYear,
        // cYear = 1921 + m
        cMonth = k - n + 1
        cDay = total
        if (k === 12) {
          if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth
          }
          if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--
          }
        }
        // let run = ''
        let cDayStr = numString.charAt(cDay - 1)
        /* if (cMonth < 1) {
          run = '(闰)'
        } */
        if (cDay % 10 !== 0 || cDay === 10) {
          cDayStr = numString.charAt((cDay - 1) % 10)
        }
        return cDay === 1 ? monString.charAt(cMonth - 1) + '月' : (cDay < 11 ? '初' : (cDay < 20 ? '十' : (cDay < 30 ? '廿' : '三十'))) + cDayStr // tgString.charAt((cYear - 4) % 10) + dzString.charAt((cYear - 4) % 12) + '年 ' + run + monString.charAt(cMonth - 1) + '月' +
      }
    },
    getBit (m, n) { // 也是拷贝的，不是很明白这段代码干嘛的，不过很明显是处理二进制数据的
      return 29 + ((m >> n) & 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-table--medium th {
    padding: 4px 0;
  }
  ::v-deep .el-table th > .cell {
    padding-left: 0;
    padding-right: 0;
  }
  ::v-deep .el-table .cell {
    padding: 0;
  }
  .bot_box {
      .top_tlt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px;
      }
      .collapse_box {
        padding: 0 12px;
        height: 234px;
        overflow-y: auto;
      }
    }
   .main{
    .choose_year{
      display: flex;
      .icon{
        width: 10%;
        height: 4vh;
        line-height: 4vh;
        text-align: center;
      }
      .date{
        width: 60%;
        text-align: center;
        height: 4vh;
        line-height: 4vh;
        font-size: 1.2rem;
      }
    }
    .days_area{
      display: flex;
      flex-wrap: wrap;
      .day{
        width: 14.28%;
        text-align: center;
        padding: 3px 0;
        margin-top: 5px;
        p{
          margin: 0;
          font-size: 14px;
        }
        span{
          font-size: 14px;
        }
      }
      .week{
        // background-color: #606662;
        color: #606662;
        font-weight: bold;
        height: 2vh;
        line-height: 1vh;
        margin: 0;
      }
      .choose_day{
        background-color: #606662;
        opacity: 0.7;
        color: #fff;
        font-weight: bold;
      }
    }
  }
</style>
