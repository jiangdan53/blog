//创建一个事件总线 实现事件得监听以及触发跟新
import Vue from 'vue';
const  app = new Vue({})
Vue.prototype.$bus = app
export default  app;