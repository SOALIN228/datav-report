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
import commonDataMixin from '@/mixins/commonDataMixin'

export default {
  name: 'WordCloud',
  mixins: [commonDataMixin],
  data () {
    return {
      chartData: {},
      chartSettings: {
        color: ['rgba(97,216,0,.7)', 'rgba(204,178,26,.7)', 'rgba(245,166,35,.7)', 'rgba(156,13,113,.7)']
      }
    }
  },
  watch: {
    wordCloud () {
      const data = []
      this.wordCloud.forEach(item => {
        data.push({
          name: item.word,
          value: item.count
        })
      })
      this.chartData = {
        columns: ['name', 'value'],
        rows: data
      }
    }
  }
}
</script>

<style scoped>

</style>
