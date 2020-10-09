/**
* User: soalin
* Date: 2020/9/29
* Time: 07:13
* Desc:
*/
<template>
  <div class="sales-view">
    <el-card :body-style="{ padding: '0 0 20px 0' }" shadow="hover">
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu :default-active="activeIndex"
                   @select="onMenuSelect"
                   class="sales-view-menu"
                   mode="horizontal"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group size="small" v-model="radioSelect">
              <el-radio-button label="今日"/>
              <el-radio-button label="本周"/>
              <el-radio-button label="本月"/>
              <el-radio-button label="今年"/>
            </el-radio-group>
            <el-date-picker
              :picker-options="pickerOptions"
              class="sales-view-date-picker"
              end-placeholder="结束日期"
              range-separator="至"
              size="small"
              start-placeholder="开始日期"
              type="daterange"
              unlink-panels
              v-model="date"
            />
          </div>
        </div>
      </template>
      <template>
        <div class="sales-view-chart-wrapper">
          <v-chart :options="chartOption"/>
          <div class="sales-view-list">
            <div class="sales-view-title">排行榜</div>
            <div class="list-item-wrapper">
              <div :key="item.no" class="list-item" v-for="item in rankData">
                <div :class="['list-item-no', +item.no <= 3 ? 'top-no' : '']">{{ item.no }}</div>
                <div class="list-item-name">{{ item.name }}</div>
                <div class="list-item-money">{{ item.money }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  name: 'SalesView',
  mixins: [commonDataMixin],
  data () {
    return {
      activeIndex: '1',
      radioSelect: '今日',
      date: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const start = new Date()
            const end = new Date()
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const start = new Date()
            const end = new Date()
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const start = new Date()
            const end = new Date()
            start.setTime(start.getTime() - 3600 * 24 * 1000 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      chartOption: {}
    }
  },
  computed: {
    rankData () {
      return this.activeIndex === '1' ? this.orderRank : this.userRank
    }
  },
  watch: {
    orderFullYear () {
      this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
    }
  },
  methods: {
    onMenuSelect (index) {
      this.activeIndex = index
      if (index === '1') {
        this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
      } else {
        this.render(this.userFullYear, this.userFullYearAxis, '年度用户访问量')
      }
    },
    render (data, axis, title) {
      this.chartOption = {
        color: ['#3398DB'],
        grid: {
          top: 70,
          left: 60,
          right: 60,
          bottom: 50
        },
        title: {
          text: title,
          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 25,
          top: 20
        },
        xAxis: {
          type: 'category',
          data: axis,
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#999'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        series: [{
          type: 'bar',
          barWidth: '35%',
          data: data
        }],
        tooltip: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sales-view {
  margin-top: 20px;

  .menu-wrapper {
    position: relative;
    display: flex;

    .sales-view-menu {
      width: 100%;
      padding-left: 20px;

      .el-menu-item {
        line-height: 50px;
        height: 50px;
        margin: 0 20px;
      }
    }

    .menu-right {
      position: absolute;
      top: 0;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 50px;

      .sales-view-date-picker {
        margin-left: 20px;
      }
    }
  }

  .sales-view-chart-wrapper {
    display: flex;
    height: 270px;

    .echarts {
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }

    .sales-view-list {
      overflow: hidden;
      flex: 1;
      width: 100%;
      height: 100%;

      .sales-view-title {
        font-size: 12px;
        font-weight: 500;
        margin-top: 20px;
        color: #666;
      }

      .list-item-wrapper {
        margin-top: 15px;

        .list-item {
          font-size: 12px;
          display: flex;
          align-items: center;
          height: 20px;
          padding: 6px 20px 6px 0;

          .list-item-no {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;

            &.top-no {
              font-weight: 500;
              color: #fff;
              border-radius: 50%;
              background: #000;
            }
          }

          .list-item-name {
            margin-left: 10px;
            color: #333;
          }

          .list-item-money {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
