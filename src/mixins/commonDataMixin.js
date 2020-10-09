/**
 * User: soalin
 * Date: 2020/10/9
 * Time: 07:39
 * Desc:
 */

// 千分位处理，只处理整数
function format (v) {
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  return `${v}`.replace(reg, '$&,')
}

// 整数千分位处理
function wrapperNumber (o, k) {
  return o && o[k] ? format(o[k]) : 0
}

// 原始整数
function wrapperOriginalNumber (o, k) {
  return o && o[k] ? o[k] : 0
}

// 数组处理
function wrapperArray (o, k) {
  return o && o[k] ? o[k] : []
}

// 金额千分位处理
function wrapperMoney (o, k) {
  return o && o[k] ? `¥ ${format(o[k])}` : '¥ 0.00'
}

// 百分号处理
function wrapperPercentage (o, k) {
  return o && o[k] ? `${o[k]}%` : '0%'
}

export default {
  inject: ['getReportData', 'getWordCloud', 'getMapData'],
  computed: {
    reportData () {
      return this.getReportData()
    },
    salesToday () {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesLastDay () {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    orderToday () {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay () {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend () {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    orderUser () {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    returnRate () {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    orderUserTrend () {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    orderUserTrendAxis () {
      return wrapperArray(this.reportData, 'orderUserTrendAxis')
    },
    userToday () {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userTodayNumber () {
      return wrapperOriginalNumber(this.reportData, 'userToday')
    },
    userLastMonth () {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    userGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'userGrowthLastMonth')
    },
    orderFullYear () {
      return wrapperArray(this.reportData, 'orderFullYear')
    },
    orderFullYearAxis () {
      return wrapperArray(this.reportData, 'orderFullYearAxis')
    },
    orderRank () {
      return wrapperArray(this.reportData, 'orderRank')
    },
    userFullYear () {
      return wrapperArray(this.reportData, 'userFullYear')
    },
    userFullYearAxis () {
      return wrapperArray(this.reportData, 'userFullYearAxis')
    },
    userRank () {
      return wrapperArray(this.reportData, 'userRank')
    }
  }
}
