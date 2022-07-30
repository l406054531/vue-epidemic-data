<template>
  <div class="MidHighRisk">
    <dv-border-box-12>
      <div class="flex">
        <div class="high">
          <p>高风险</p>
          <p class="total">
            <count-to class="count"
                      :startVal='startVal'
                      :endVal='total.highRiskTotal'
                      :duration='duration'></count-to>
          </p>
        </div>
        <div class="mid">
          <p>中风险</p>
          <p class="total">
            <count-to class="count"
                      :startVal='startVal'
                      :endVal='total.midRiskTotal'
                      :duration='duration'></count-to>
          </p>
        </div>
      </div>
    </dv-border-box-12>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  props: {
    total: {
      type: Object,
      default: () => {
        return {
          highRiskTotal: 0,
          midRiskTotal: 0
        }
      }
    }
  },
  data () {
    return {
      duration: 3000,
      startVal: 0
    }
  },

  mounted () {
    console.log(this.total);
  },

  methods: {}


}
</script>
<style lang='scss' scoped>
.MidHighRisk {
  width: 200px;
  height: 70px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -100px;
  background-color: $bg;

  .flex {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .high {
      color: rgb(255, 0, 0);
    }
    .mid {
      color: rgb(255, 106, 87);
    }
    .total {
      font-weight: bold;
    }
  }
}
</style>