/**
* User: soalin
* Date: 2020/9/29
* Time: 07:53
* Desc:
*/
<template>
  <common-card
    :value="'32,039'"
    title="今日交易用户数">
    <template>
      <div :style="{width: '100%', height: '100%'}" id="today-users-chart"/>
    </template>
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">{{ '¥ 22,222' }}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'

export default {
  name: 'index',
  mixins: [commonCardMixin],
  mounted () {
    const chartDom = document.getElementById('today-users-chart')
    const chart = this.$echarts.init(chartDom)
    chart.setOption({
      color: ['#3398db'],
      xAxis: {
        type: 'category',
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00']
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'bar',
        data: [410, 82, 200, 334, 390, 330],
        barWidth: '60%'
      }],
      tooltip: {},
      grid: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    })
  }
}
</script>

<style scoped>

</style>
