<template>
  <div>
    <div v-if="showId == 1" ref="myChart" id="myChart" :style="{width: width + 'px', height: height + 'px'}"></div>
    <div v-if="showId == 2" ref="sdChart" id="sdChart" :style="{width: width + 'px', height: height + 'px'}"></div>
  </div>
</template>

<script>
import resize from '@/utils/resize.js'
import echarts from 'echarts'
export default {
  mixins: [resize],
  name: '',
  data () {
    return {
      // fileList: this.priceData || {}
    }
  },
  computed: {},
  props: {
    showId: {
      type: Number
    },
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 500
    },
    dataList: {
      type: Object
    }
  },
  watch: {},
  mounted () {
  },
  methods: {
    drawLine () {
      const that = this
      const myChart = that.$echarts.init(that.$refs.myChart)
      const stionObj = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} '
        },
        title: {
          text: '1024G', // 具体数量
          left: 'center',
          top: '50%',
          textStyle: {
            color: '#2285E4',
            fontSize: 14,
            align: 'center'
          }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: '内存', // 标题
            textAlign: 'center',
            fill: '#333',
            fontSize: 14,
            fontWeight: 700
          }
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: ['管理员', '普通用户']
        // },
        color: ['#3AFF59', '#3AA5FF'],
        series: [
          {
            name: '内存',
            radius: ['60%', '75%'],
            avoidLabelOverlap: false,
            type: 'pie',
            center: ['50%', '50%'],
            data: [
              { value: 524, name: '剩余内存' },
              { value: 500, name: '占用内存' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: '#606662'
                }
              }
            }
          }
        ]
      }
      myChart.setOption(stionObj)
    },
    dsSohwLine () {
      const that = this
      var date = [2020.01, 2020.02, 2020.03, 2020.04, 2020.05, 2020.06, 2020.07, 2020.08, 2020.09, 2020.10, 2020.11, 2020.12, 2020.01, 2020.02, 2020.03, 2020.04, 2020.05, 2020.06, 2020.07, 2020.08, 2020.09, 2020.10, 2020.11, 2020.12]
      var data2 = [54, 23, 83, 48, 31, 15, 26, 42, 23, 13, 45, 32, 15, 68, 52, 23, 18, 48, 31, 15, 8, 52, 12, 13, 48, 32, 16, 48]
      const stChart = that.$echarts.init(that.$refs.sdChart)
      const stionObj = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        grid: {
          top: '40px',
          left: '50px',
          right: '50px',
          bottom: '0px',
          backgroundColor: '#fff',
          width: 'auto', // 图例宽度
          height: '78%' // 图例高度
        },
        color: ['#F55078 ', '#65BFFF'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          name: '内存使用率 (%)',
          type: 'value'
        },
        series: [
          {
            name: '内存占用',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgba(101,191,255, 0.3)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(101,191,255, 0.4)'
                },
                {
                  offset: 0.36,
                  color: 'rgba(101,191,255, 0.4)'
                }
              ])
            },
            data: data2
          }
        ]
      }
      stChart.setOption(stionObj)
    }
  },
  created () {

  }
}
</script>

<style scoped>
</style>
