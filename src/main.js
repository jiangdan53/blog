import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './Style/globel.less'
import loding from '@/directive/loding'
import './mock/index';
import './envenBus.js'
Vue.config.productionTip = false
Vue.config.silent = true
Vue.directive('loding',loding)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
