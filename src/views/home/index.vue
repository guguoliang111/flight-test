<template>
  <div class="content_box">
    <div class="top_box">
      <div class="tlt_box">
        <div>数据统计 <span style="color: #909993; font-size: 16px">Data statistics</span></div>
        <div style="color: #909993; font-size: 16px; cursor: pointer;"> <i class="el-icon-download"></i> 报表下载</div>
      </div>
      <div class="matter_box">
        <div class="top_menu">
          <div class="demo">
            <!-- <img src="@/assets/images/one.png" alt=""> -->
            <div class="cont_val">
              <p>12</p>
              <p>今日上传</p>
            </div>
          </div>
          <div class="demo1">
            <div class="cont_val">
              <p>18</p>
              <p>今日下载</p>
            </div>
          </div>
          <div class="demo2">
            <div class="cont_val">
              <p>4582</p>
              <p>总数据</p>
            </div>
          </div>
          <div class="demo3">
            <div class="cont_val">
              <p>45</p>
              <p>用户数</p>
            </div>
          </div>
        </div>
        <div ref="chartBox" class="bot_meange">
          <Chart ref="chart" :height="cdHeight" :width="cdWidth" :showId="2"></Chart>
        </div>
      </div>
      <div></div>
    </div>
    <div class="bot_box">
      <div class="left">
        <div class="left_tlt">
          <div>用户统计 <span style="color: #909993; font-size: 16px">User statistics</span></div>
        </div>
        <div class="chart1">
          <Chart ref="chart1" :showId="1" :width="360" :height="270"> </Chart>
        </div>
        <div class="chart2">
          <Chart ref="chart2" :showId="3" :width="360" :height="270"> </Chart>
        </div>
      </div>
      <div class="right">
         <div class="right_tlt">
          <div>消息通知 <span style="color: #909993; font-size: 16px">Message notification</span></div>
        </div>
        <div class="rit_conter">
          <ul>
            <li v-for="(i, k) in msgList" :key="k">
              <div><span>{{k+1}}、</span>{{i.tlt}}</div>
              <div>{{i.time}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from './components/chart'
export default {
  name: '',
  components: {
    Chart
  },
  data () {
    return {
      cdWidth: 0,
      cdHeight: 0,
      msgList: [
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' },
        { tlt: '王小虎上传了***光谱数据。', time: '2020-10-26  10:12:45' }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted () {
    this.cdWidth = this.$refs.chartBox.offsetWidth
    this.cdHeight = this.$refs.chartBox.offsetHeight
    window.onresize = () => {
      return (() => {
        this.cdWidth = this.$refs.chartBox.offsetWidth
        this.cdHeight = this.$refs.chartBox.offsetHeight
      })()
    }
    setTimeout(() => {
      this.$refs.chart.dsSohwLine()
      this.$refs.chart1.drawLine()
      this.$refs.chart2.smawLine()
    }, 500)
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.content_box {
  width: 100%;
  height: 100%;
  // padding: 20px;
  .top_box {
    width: 100%;
    .tlt_box {
      padding: 14px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      // background-color: pink;
      font-size: 20px;
    }
    .matter_box {
      width: 100%;
      height: 480px;
      background-color: #fff;
      border-top: 4px solid #51a6ff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      padding: 20px;
      .top_menu {
        display: flex;
        justify-content: space-around;
        .demo {
          width: 350px;
          height: 146px;
          background: url('../../assets/images/one.png') no-repeat;
          .cont_val {
            width: 175px;
            height: 100%;
            float: right;
            padding: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p:first-child {
              font-size: 42px;
              color: #fff;
              font-weight: 700;
            }
            p:last-child {
              font-size: 18px;
              color: #fff;
              font-weight: 700;
            }
          }
        }
        .demo1 {
          width: 350px;
          height: 146px;
          background: url('../../assets/images/two.png') no-repeat;
          .cont_val {
            width: 175px;
            height: 100%;
            float: right;
            padding: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p:first-child {
              font-size: 42px;
              color: #fff;
              font-weight: 700;
            }
            p:last-child {
              font-size: 18px;
              color: #fff;
              font-weight: 700;
            }
          }
        }
        .demo2 {
          width: 350px;
          height: 146px;
          background: url('../../assets/images/three.png') no-repeat;
          .cont_val {
            width: 175px;
            height: 100%;
            float: right;
            padding: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p:first-child {
              font-size: 42px;
              color: #fff;
              font-weight: 700;
            }
            p:last-child {
              font-size: 18px;
              color: #fff;
              font-weight: 700;
            }
          }
        }
        .demo3 {
          width: 350px;
          height: 146px;
          background: url('../../assets/images/four.png') no-repeat;
          .cont_val {
            width: 175px;
            height: 100%;
            float: right;
            padding: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p:first-child {
              font-size: 42px;
              color: #fff;
              font-weight: 700;
            }
            p:last-child {
              font-size: 18px;
              color: #fff;
              font-weight: 700;
            }
          }
        }
      }
      .bot_meange {
        margin-top: 25px;
        width: 100%;
        height: 268px;
      }
    }
  }
  .bot_box {
    margin-top: 50px;
    width: 100%;
    height: calc(100% - 574px);
    display: flex;
    .left {
      width: 990px;
      height: 100%;
      background-color: #fff;
      border-top: 4px solid #51a6ff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: relative;
      .left_tlt {
        font-size: 20px;
        position: absolute;
        top: -40px;
        left: 0;
      }
    }
    .right {
      margin-left: 20px;
      width: calc(100% - 1010px);
      height: 100%;
      background-color: #fff;
      border-top: 4px solid #51a6ff;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: relative;
      .right_tlt {
        font-size: 20px;
        position: absolute;
        top: -40px;
        left: 0;
      }
      .rit_conter {
        width: 100%;
        height: 100%;
        ul {
          height: 100%;
          overflow: hidden;
          padding: 10px 20px;
          line-height: 30px;
          overflow-y: auto;
          li {
            // color: rgba(81, 166, 255, 100);
            font-size: 14px;
            color: #909993;
            list-style: none;
            display: flex;
            justify-content: space-between;
            span {
              // margin-right: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
