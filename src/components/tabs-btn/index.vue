<template>
  <div class="btn-main"
       ref="main">
    <el-button v-for="item in btnData"
               :key="item.value"
               :class="btnActive === item.value?'btn-active':''"
               @click="clickBtn(item)">{{item.label}}</el-button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    btnData: {
      type: Array,
      default: {
        return: {
          label: "",
          value: 0,
          data: [],
        }
      }
    },
  },
  data () {
    return {
      btnActive: 0,
      interval: null,
      intervalTime: 1000 * 5,
      autoChange: true,
    };
  },
  mounted () {
    if (this.autoChange) {
      this.setInterval()
      this.pauseTabChange()
    }
  },
  methods: {
    clickBtn (item) {
      this.btnActive = item.value
      this.$emit('clickBtn', item)
    },
    setInterval () {
      this.interval = setInterval(() => {
        this.btnActive++
        if (this.btnActive >= this.btnData.length) {
          this.btnActive = 0
        }
        this.$emit('clickBtn', this.btnData[this.btnActive])
      }, this.intervalTime)
    },
    pauseTabChange () {
      let self = this;
      // 监听鼠标滑过
      this.$refs.main.addEventListener("mouseover", function () {
        // 停止自动切换
        clearInterval(self.interval)
        self.interval = null
      });
      // 监听鼠标离开
      this.$refs.main.addEventListener("mouseleave", function () {
        self.setInterval()
      });
    },
  }
};
</script>
<style lang='scss' scoped>
.btn-main {

  width: 100%;
  height: 100%;
  .el-button {
    //   width: 20px;
    margin-left: 5px;
    background: none;
    border: 1px solid $color;
    //   border-radius: 20px;
    padding: 5px;
    margin-top: 2px;
    font-size: 10px;
    color: #fff;
    &:hover {
      background-color: $color;
      color: #fff;
      span {
        color: white !important;
      }
    }
  }
  .btn-active {
    background-color: $color;
    span {
      color: #fff !important;
    }
  }
}
</style>