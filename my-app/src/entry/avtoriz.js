import Vue from 'vue'
import Avtorization from '../components/Avtorization.vue'

// import '../css/main.min.css'
import '../css/autoriz.min.css'

Vue.config.productionTip = false


new Vue({
  render: h => h(Avtorization),
}).$mount('#avtorization')
