/* tslint:disable:no-import-side-effect */
import '@babel/polyfill'
import axios from 'axios'
import Vue from 'vue'
import '../plugins/vuetify'
/* tslint:enable:no-import-side-effect  */

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import App from './Pay.vue'

const vue = new Vue({
  render: h => h(App)
})
vue.$mount('#app')
