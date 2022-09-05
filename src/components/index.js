import Vue from 'vue'
import ServerAside from './server-aside'  // 底部导航栏
import ClientAside from './client-aside'    // 底部导航栏
import MyHeader from './my-header'    // 底部导航栏

Vue.component('my-server-aside', ServerAside)
Vue.component('my-client-aside', ClientAside)
Vue.component('my-header', MyHeader)
