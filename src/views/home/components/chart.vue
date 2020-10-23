<template>
  <div>
    <div v-if="showId == 1" ref="myChart" id="myChart" :style="{width: width + 'px', height: height + 'px'}"></div>
    <div v-if="showId == 3" ref="smChart" id="smChart" :style="{width: width + 'px', height: height + 'px'}"></div>
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
    setTimeout(() => {
      // this.drawLine()
      // this.dsSohwLine()
    }, 500)
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
          text: '45人', // 具体数量
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
            text: '用户', // 标题
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
            name: '访问来源',
            radius: ['60%', '75%'],
            avoidLabelOverlap: false,
            type: 'pie',
            center: ['50%', '50%'],
            data: [
              { value: 10, name: '管理员' },
              { value: 35, name: '普通用户' }
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
    smawLine () {
      const that = this
      const smChart = that.$echarts.init(that.$refs.smChart)
      const stionObj = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} '
        },
        title: {
          text: 1024, // 具体数量
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
            text: '数据下载量', // 标题
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
            name: '访问来源',
            radius: ['60%', '75%'],
            avoidLabelOverlap: false,
            type: 'pie',
            center: ['50%', '50%'],
            data: [
              { value: 524, name: '管理员' },
              { value: 500, name: '普通用户' }
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
      smChart.setOption(stionObj)
    },
    dsSohwLine () {
      const that = this
      var date = [2020.01, 2020.02, 2020.03, 2020.04, 2020.05, 2020.06, 2020.07, 2020.08, 2020.09, 2020.10, 2020.11, 2020.12, 2020.01, 2020.02, 2020.03, 2020.04, 2020.05, 2020.06, 2020.07, 2020.08, 2020.09, 2020.10, 2020.11, 2020.12]
      var data = [520, 23, 231, 548, 231, 546, 864, 520, 23, 231, 548, 231, 546, 864, 520, 23, 231, 548, 231, 546, 864, 520, 23, 231, 548, 231, 546, 864]
      var data2 = [542, 123, 183, 458, 312, 156, 648, 542, 123, 183, 458, 312, 156, 648, 542, 123, 183, 458, 312, 156, 648, 542, 123, 183, 458, 312, 156, 648]
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
        legend: {
          data: ['下载数据', '上传数据'],
          right: 10
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          name: '数量 (个)',
          type: 'value'
        },
        series: [
          {
            name: '下载数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgba(245,80,120, 0.3)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(245,80,120, 0.4)'
                },
                {
                  offset: 0.36,
                  color: 'rgba(245,80,120, 0.4)'
                }
              ])
            },
            data: data
          },
          {
            name: '上传数据',
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
