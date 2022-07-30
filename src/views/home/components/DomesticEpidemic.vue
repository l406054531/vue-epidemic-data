<template>
  <div class="DomesticEpidemic">
    <dv-border-box-12>
      <div class="title">国内疫情</div>
      <div class="card">
        <div class="card-item"
             v-for="(item,index) in data"
             :key="index">
          <div class="card-item--title">
            {{item.title}}
          </div>
          <div class="card-item--value"
               :style="{color:item.color}">
            <count-to class="count"
                      :startVal='startVal'
                      :endVal='item.value'
                      :duration='duration'></count-to>
          </div>
          <div class="card-item--yesterday"
               v-if="item.fromYesterday">
            较昨日+<span :style="{color:item.color}">
              <count-to class="count"
                        :startVal='startVal'
                        :endVal='item.fromYesterday.value'
                        :duration='duration'></count-to>
            </span>
          </div>
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
    epidemicData: Object
  },
  data () {
    return {
      data: [
        {
          title: '新增确诊',
          prop: 'confirmedRelative',
          value: 0,
          color: '#ff6a57'
        },
        {
          title: '新增本土',
          prop: 'unOverseasInputNewAdd',
          value: 0,
          color: '#ff6a57'
        },
        {
          title: '新增境外',
          prop: 'overseasInputRelative',
          value: 0,
          color: '#476da0'
        },
        {
          title: '新增无症状',
          prop: 'asymptomaticRelative',
          value: 0,
          color: '#e86d48'
        },
        {
          title: '现有确诊',
          prop: 'curConfirm',
          value: 0,
          color: '#ff6a57'
        },
        {
          title: '现有本土',
          prop: 'curLocalConfirm',
          value: 0,
          color: '#ff6a57'
        },
        {
          title: '现有境外',
          prop: 'curOverseasInput',
          value: 0,
          color: '#476da0'
        },
        {
          title: '现有无症状',
          prop: 'asymptomatic',
          value: 0,
          color: '#e86d48'
        },
        {
          title: '累计确诊',
          prop: 'confirmed',
          value: 0,
          color: '#e83132',
          fromYesterday: {
            prop: 'confirmedRelative',
            value: 0,
          }
        },
        {
          title: '累计境外',
          prop: 'overseasInput',
          value: 0,
          color: '#476da0',
          fromYesterday: {
            prop: 'overseasInputRelative',
            value: 0,
          }
        },
        {
          title: '累计治愈',
          prop: 'cured',
          value: 0,
          color: '#10aeb5',
          fromYesterday: {
            prop: 'curedRelative',
            value: 0,
          }

        },
        {
          title: '累计死亡',
          prop: 'died',
          value: 0,
          color: 'rgb(175,177,180)',
          fromYesterday: {
            prop: 'diedRelative',
            value: 0,
          }

        },
      ],
      duration: 3000,
      startVal: 0
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    getData () {
      this.data.forEach(item => {
        item.value = Number(this.epidemicData[item.prop])
        if (item.fromYesterday) {
          item.fromYesterday.value = Number(this.epidemicData[item.fromYesterday.prop])
        }
      })

    }
  }


}
</script>
<style lang='scss' scoped>
.DomesticEpidemic {
  top: 100px;
  left: 10px;
  @include position-absolute;
  .title {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 17px;
  }
  .card {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 90px);
    text-align: center;
    padding: 50px 0 30px 0;
    .card-item {
      height: 100%;
      display: flex;
      flex-direction: column;
      &--title {
      }
      &--value {
        font-weight: bold;
        padding: 5px 0;
      }
      &--yesterday {
        font-size: 12px;
      }
    }
  }
}
</style>