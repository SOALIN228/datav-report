import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/vcharts.js'
import ECharts from 'echarts'
import VueECharts from 'vue-echarts'
import './style/index.css'

Vue.config.productionTip = false
// 全局引入echarts
Vue.prototype.$echarts = ECharts
// 全局注册v-chart 组件
Vue.component('v-chart', VueECharts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
