import Vue from 'vue'
import Avtorization from '../components/Avtorization.vue'

import '../scss/main.min.scss'
import '../css/autoriz.min.scss'
Vue.config.productionTip = false


new Vue({
  render: h => h(Avtorization),
}).$mount('#avtorization')
