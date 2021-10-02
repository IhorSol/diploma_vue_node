import Vue from 'vue'
// import Settings from '../components/Settings.vue'
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import '../css/main.min.css'
// import '../js/main.js'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(Settings),
// }).$mount('#settings')
new Vue({
  render: h => h(Header),
}).$mount('#header')
new Vue({
  render: h => h(Aside),
}).$mount('#aside')
