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
                <div class="chart-data">{{ userCount | format }}</div>
                <v-chart :options="searchUserOption"/>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{ searchCount | format }}</div>
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
              <el-radio-group @change="onCategoryChange" size="small" v-model="radioSelect">
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
import commonDataMixin from '@/mixins/commonDataMixin'

const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']

export default {
  name: 'BottomView',
  mixins: [commonDataMixin],
  data () {
    return {
      searchUserOption: {},
      searchNumberOption: {},
      tableData: [],
      totalData: [],
      total: 0,
      pageSize: 4,
      userCount: 0,
      searchCount: 0,
      radioSelect: '品类',
      categoryOptions: {}
    }
  },
  watch: {
    wordCloud () {
      const totalData = []
      this.wordCloud.forEach((item, index) => {
        totalData.push({
          id: index + 1,
          rank: index + 1,
          keyword: item.word,
          count: item.count,
          users: item.user,
          range: `${((item.user / item.count) * 100).toFixed(2)}%`
        })
      })
      this.totalData = totalData
      this.total = this.totalData.length
      this.renderTable(1)
      this.userCount = totalData.reduce((s, i) => i.users + s, 0)
      this.searchCount = totalData.reduce((s, i) => i.count + s, 0)
      this.renderLineChart()
    },
    category1 () {
      this.renderPieChart()
    }
  },
  methods: {
    onCategoryChange (type) {
      this.radioSelect = type
      this.renderPieChart()
    },
    onPageChange (page) {
      this.renderTable(page)
    },
    renderTable (page) {
      this.tableData = this.totalData.slice(
        (page - 1) * this.pageSize,
        (page - 1) * this.pageSize + this.pageSize
      )
    },
    renderLineChart () {
      const createOption = (key) => {
        const data = []
        const axis = []
        this.wordCloud.forEach(item => data.push(item[key]))
        this.wordCloud.forEach(item => axis.push(item.word))
        return {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: axis
          },
          yAxis: {
            show: false
          },
          tooltip: {},
          series: [{
            type: 'line',
            data,
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
        }
      }
      this.searchUserOption = createOption('user')
      this.searchNumberOption = createOption('count')
    },
    renderPieChart () {
      if (!this.category1.data1 || !this.category2.data1) {
        return
      }
      let data
      let axis
      let total = 0
      if (this.radioSelect === '品类') {
        data = this.category1.data1.slice(0, 6)
        axis = this.category1.axisX.slice(0, 6)
        total = data.reduce((s, i) => s + i, 0)
      } else {
        data = this.category2.data1.slice(0, 6)
        axis = this.category2.axisX.slice(0, 6)
        total = data.reduce((s, i) => s + i, 0)
      }
      const chartData = []
      data.forEach((item, index) => {
        const percent = `${(item / total * 100).toFixed(2)}%`
        chartData.push({
          legendname: axis[index],
          value: item,
          percent,
          itemStyle: {
            color: colors[index]
          },
          name: `${axis[index]} | ${percent}`
        })
      })
      this.categoryOptions = {
        title: [{
          text: `${this.radioSelect}分布`,
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        }, {
          text: '累计订单量',
          subtext: total,
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
          data: chartData,
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
