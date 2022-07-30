<template>
  <div class="ImportedConfirmedProvince">
    <dv-border-box-12>
      <v-chart :options="options" />
    </dv-border-box-12>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
export default {
  components: {
    'v-chart': ECharts
  },
  props: {
    data: Array
  },
  data () {

    return {
      title: '境外输入累计确诊省Top10',
    }
  },
  computed: {
    options () {
      const y = this.data.map(item => item.name)
      const data = this.data.map(item => item.value)
      const myColor = ['#21BF57', '#56D0E3', '#1089E7', '#F8B448', '#F57474','#FFBBFF','#FF6347','#FFDEAD','#F0FFF0','#FFA500'];
      return {
        title: {
          text: '境外输入累计确诊省Top10',
          textStyle: {
            // color: '#4DCEF8',
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 15,
          },
          padding: 20,
        },
        grid: {
          left: '50',
          bottom: 13,
          top: 40

        },
        xAxis: {
          show: false,
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            color: '#fff',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: y
        },
        series: [{
          type: 'bar',
          // barGap: '-85%',
          // barWidth: '21%',
          itemStyle: {
            normal: {
              barBorderRadius: 16,
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num]
              },
            }
          },
          label: {
            normal: {
              show: true,
            }
          },
          labelLine: {
            show: true,
          },
          data: data,
        }]
      }
    }
  },
  mounted () { },

  methods: {}


}
</script>
<style lang='scss' scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.ImportedConfirmedProvince {
  top: 100px;
  right: 10px;
  @include position-absolute;
}
</style>