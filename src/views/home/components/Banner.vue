<template>
  <div class="banner">
    <dv-decoration-10 class="left" />
    <div class="center">
      <dv-decoration-8 class="center-1"
                       :color="['#568aea', '#000000']" />
      <div class="center-2">
        <span class="title-text">疫情数据可视化平台</span>
        <span class="title-time">数据更新至:{{dateTime}}</span>
        <dv-decoration-6 class="title-bottom"
                         :reverse="true"
                         :color="['#50e3c2', '#67a1e5']" />
      </div>
      <dv-decoration-8 class="center-1"
                       :reverse="true"
                       :color="['#568aea', '#000000']" />
    </div>
    <dv-decoration-10 class="right" />
  </div>
</template>

<script>

export default {
  name: 'Banner',
  data () {
    return {
      updateTime: ''
    }
  },
  props: {
    dateTime: String
  },
  watch: {
    dateTime: {
      handler (val) {
        this.updateTime = val
      },
      deep: true
    }
  },

};
</script>

<style lang="scss" scoped>
.banner {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  // @include flex-justify-center;
  display: flex;
  justify-content: center;
  .left {
    width: 28%;
  }

  .center {
    width: 44%;
    // @include flex-justify-center;
    display: flex;
    justify-content: center;
    &-1 {
      flex: 1;
      margin-top: 24px;
    }

    &-2 {
      width: 500px;
      text-align: center;
      position: relative;
      .title-text {
        width: 100%;
        font-size: 28px;
        color: #d3d6dd;
        position: absolute;
        // bottom: 0px;
        left: 50%;
        transform: translate(-50%);
      }
      .title-time {
        width: 100%;
        font-size: 15px;
        color: #d3d6dd;
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translate(-50%);
      }
      .title-bottom {
        width: 80%;
        height: 10px;
        margin: 0 auto;
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translate(-50%);
        overflow: hidden;
      }
    }
  }

  .right {
    width: 28%;
    transform: rotateY(180deg);
  }
}
</style>
