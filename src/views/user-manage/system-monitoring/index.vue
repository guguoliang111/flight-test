<template>
  <div class="content_box">
    <div class="top_box">
      <div class="left_box">
        <div class="chart1">
          <div style="font-size: 18px; color: #51A6FF;">储存空间监控</div>
          <Chart ref="chart1" :showId="1" :width="360" :height="270"> </Chart>
        </div>
      </div>
      <div class="right_box">
        <div ref="chartBox" class="bot_meange">
          <Chart ref="chart" :height="cdHeight" :width="cdWidth" :showId="2"></Chart>
        </div>
      </div>
    </div>
    <div class="bot_box">
      <div class="tab_left">
        <div style="font-size: 18px; color: #51A6FF;">系统服务监控</div>
        <el-table
          :data="dataList"
          ref="taskTable"
          stripe
          :header-row-style="{ background: '#D0EDF7', color: '#303331' }"
          style="margin-top: 20px;width: 100%;font-size: 14px;"
          size="mini"
          >
            <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
            <el-table-column prop="name" label="系统服务名称" align="center"></el-table-column>
            <el-table-column prop="edit" label="PID" align="center" ></el-table-column>
            <el-table-column prop="juese" label="描述" align="center" ></el-table-column>
            <el-table-column prop="type" label="状态" align="center" ></el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <pagination class="pagination" :page="page" @changePage="changePage"></pagination>
      </div>
      <div class="tab_right">
        <div style="font-size: 18px; color: #51A6FF;">数据库运行状态监控</div>
        <div class="tab_box">
          <el-table
            :data="list"
            ref="taskTable"
            stripe
            :header-row-style="{ background: '#D0EDF7', color: '#303331' }"
            style="width: 100%;font-size: 14px;"
            size="mini"
            >
              <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
              <el-table-column prop="name" label="表名" align="center"></el-table-column>
              <el-table-column prop="kykj" label="可用空间" align="center" ></el-table-column>
              <el-table-column prop="zkj" label="总空间" align="center" ></el-table-column>
          </el-table>
        </div>
        <div class="bot_yj">
          <div class="yj">最新预警</div>
          <div style="color: #909993">警告内容: <span style="color: #51A6FF; margin-left: 6px;">数据库连接失败</span></div>
          <div style="color: #909993">产生时间: <span style="color: #51A6FF; margin-left: 6px;">2020-10-22 12:12:35</span></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '../components/chart'
import pagination from '@/mixins/pagination'
export default {
  name: '',
  components: {
    Chart
  },
  mixins: [pagination],
  data () {
    return {
      cdHeight: 0,
      cdWidth: 0,
      list: [
        {
          name: '表名',
          kykj: '540',
          zkj: '560'
        },
        {
          name: '表名',
          kykj: '540',
          zkj: '560'
        },
        {
          name: '表名',
          kykj: '540',
          zkj: '560'
        },
        {
          name: '表名',
          kykj: '540',
          zkj: '560'
        },
        {
          name: '表名',
          kykj: '540',
          zkj: '560'
        }
      ],
      dataList: [
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        },
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        },
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        },
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        },
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        },
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        },
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        },
        {
          name: '系统服务名称',
          edit: '12546',
          juese: '系统服务描述',
          type: '运行中'
        }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
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
      this.$refs.chart1.drawLine()
      this.$refs.chart.dsSohwLine()
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.content_box {
  width: 100%;
  height: 100%;
  background-color: #E1E1E1;
  .top_box {
    display: flex;
    height: 300px;
    width: 100%;
    background-color: #fff;
    .left_box {
      border-right: 1px solid #909993;
      width: 420px;
      height: 100%;
      .chart1 {
        width: 420px;
        height: 100%;
      }
    }
    .right_box {
      width: calc(100% - 420px);
      height: 100%;
      .bot_meange {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bot_box {
    margin-top: 20px;
    width: 100%;
    height: calc(100% - 320px);
    display: flex;
    justify-content: space-between;
    .tab_left {
      width: 1070px;
      height: 100%;
       padding: 10px;
      background-color: #fff;
    }
    .tab_right {
      width: calc(100% - 1100px);
      padding: 10px;
      height: 100%;
      background-color: #fff;
      .tab_box {
        margin-top: 20px;
        width: 100%;
        height: 218px;
      }
      .bot_yj {
        position: relative;
        width: 100%;
        padding: 10px;
        height: calc(100% - 260px);
        margin-top: 20px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid rgba(223, 223, 223, 100);
        border-radius: 6px;
        .yj {
          position: absolute;
          top: -10px;
          left: 10px;
        }
      }
    }
  }
}
</style>
