<template>
  <div class="domesticEpidemicSummaryData">
    <dv-border-box-12>
      <div class="title">
        <span>国内各地区疫情统计汇总</span>
        <el-button type="primary"
                   @click="handleClick">查看完整表单</el-button>
      </div>
      <dv-scroll-board :config="config"
                       class="table" />
    </dv-border-box-12>
  </div>
</template>

<script>
export default {
  props: {
    config: Object
  },
  data () {
    return {}
  },

  mounted () { },

  methods: {
    handleClick () {
      this.$router.push({
        path: '/complete-form'
      })
    }
  }


}
</script>
<style lang='scss' scoped>
.domesticEpidemicSummaryData {
  @include position-absolute;
  bottom: 10px;
  left: 10px;

  .title {
    height: 50px;
    color: #fff;
    font-size: 17px;
    padding: 10px 0 0 20px;
    .el-button {
      float: right;
      margin-right: 20px;
      padding: 6px;
      margin-top: 5px;
      font-size: 10px;
    }
  }
  .table {
    height: 280px;
    padding: 0 10px;
  }
}
</style>