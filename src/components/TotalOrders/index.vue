/**
* User: soalin
* Date: 2020/9/29
* Time: 07:52
* Desc:
*/
<template>
  <common-card
    :value="orderToday"
    title="累计订单量"
  >
    <template>
      <v-chart :options="getOptions()"/>
      <div :style="{width: '100%', height: '100%'}" id="total-orders-chart"/>
    </template>
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">{{ orderLastDay }}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  name: 'TotalOrders',
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions () {
      return this.orderTrend.length > 0 ? {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          data: this.orderTrend,
          areaStyle: {
            color: 'purple'
          },
          lineStyle: {
            width: 0
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }],
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      } : null
    }
  }
}
</script>

<style scoped>

</style>
