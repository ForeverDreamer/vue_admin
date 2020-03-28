<template>
  <div>
    <!--统计数据概览-->
    <el-row :gutter="20">
      <el-col v-for="(item, index) in statOverview" :key="index" :xs="24" :sm="12" :md="6">
        <el-card shadow="hover">
          <div class="d-flex align-items-center">
            <i :class="[item.icon, item.color]" class="h4 text-white text-center card-icon_size mr-3 mb-0"></i>
            <div class="card-info__size">
              <h4 class="text-left mb-0">
                {{ item.count }}
              </h4>
              <h6 class="text-muted">
                {{ item.desc }}
              </h6>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--店铺订单提示-->
    <el-row :gutter="20" class="mt-3">
      <el-col :xs="24" :md="12" class="d-flex flex-column justify-content-between h-100">
        <el-card class="mb-3">
          <div slot="header" class="clearfix">
            <span>{{ statDatail.shop.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{ statDatail.shop.desc }}</el-button>
          </div>
          <el-row type="flex" align="middle">
            <el-col v-for="(item, index) in statDatail.shop.items" :key="index">
              <b-button variant="light">
                <h4 class="mb-1">{{ item.value }}</h4>
                <h6 class="text-muted mb-0">{{ item.type }}</h6>
              </b-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{ statDatail.shop.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{ statDatail.shop.desc }}</el-button>
          </div>
          <el-row type="flex" align="middle">
            <el-col v-for="(item, index) in statDatail.shop.items" :key="index">
              <b-button variant="light">
                <h4 class="mb-1">{{ item.value }}</h4>
                <h6 class="text-muted mb-0">{{ item.type }}</h6>
              </b-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!--统计图-->
      <el-col :xs="24" :md="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div ref="statChart" class="chart__size">
            统计图
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      statOverview: [
        { icon: 'el-icon-user-solid', color: 'bg-primary', count: 30, desc: '关注人数(个)' },
        { icon: 'el-icon-s-finance', color: 'bg-success', count: 120, desc: '订单总数(笔)' },
        { icon: 'el-icon-s-order', color: 'bg-danger', count: 4183.80, desc: '今日订单总金额(元)' },
        { icon: 'el-icon-s-data', color: 'bg-warning', count: 100, desc: '本月销量(笔)' }
      ],
      statDatail: {
        shop: {
          title: '店铺及商品提示',
          desc: '需要关注的店铺信息及待处理事项',
          items: [
            { type: '出售中', value: 64 },
            { type: '出售中', value: 64 },
            { type: '出售中', value: 64 },
            { type: '出售中', value: 64 },
            { type: '出售中', value: 64 },
            { type: '出售中', value: 64 }
          ]
        },
        transaction: {},
        order: {}
      }
    }
  },
  computed: {
    colSpan () {
      // return `col-${24 / statDatail.shop.items.length}`
      return 24 / this.statDatail.shop.items.length
    }
  },
  methods: {
    echartsInit () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.statChart)

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  mounted () {
    this.echartsInit()
  }
}
</script>

<style scoped>
  .chart__size {
    width: 100%;
    height: 253px;
  }

  .card-icon_size {
    width: 18.68%;
    line-height: 2;
    /*设置比例设备换个设备样式就乱了，当前直接设置px是比较好的方案*/
    /*width: 48px;*/
    /*line-height: 48px;*/
  }
  .card-info__size {
    line-height: 2;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
