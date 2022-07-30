<template>
  <div class="Controller">
    <dv-border-box-12>
      <el-radio-group v-model="radio"
                      size="mini"
                      type="vertical"
                      @change="handleChange">
        <template v-for="(item,index) in list">
          <el-radio :label="item.value"
                    :key="index">
            {{item.label}}
          </el-radio>
        </template>
      </el-radio-group>
    </dv-border-box-12>

  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: 0,
      list: [
        {
          key: 'noView',
          label: '不显示',
          value: 0
        },
        {
          key: 'domesticEpidemic',
          label: '国内疫情',
          value: 1
        },
        {
          key: 'domesticEpidemicSummary',
          label: '境外输入累计确诊省Top10',
          value: 2
        },
        {
          key: 'importedConfirmedProvinceTop10',
          label: '国内各地区疫情统计汇总',
          value: 3
        },
        {
          key: 'rightBottom',
          label: '疫情趋势图',
          value: 4
        },

      ]
    }
  },

  mounted () { },

  methods: {
    handleChange (value) {
      this.$emit('handleRadioChange', this.list[value])
    }
  }


}
</script>
<style lang='scss' scoped>
.Controller {
  position: absolute;
  bottom: 10px;
  right: 5px;
  z-index: 1;
  // width: 100px;
  .el-radio-group {
    padding: 10px;
  }
  ::v-deep {
    .el-radio {
      display: block;
      padding: 2px 0;
      margin-right: 0px;
    }

    .el-radio__label {
      color: #fff;
      font-size: 10px;
    }
    .is-checked {
      .el-radio__label {
        color: #409eff !important;
      }
    }
  }
}
</style>