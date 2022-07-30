import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/routerEach'
import store from './store'
import "./styles/index.scss"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import { borderBox8, borderBox12, scrollBoard, decoration6, decoration8, decoration10 } from '@jiaminghi/data-view'

Vue.use(borderBox8).use(borderBox12).use(scrollBoard).use(decoration6).use(decoration8).use(decoration10)

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
