/**
* User: soalin
* Date: 2020/9/29
* Time: 07:43
* Desc:
*/
<template>
  <div class="common=card">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot></slot>
    </div>
    <div class="line"></div>
    <div class="total">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    title: String,
    value: [String, Number]
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #999;
}

.value {
  font-size: 25px;
  margin-top: 5px;
  letter-spacing: 1px;
  color: #000;
}

.chart {
  height: 50px;
}

.line {
  margin: 10px 0;
  border-top: 1px solid #eee;
}

.total {
  font-size: 12px;
  color: #666;
}
</style>
<style lang="scss">
.emphasis {
  font-weight: 700;
  margin-left: 5px;
  color: #333;
}

.increase {
  width: 0;
  height: 0;
  margin: 0 0 3px 5px;
  border-width: 3px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}

.decrease {
  width: 0;
  height: 0;
  margin: 3px 0 0 5px;
  border-width: 3px;
  border-style: solid;
  border-color: green transparent transparent transparent;
}
</style>
