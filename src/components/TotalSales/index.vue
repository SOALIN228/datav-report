/**
* User: soalin
* Date: 2020/9/29
* Time: 07:45
* Desc:
*/
<template>
  <common-card
    :value="salesToday"
    title="累计销售额"
  >
    <template>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <span class="emphasis">{{ salesGrowthLastDay }}</span>
          <div class="increase"/>
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis">{{ salesGrowthLastMonth }}</span>
          <div class="decrease"/>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额 </span>
      <span class="emphasis">{{ salesLastDay }}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  name: 'TotalSales',
  mixins: [commonCardMixin, commonDataMixin]
}
</script>

<style lang="scss" scoped>
.compare-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  .compare {
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-top: 3px;
    color: #666;
  }
}
</style>
