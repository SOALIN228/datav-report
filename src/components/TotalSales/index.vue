/**
* User: soalin
* Date: 2020/9/29
* Time: 07:45
* Desc:
*/
<template>
  <common-card
    :value="'¥ 32,039'"
    title="累计销售额"
  >
    <template>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <span class="emphasis">{{ '¥ 22,222' }}</span>
          <div class="increase"/>
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis">{{ '¥ 22,222' }}</span>
          <div class="decrease"/>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额 </span>
      <span class="emphasis">{{ '¥ 22,222' }}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'

export default {
  name: 'index',
  mixins: [commonCardMixin]
}
</script>

<style lang="scss" scoped>
.compare-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .compare {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 3px;
    color: #666;
  }
}
</style>
