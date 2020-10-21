<template>
  <div>
    <div v-if="showId == 1" ref="myChart" id="myChart" :style="{width: width + 'px', height: height + 'px'}"></div>
    <!-- <div v-if="showId == 2" ref="Nychart" id="severChart" :style="{width: width + 'px', height: height + 'px'}"></div> -->
    <div v-if="showId == 3" ref="Dychart" id="QxChart" :style="{width : width + 'px', height: height + 'px'}"></div>
    <div v-if="showId == 4" ref="Scchart" id="ScChart" :style="{width : width + 'px', height: height + 'px'}"></div>
  </div>
</template>

<script>
import resize from '@/utils/resize.js'
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
      this.drawLine()
    }, 500)
  },
  methods: {
    drawLine () {
      const that = this
      const myChart = that.$echarts.init(that.$refs.myChart)
      const stionObj = {
        title: {
          text: that.dataList.sum, // 具体数量
          left: 'center',
          top: '50%',
          textStyle: {
            color: '#2285E4',
            fontSize: 14,
            align: 'center'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: that.dataList.title, // 标题
            textAlign: 'center',
            fill: '#333',
            fontSize: 14,
            fontWeight: 700
          }
        },
        color: ['#74FF69', '#277194', '#FFF702', '#00FEAE'],
        series: [
          {
            name: that.dataList.title,
            type: 'pie',
            selectedOffset: 2,
            center: ['50%', '50%'],
            clockwise: true,
            // label: {
            //   fontSize: 14,
            //   color: '#5E5E5E'
            // },
            labelLine: {
              lineStyle: {
                color: '#5E5E5E'
              },
              normal: {
                length: 5
              }
            },
            label: {
              normal: {
                // formatter: ' {b}  \n  {c}', // 图形外文字上下显示
                borderWidth: 20,
                borderRadius: 4,
                padding: [0, -10], // 文字和图的边距
                rich: {
                  a: {
                    color: '#333',
                    fontSize: 14,
                    lineHeight: 20,
                    align: 'center'
                  },
                  b: { // name 文字样式
                    fontSize: 14,
                    lineHeight: 20,
                    align: 'center',
                    color: '#CDCDD0'
                  },
                  c: { // value 文字样式
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#63BF6A',
                    align: 'center'
                  }
                }
              }
            },
            radius: ['48%', '60%'],
            // label: {
            //   show: false,
            //   position: 'center'
            // },
            emphasis: {
              label: {
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            // labelLine: {
            //   show: false
            // },
            data: that.dataList.data
          }
        ]

      }
      myChart.setOption(stionObj)
    },
    // q曲线图
    qxChart (listTkey, listTval, listFval) {
      const that = this
      var queryD = that.$refs.Dychart
      if (queryD) {
        const QxChart = this.$echarts.init(queryD)
        QxChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['积雨', '积温']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: listTkey
            }
          ],
          yAxis: [
            {
              name: '（℃）',
              type: 'value',
              min: 0,
              max: 500,
              interval: 50
            },
            {
              min: 0,
              max: 500,
              interval: 50,
              name: '（mm）',
              type: 'value'
            }
          ],
          series: [
            {
              name: '积雨',
              type: 'line',
              smooth: true, // 曲线平滑
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'category',
                    // 渐变色实现
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1, // 变化度
                      // 三种由深及浅的颜色
                      [
                        {
                          offset: 0,
                          color: '#FDE3E0'
                        },
                        {
                          offset: 0.5,
                          color: '#FF7575'
                        },
                        {
                          offset: 0.7,
                          color: '#FBF9FA'
                        }
                      ]
                    )
                  },
                  lineStyle: {
                    // 线的颜色
                    color: '#E29195'
                  },
                  // 以及在折线图每个日期点顶端显示数字
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'white'
                    }
                  }
                }
              },
              areaStyle: {},
              data: listTval
            },
            {
              name: '积温',
              type: 'line',
              smooth: true, // 曲线平滑
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'category',
                    // 渐变色实现
                    color: new that.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1, // 变化度
                      // 三种由深及浅的颜色
                      [
                        {
                          offset: 0,
                          color: '#C8E5FF'
                        },
                        {
                          offset: 0.5,
                          color: '#DBEEFD'
                        },
                        {
                          offset: 1,
                          color: '#F8FCFF'
                        }
                      ]
                    )
                  },
                  lineStyle: {
                    // 线的颜色
                    color: '#59A0C0'
                  },
                  // 以及在折线图每个日期点顶端显示数字
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'white'
                    }
                  }
                }
              },
              areaStyle: {},
              data: listFval
            }
          ]
        })
      } else {
        console.log('chufa ')
      }
    },
    scChart (priceData) {
      console.log('0000', priceData)
      var queryD = this.$refs.Scchart
      if (queryD) {
        const ScChart = this.$echarts.init(queryD)
        ScChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {},
          //   },
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: priceData.Arr1
            }
          ],
          yAxis: [
            {
              name: '价格(元/斤)',
              type: 'value',
              max: 20
            }
          ],
          series: [
            {
              name: '单价',
              type: 'line',
              smooth: true, // 曲线平滑
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'category',
                    // 渐变色实现
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1, // 变化度
                      // 三种由深及浅的颜色
                      [
                        {
                          offset: 0,
                          color: '#C8E5FF'
                        },
                        {
                          offset: 0.5,
                          color: '#DBEEFD'
                        },
                        {
                          offset: 0.7,
                          color: '#F8FCFF'
                        }
                      ]
                    )
                  },
                  lineStyle: {
                    // 线的颜色
                    color: '#59A0C0'
                  },
                  // 以及在折线图每个日期点顶端显示数字
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'white'
                    }
                  }
                }
              },
              areaStyle: {},
              data: priceData.Arr2
            }
          ]
        })
      } else {
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
