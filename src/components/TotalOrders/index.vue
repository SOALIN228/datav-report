/**
* User: soalin
* Date: 2020/9/29
* Time: 07:52
* Desc:
*/
<template>
  <common-card
    :value="'32,039'"
    title="累计订单量"
  >
    <template>
      <v-chart :options="getOptions()"/>
      <div :style="{width: '100%', height: '100%'}" id="total-orders-chart"/>
    </template>
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">{{ '¥ 22,222' }}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'

export default {
  name: 'index',
  mixins: [commonCardMixin],
  methods: {
    getOptions () {
      return {
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
          data: [100, 200, 300, 250, 100],
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
      }
    }
  }
}
</script>

<style scoped>

</style>
