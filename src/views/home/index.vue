<template>
  <div class="main"
       v-loading='loading'
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <!-- 地图 -->
    <baiduMpa @loaded="loaded"></baiduMpa>

    <template v-if="!loading">
      <Banner :dateTime='epidemicData.foreignLastUpdatedTime' />
      <!-- 国内疫情 -->
      <DomesticEpidemic :epidemicData='epidemicData.summaryDataIn'
                        v-if="showView.domesticEpidemic" />
      <!-- 国内各地区疫情统计汇总 -->
      <DomesticEpidemicSummary :config='domesticEpidemicSummaryData'
                               v-if="showView.domesticEpidemicSummary" />
      <!-- 境外输入累计确诊省Top10 -->
      <ImportedConfirmedProvinceTop10 :data="importedConfirmedProvinceTopData"
                                      v-if="showView.importedConfirmedProvinceTop10" />
      <!-- 右下折线图数据 -->
      <RightBottom :data='rightBottomData'
                   v-if="showView.rightBottom" />
      <!-- <MidHighRisk :total="{highRiskTotal,midRiskTotal}" /> -->
      <Controller v-if="isController"
                  @handleRadioChange="handleRadioChange" />
    </template>
  </div>
</template>
<script>
import { options, getEffectScatter } from './options';
import { getAllData } from '@/api/data'
import { geoJson } from "@/assets/json/geoJson"
export default {
  components: {
    baiduMpa: () => import("@/components/baiduMap"),
    Banner: () => import("./components/Banner"),
    DomesticEpidemic: () => import("./components/DomesticEpidemic"),
    DomesticEpidemicSummary: () => import("./components/DomesticEpidemicSummary"),
    RightBottom: () => import("./components/RightBottom"),
    ImportedConfirmedProvinceTop10: () => import("./components/ImportedConfirmedProvinceTop10"),
    Controller: () => import("./components/Controller"),
    // MidHighRisk: () => import("./components/MidHighRisk"),
  },
  data () {
    return {
      myChart: null,// echarts实例
      map: null,// 地图实例
      epidemicData: {},
      loading: true,
      domesticEpidemicSummaryData: {},
      rightBottomData: {},
      importedConfirmedProvinceTopData: [],
      screenWidth: 0,
      isController: false,
      showView: {
        domesticEpidemic: true,
        domesticEpidemicSummary: true,
        importedConfirmedProvinceTop10: true,
        rightBottom: true,
      },
      highRiskTotal: 0,
      midRiskTotal: 0
    };
  },
  watch: {
    screenWidth: {
      handler (val) {
        if (val <= 768) {
          this.isController = true
          Object.keys(this.showView).forEach(key => {
            this.showView[key] = false
          })
        } else {
          this.isController = false
          Object.keys(this.showView).forEach(key => {
            this.showView[key] = true
          })
        }
      },
      deep: true
    }
  },
  mounted () {
    this.screenWidth = document.body.clientWidth;
    this.$nextTick(() => {
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
        })();
      };
    })
  },
  computed: {
    options () {
      return options
    },
  },
  methods: {
    /**
     * @description 获取实例
     */
    loaded ({ map, myChart }) {
      this.$message({
        message: '数据均来源于百度疫情,网站内容仅供学习参考',
        type: 'warning',
        duration: 5000
      });
      this.myChart = myChart
      this.map = map
      this.getData()

    },
    /**
     * @description 获取数据 
     */
    getData () {
      getAllData('/epidemic-data').then((response) => {
        this.epidemicData = response
        this.importedConfirmedProvinceTopData = response.topOverseasInput.sort((a, b) => a.value - b.value)
        this.getScrollTableData(response.caseList)
        this.getLineData(response.trend, response.trendMonth)
        // this.getMidHighRiskAreaLocation(response.locations)
        this.getCurrentNewCase(response.caseList)
        this.loading = false
        this.myChart.setOption(this.options)
      })
    },
    /**
     * @description 获取现有/新增病例
     */
    getCurrentNewCase (data) {
      let effectScatterData = []
      for (let province of geoJson) {
        for (let item of data) {
          if (province.name == item.area) {
            effectScatterData.push({
              name: item.area,
              confirmed: Number(item.confirmed),
              curConfirm: Number(item.curConfirm),
              nativeRelative: Number(item.nativeRelative),
              confirmedRelative: Number(item.confirmedRelative),
              asymptomaticRelative: Number(item.asymptomaticRelative),
              value: [...province.location, Number(item.curConfirm)]
            })
          }
        }
      }
      this.options.series[2]=getEffectScatter('现有/新增确诊', 15, 'rgb(87, 85 ,227)', effectScatterData)


    },
    /**
     * @description 轮播表数据  国内各地区疫情统计汇总数据
     */
    getScrollTableData (data) {
      data = data.sort((a, b) => b.confirmedRelative - a.confirmedRelative)
      let allData = []
      const color = {
        oddRowBGC: 'rgba(17, 53, 73, 0.54)',
        evenRowBGC: 'rgba(10, 39, 50, 0.54)',
        headerBGC: 'rgba(0, 186, 255,.2)',
      }
      let todayNewData = data.map(item => {
        allData.push([item.area, item.confirmed, item.curConfirm, item.confirmedRelative, item.asymptomaticRelative, item.crued, item.died, item.dangerousAreas.subList.length])
        return [item.area, item.confirmedRelative, item.asymptomaticRelative == '' ? 0 : item.asymptomaticRelative]
      })
      const scrollData = {
        data: allData,
        rowNum: 20,
        header: ['城市', '累积确诊', '现有确诊', '新增确诊', '新增无症状', '累积治愈', '累积死亡', '风险地区'],
        ...color
      }
      sessionStorage.setItem('scroll-data', JSON.stringify(data))
      this.domesticEpidemicSummaryData = {
        header: ['城市', '新增确诊', '新增无症状'],
        rowNum: 7,
        data: todayNewData,
        allData: allData,
        ...color
      }
    },
    /**
     * @description 右下折线图数据
     */
    getLineData (dayData, monthData) {
      const newLocalTrendsData = {
        updateDate: dayData.updateDate,
        series: [
          {
            name: '新增境外输入',
            type: 'line',
            data: dayData.list.filter(item => item.name == '新增境外输入')[0].data,
            lineStyle: {
              normal: {
                width: 3,
              }
            },
            smooth: true
          },
          {
            name: '新增本土',
            type: 'line',
            data: dayData.list.filter(item => item.name == '新增本土')[0].data,
            lineStyle: {
              normal: {
                width: 3,
              }
            },
            smooth: true
          },
        ]
      }
      const NationalCureDeathData = {
        updateDate: dayData.updateDate,
        list: dayData.list.filter(item => {
          if (item.name == '治愈' || item.name == '死亡') {
            return item.data
          }
        }),
      }
      const newMonthLocalTrendsData = {
        updateDate: monthData.updateMonth,
        series: [
          {
            name: '新增本土',
            type: 'line',
            data: monthData.list.filter(item => item.name == '新增本土')[0].data,
            lineStyle: {
              normal: {
                width: 3,
              }
            },
            smooth: true
          },
        ]

      }
      this.rightBottomData = {
        newLocalTrendsData,
        NationalCureDeathData,
        newMonthLocalTrendsData
      }
    },
    /**
     * @description 获取中高风险地区的经纬度
     */
    getMidHighRiskAreaLocation (locations) {
      locations.forEach(item => {
        item.value = Object.values(item.location)
      })
      const highData = locations.filter(item => item.level == '高风险')
      const midData = locations.filter(item => item.level == '中风险')


      this.options.series[0]=getEffectScatter(`高风险地区(${highData.length})`, 8, 'red', highData)
      this.options.series[1]=getEffectScatter(`中风险地区(${midData.length})`, 8, '#ff6a57', midData)
      this.highRiskTotal = highData.length
      this.midRiskTotal = midData.length

    },
    handleRadioChange (data) {
      // if (val === 1) {
      //   this.showView.domesticEpidemic = true
      // }
      Object.keys(this.showView).forEach(key => {

        if (data.key == 'noView') {
          this.showView[key] = false
        } else {
          if (key == data.key) {
            this.showView[key] = true
          } else {
            this.showView[key] = false
          }
        }

      })
    }

  }
}

</script>
<style lang='scss' scoped>
.main {
  height: 100%;
  .radio {
    width: 120px;
    height: 80px;
    padding: 20px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    // background: #fff;
    .el-radio-group {
      .el-radio {
        padding: 3px 0;
        ::v-deep {
          .el-radio__label {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>