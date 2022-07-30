<template>
  <div id="allmap"
       style="height:100vh"></div>
</template>

<script>
import { loadBaiduMapScript } from '@/utils/map.js'
let echarts = require('echarts/lib/echarts')
require("echarts/extension/bmap/bmap");
export default {
  data () {
    return {
      mapExamples: {//地图实例配置
        zoomLevel: 6,//缩放等级
        longitude: 108.327649,// 中心点经度
        latitude: 32.824988, // 中心点纬度
        openPositioning: false,//是否开启定位
      },
      options: {
        bmap: {
          center: [108.332455, 32.910728],
          zoom: 6,//百度地图缩放等级
          roam: true,
        },
        series: [

        ],
      },
      myChart: null,// echarts 实例
    };
  },

  mounted () {
    this.initMapByEcharts()
  },
  methods: {
    /**
     * @description 初始化echarts、地图
     */
    async initMapByEcharts () {
      const BMap = window.BMap
      let chartDom = document.getElementById('allmap');
      let myChart = echarts.init(chartDom);
      this.myChart = myChart
      myChart.setOption(
        this.options
      );
      const map = myChart.getModel().getComponent('bmap').getBMap(); //获取地图实例
      map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      map.setMapStyleV2({ styleId: "87329fbddf446fb069a56d009f579151" });
      this.$emit('loaded', { map, myChart });
    },
    /**
     * @author lx
     * @dateTime 2021-8-9
     * @remark 获取定位
     */
    getGeolocation (BMap, map) {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
        }
        else {
          alert('未授权!');
        }
      });
    }
  }
}

</script>
<style lang='scss' scoped>
::v-deep {
  .ec-extension-bmap {
    // width: 99% !important;
    // height: 720px !important;
  }
}
</style>