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
      let series = this.data.series
      // console.log(series);
      return {
        title: {
          text: '新增趋势',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 15,
          },
          padding: 20,
        },
        legend: {
          top: 20,
          right:0,
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: 50,
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
        series
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