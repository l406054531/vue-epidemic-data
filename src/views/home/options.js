export const getEffectScatter = (name, symbolSize, color, data) => {
  return {
    name,
    type: 'effectScatter',
    coordinateSystem: 'bmap',
    data,
    symbolSize,
    // encode: {
    //   value: 2
    // },
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    itemStyle: {
      color,
      shadowBlur: 2,
      shadowColor: color
    },

  }
}
export let options = { //echarts 配置
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      if (params.seriesName !== '现有/新增确诊') {
        return `${params.marker + params.data.area}<br/>${params.data.level}`
      } else {
        return `${params.marker + params.name}<br/>累计确诊：${params.data.confirmed}<br/>现有确诊：${params.data.curConfirm}<br/>新增确诊：${params.data.confirmedRelative}<br/>新增无症状：${params.data.asymptomaticRelative}`
      }

    }
  },
  legend: {
    top: '10%',
    textStyle: {
      color: '#fff'
    }
  },
  bmap: { //设置百度地图显示哪些东西
    center: [108.327649, 32.824988],
    zoom: 6,
    roam: true,
  },
  series: [

  ],
}

