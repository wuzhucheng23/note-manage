import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/api'  // 引入api
import '@/components'   // 引入公共组件
import '@/plugins'  // 引入相关插件
import '@/utils'    // 引入工具函数

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
