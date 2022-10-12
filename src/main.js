import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Pagination from '/components/Pagination'

import '../src/views/style/index.less'
// import "../src/views/js/rem.js"
import BaiduMap from "vue-baidu-map"
Vue.use(BaiduMap,{
  ak: 'be50c7492442ecf4e61ca7bd578d6b8b'
})

var baseURL = Glod.VUE_APP_BASE_URL
Vue.prototype.systemBaseUrl = baseURL+'/file/upload/filePreview.do?FILE_PATH='

// 全局方法挂载
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('Pagination', Pagination)
// 全局组件挂载
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
