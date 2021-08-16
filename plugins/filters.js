import Vue from 'vue'
import numeral from 'numeral'
import moment from 'moment'

Vue.filter('thousandFormat', (value, suffix = '') => {
  return numeral(value).format('0,0') + suffix
})

Vue.filter('dateFormat', (date, isOnlyDate = false) => {
  if (isOnlyDate) {
    return moment(date).format('YYYY.MM.DD')
  } else {
    return moment(date).format('YYYY.MM.DD hh:mm:ss')
  }
})

Vue.filter('currencyFormat', (value, currency = 'mBTC') => {
  if (!value) {
    value = 0
  }
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + currency
})

Vue.filter('decimalFormat', (value, precision = 5) => {
  if (!value) {
    value = 0
  }
  return value.toFixed(precision)
})
