import Vue from 'vue'
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import SetTask from '../components/SetTask.vue'
import '../css/main.min.css'


Vue.config.productionTip = false

export const bus = new Vue();
new Vue({
  render: h => h(Header),
}).$mount('#header')
new Vue({
  render: h => h(Aside),
}).$mount('#aside')

new Vue({
  render: h => h(SetTask),
}).$mount('#setTask')
