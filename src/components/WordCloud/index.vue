/**
* User: soalin
* Date: 2020/10/9
* Time: 06:59
* Desc:
*/
<template>
  <ve-wordcloud :data="chartData" :settings="chartSettings" height="100%"/>
</template>

<script>
export default {
  name: 'WordCloud',
  data () {
    return {
      chartData: {
        columns: ['name', 'value'],
        rows: [{
          name: 'test1',
          value: 100
        }, {
          name: 'test2',
          value: 50
        }, {
          name: 'test3',
          value: 25
        }]
      },
      chartSettings: {
        color: ['rgba(97,216,0,.7)', 'rgba(204,178,26,.7)', 'rgba(245,166,35,.7)', 'rgba(156,13,113,.7)']
      }
    }
  }
}
</script>

<style scoped>

</style>
