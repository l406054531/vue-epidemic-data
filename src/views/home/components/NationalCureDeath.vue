<template>
  <div class="NewLocalTrends">
    <v-chart :options="options" />
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
export default {
  components: {
    'v-chart': ECharts
  },
  props: {
    data: Object
  },
  mounted () { },
  computed: {
    options () {
      let xAxis = this.data.updateDate
      let list = this.data.list
      return {
        title: {
          text: '全国累计治愈/死亡趋势',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 15,
          },
          padding: 20,
        },
        legend: {
          top: 20,
          right: 0,
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: 60,
          right: 30,
          bottom: 35
        },
        xAxis: {
          type: 'category',
          data: xAxis,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#FFF",
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              show: false
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#FFF"
            },
          },
          nameTextStyle: {
            color: "#FFF"
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: '死亡',
            type: 'line',
            data: list[1].data,
            lineStyle: {
              width: 3,
              color: 'rgb(77,80,84)'
            },
            itemStyle: {
              color: 'rgb(77,80,84)'
            },
            smooth: true
          },
          {
            name: '治愈',
            type: 'line',
            data: list[0].data,
            lineStyle: {
              width: 3,
              color: 'rgb(16,174,181)'
            },
            itemStyle: {
              color: 'rgb(16,174,181)'
            },
            smooth: true
          }
        ]
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
.NewLocalTrends {
  width: 100%;
  height: 97%;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>