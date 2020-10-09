<template>
  <div class="home">
    <top-view/>
    <sales-view/>
    <bottom-view/>
    <map-view/>
  </div>
</template>

<script>
import TopView from '../components/TopView'
import SalesView from '../components/SalesView'
import BottomView from '../components/BottomView'
import MapView from '../components/MapView'
import { wordCloud, mapScatter, screenData } from '@/api'

export default {
  name: 'Home',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView
  },
  data () {
    return {
      reportData: null,
      wordCloud: null,
      mapData: null
    }
  },
  provide () {
    return {
      getReportData: this.getReportData,
      getWordCloud: this.getWordCloud,
      getMapData: this.getMapData
    }
  },
  mounted () {
    screenData().then(data => {
      this.reportData = data
    })
    wordCloud().then(data => {
      this.wordCloud = data
    })
    mapScatter().then(data => {
      this.mapData = data
    })
  },
  methods: {
    getReportData () {
      return this.reportData
    },
    getWordCloud () {
      return this.wordCloud
    },
    getMapData () {
      return this.mapData
    }
  }
}
</script>
<style>
.home {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background: #eee;
}
</style>
