import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import '@/icons' // icon
import '@/permission' // permission control
import Storage from 'vue-ls'
import GoEasy from "goeasy";  //npm install --save goeasy

const options = {
  namespace: 'vuejs__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};
Vue.use(Storage,options);
Vue.prototype.$store=store
Vue.prototype.$http = axios

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI)

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

const goEasy = GoEasy.getInstance({
  host:"hangzhou.goeasy.io",//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
  appkey:"BC-abcfb2ed9f294d3b9ba0f9008ab365d6",// common key
  modules: ['pubsub']
});

const pubSub = goEasy.pubsub;

Vue.prototype.goEasy = goEasy;
Vue.prototype.pubSub = pubSub;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
