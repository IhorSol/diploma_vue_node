import Vue from 'vue'
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import '../scss/main.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(Header),
}).$mount('#header')
new Vue({
  render: h => h(Aside),
}).$mount('#aside')
