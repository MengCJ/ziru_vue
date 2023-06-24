import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as Api  from "@/api/room" 
import * as UserApi  from "@/api/user" 
 
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$Api = Api
    Vue.prototype.$UserApi = UserApi
  }
}).$mount('#app')
