import Vue from 'vue'
import Settings from '../components/Settings.vue'
import '../css/main.min.css'
import '../js/main.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(Settings),
}).$mount('#settings')
