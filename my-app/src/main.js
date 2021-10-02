import Vue from 'vue'
import App from './App.vue'
import Settings from './components/Settings.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(Settings),
}).$mount('#settings')
