import Vue from 'vue'
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Settings from '../components/Settings.vue'
import '../css/main.min.css'



Vue.config.productionTip = false

new Vue({
  render: h => h(Settings),
}).$mount('#settings')

new Vue({
  render: h => h(Header),
}).$mount('#header')
new Vue({
  render: h => h(Aside),
}).$mount('#aside')
