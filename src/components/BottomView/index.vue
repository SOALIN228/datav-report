/**
* User: soalin
* Date: 2020/9/29
* Time: 07:13
* Desc:
*/
<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">93,634</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">198,634</div>
                <v-chart :options="searchNumberOption"/>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column label="排名" prop="rank"/>
                <el-table-column label="关键词" prop="keyword"/>
                <el-table-column label="总搜索量" prop="count"/>
                <el-table-column label="搜索用户数" prop="users"/>
                <el-table-column label="搜索占比" prop="range"/>
              </el-table>
              <el-pagination
                  :page-size="pageSize"
                  :total="total"
                  @current-change="onPageChange"
                  background
                  layout="prev, pager, next"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group size="small" v-model="radioSelect">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOptions"/>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      searchUserOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          show: false
        },
        tooltip: {},
        series: [{
          type: 'line',
          data: [100, 160, 170],
          areaStyle: {
            color: 'rgba(95,187,255,.5)'
          },
          lineStyle: {
            color: 'rgb(95,187,255)'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }],
        grid: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      },
      searchNumberOption: {},
      tableData: [{
        id: 1,
        rank: 1,
        keyword: '北京',
        count: 100,
        users: 90,
        range: '90%'
      }],
      total: 0,
      pageSize: 4,
      radioSelect: '品类',
      categoryOptions: {}
    }
  },
  mounted () {
    this.renderPieChart()
  },
  methods: {
    onPageChange (page) {
      console.log(page)
    },
    renderPieChart () {
      const mockData = [{
        legendname: '1',
        value: 30,
        percent: '30.00',
        name: 'x'
      }, {
        legendname: '2',
        value: 30,
        percent: '30.00',
        name: 'y'
      }, {
        legendname: '3',
        value: 40,
        percent: '40.00',
        name: 'z'
      }]
      this.categoryOptions = {
        title: [{
          text: '品类分布',
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        }, {
          text: '累计订单量',
          subtext: '100',
          x: '34.5%',
          y: '42.5%',
          textStyle: {
            fontSize: 14,
            color: '#999'
          },
          subtextStyle: {
            fontSize: 28,
            color: '#333'
          },
          textAlign: 'center'
        }],
        series: [{
          name: '品类分布',
          type: 'pie',
          data: mockData,
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter: function (params) {
                return params.data.legendname
              }
            }
          },
          center: ['35%', '50%'],
          radius: ['45%', '60%'],
          labelLine: {
            normal: {
              length: 5,
              length2: 3,
              smooth: true
            }
          },
          clockwise: false,
          itemStyle: {
            borderWidth: 4,
            borderColor: '#fff'
          }
        }],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const str = params.seriesName + '<br />' +
                params.marker + params.data.legendname + '<br />' +
                '数量：' + params.data.value + '<br />' +
                '占比：' + params.data.percent + '%'
            return str
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;

  .view {
    flex: 1;
    box-sizing: border-box;
    width: 50%;

    &:first-child {
      padding: 0 10px 0 0;
    }

    &:last-child {
      padding: 0 0 0 10px;
    }

    .title-wrapper {
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 60px;
      padding: 0 0 0 20px;
      border-bottom: 1px solid #eee;

      .radio-wrapper {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }

    .chart-wrapper {
      display: flex;
      flex-direction: column;
      height: 452px;

      .chart-inner {
        display: flex;
        margin-top: 20px;
        padding: 0 10px;

        .chart {
          flex: 1;
          padding: 0 10px;

          .chart-title {
            font-size: 14px;
            color: #999;
          }

          .chart-data {
            font-size: 22px;
            font-weight: 500;
            letter-spacing: 2px;
            color: #333;
          }

          .echarts {
            height: 50px;
          }
        }
      }

      .table-wrapper {
        flex: 1;
        margin-top: 20px;
        padding: 0 20px 20px;

        .el-pagination {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
