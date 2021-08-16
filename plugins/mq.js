import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    md: 990,
    lg: 1215,
    xl: Infinity
  }
})
