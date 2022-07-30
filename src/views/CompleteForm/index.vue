<template>
  <div class="main"
       ref="main">
    <div>
      <div class="top">
        <div class="title">
          <el-button type="primary"
                     @click="$router.push('/')"
                     size='mini'
                     style="float:left;">返回</el-button>
          国内疫情
        </div>
      </div>
    </div>

    <el-table :data="tableData"
              ref="mytable"
              highlight-current-row
              :header-cell-style="headerStyle"
              height="90vh"
              style="width: 100%"
              :cell-style="{padding: '8px',background:'#003B51',color:'#fff'}">
      <template v-for="(item, index) in tableHeader">
        <el-table-column :label="item.label"
                         :width="item.columnWidth"
                         :key="index"
                         :prop="item.prop"
                         :min-width="item.width"
                         align='center'>
        </el-table-column>
      </template>
    </el-table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableHeader: [
        {
          prop: 'area',
          label: '城市'
        },
        {
          prop: 'confirmed',
          label: '累积确诊'
        },
        {
          prop: 'curConfirm',
          label: '现有确诊'
        },
        {
          prop: 'confirmedRelative',
          label: '新增确诊(本土+境外)'
        },
        {
          prop: 'nativeRelative',
          label: '新增本土'
        },
        {
          prop: 'overseasInputRelative',
          label: '新增境外'
        },
        {
          prop: 'asymptomaticRelative',
          label: '新增无症状'
        },
        {
          prop: 'crued',
          label: '累积治愈'
        },
        {
          prop: 'died',
          label: '累积死亡'
        },
        {
          prop: 'riskAreas',
          label: '风险地区'
        }
      ],
    }
  },
  computed: {
    tableData () {
      let data = JSON.parse(sessionStorage.getItem('scroll-data'))
      data.forEach(item => {
        item.riskAreas = item.dangerousAreas.subList.length
      })
      return data
    }
  },
  methods: {
    headerStyle () {
      return "background:#21456b;color:#fff"
    }
  }
}
</script>
<style lang="scss"  scoped>
::v-deep {
  ::-webkit-scrollbar {
    width: 0px;
  }
}
.main {
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
  position: relative;
  padding: 20px;
  color: #fff;
  background: rgb(9, 18, 32);
  .top {
    .title {
      width: 100%;
      font-size: 20px;
      text-align: center;
      letter-spacing: 5px;
      height: 30px;
      line-height: 30px;
    }
  }
}
::v-deep {
  .el-table td,
  .el-table th.is-leaf {
    border: 0;
    // border-color: rgb(89, 153, 226);
  }
  .el-table::before {
    height: 0px;
  }
}
</style>