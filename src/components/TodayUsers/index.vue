/**
* User: soalin
* Date: 2020/9/29
* Time: 07:53
* Desc:
*/
<template>
  <common-card
    :value="orderUser"
    title="今日交易用户数">
    <template>
      <v-chart :options="getOptions()"/>
    </template>
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">{{ returnRate }}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  name: 'TodayUsers',
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions () {
      return {
        color: ['#3398db'],
        xAxis: {
          type: 'category',
          data: this.orderUserTrendAxis
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '用户实时交易量',
          type: 'bar',
          data: this.orderUserTrend,
          barWidth: '60%'
        }],
        tooltip: {},
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
