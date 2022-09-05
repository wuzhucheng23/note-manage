<template>
  <div class="person-info" v-loading="loading">
    <div class="info-box">
      <div class="info-item"
           v-for="item in infoList"
           :key="item.title">
        <div class="title">{{ item.title }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
    <div class="canvas-box">
      <div class="title">阅读量趋势</div>
      <div class="canvas" ref="chartRef"></div>
    </div>
    <div class="bottom-box"></div>
  </div>
</template>

<script>
export default {
  name: "PersonInfo",
  data() {
    const options = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false
        },
        data: []
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '5%',
        bottom: '5%',
        containLabel: false
      },
      series: [
        {
          data: [],
          type: 'line',
          itemStyle: {
            color: '#339999'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(49, 142, 142, 0.1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(49, 142, 142, 1)' // 100% 处的颜色
              }],
            }
          }
        }
      ]
    }
    const infoList = [
      {
        title: '总阅读量',
        value: 0
      },
      {
        title: '总笔记数',
        value: 0
      },
      {
        title: '总类目数',
        value: 0
      },
    ]
    return {
      infoList,
      options,
      chart: {},
      loading: false
    }
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chartRef);
      this.chart.setOption(this.options);
    },
    async personInfo() {
      try {
        this.loading = true
        const params = {}
        const resp = await this.$api.server.personInfo(params);
        if (resp.code === 1) {
          const data = resp.data
          this.infoList[0].value = data.read_number
          this.infoList[1].value = data.notes_number
          this.infoList[2].value = data.category_number
          const options = {
            xAxis: {
              data: data.readList.map(item => item.time)
            },
            series: [
              {
                data: data.readList.map(item => item.read_volume)
              }
            ]
          }
          this.chart.setOption(options);
        } else {
          this.$message.error(resp.msg)
        }
      } catch (e) {
        this.$message.error('发生错误');
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.initChart()
  },
  created() {
    this.personInfo()
  }
};
</script>

<style scoped lang="scss">
.info-box {
  display: flex;
  justify-content: space-between;

  .info-item {
    width: calc((100% - 40px) / 3);
    text-align: center;
    line-height: 40px;
    margin-bottom: 40px;

    .title {
      background: #339999;
      color: #ffffff;
    }

    .value {
      font-size: 18px;
      border: 1px solid #eeeeee;
      border-top: unset;
    }
  }
}

.canvas-box {
  .title {
    line-height: 40px;
    padding-left: 20px;
    background: #339999;
    color: #ffffff;
  }

  .canvas {
    border: 1px solid #eee;
    border-top: unset;
    height: calc(100vh - 360px);
  }
}
</style>
