<template>

  <div class="RightBottom">
    <dv-border-box-12>
      <tabsBtn :btnData="btnData"
               @clickBtn="clickBtn"
               class="tabsBtn">
        <NewLocalTrends :data='data.newLocalTrendsData'
                        v-if="active===0" />
        <NewLocalTrends2 :data='data.newMonthLocalTrendsData'
                         v-if="active===1" />
        <NationalCureDeath :data='data.NationalCureDeathData'
                           v-if="active===2" />

      </tabsBtn>
    </dv-border-box-12>
  </div>

</template>

<script>
import tabsBtn from "@/components/tabs-btn"
export default {
  components: {
    tabsBtn,
    NewLocalTrends: () => import("./NewLocalTrends"),
    NewLocalTrends2: () => import("./NewLocalTrends"),
    NationalCureDeath: () => import("./NationalCureDeath"),
  },
  props: {
    data: Object
  },
  data () {
    return {
      btnData: [
        {
          value: 0,
          label: '日新增趋势'
        },
        {
          value: 1,
          label: '月新增趋势'
        },
        {
          value: 2,
          label: '全国累计治愈/死亡趋势'
        },
      ],
      active: 0
    }
  },

  mounted () { },

  methods: {
    clickBtn (data) {
      this.active = data.value
    }
  }


}
</script>
<style lang='scss' scoped>
.RightBottom {
  @include position-absolute;
  bottom: 10px;
  right: 10px;

  .tabsBtn {
    padding: 10px;
  }
}
</style>