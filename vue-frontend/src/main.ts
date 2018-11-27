/* tslint:disable:no-import-side-effect */
import '@babel/polyfill'
import axios from 'axios'
import Vue from 'vue'
import './plugins/vuetify'
/* tslint:enable:no-import-side-effect  */

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import App from './App.vue'
import store, { alertSpace, configSpace } from './store'
import { TwitchManager } from './twitch'
import { ViewerInfo } from './types'

alertSpace.addProduct(undefined, {
  cost: {
    amount: '0.5',
    type: 'USD'
  },
  displayName: 'pay1',
  sku: 'amazonPay1'
})

const vue = new Vue({
  store,
  render: h => h(App)
})
vue.$mount('#app')

const twitch = new TwitchManager()
store.state.twitch = twitch

configSpace.setQueryParams(undefined, twitch.queryParams())
twitch.onContext(context => {
  configSpace.setContext(undefined, context)
})

twitch.onAuthorizedListeners.push(async (viewInfo: ViewerInfo) => {
  configSpace.setViewerInfo(undefined, viewInfo)
  if (viewInfo && viewInfo.userId) {
    const [user, channelUser] = await twitch.getTwitchUsersByUserId([
      viewInfo.userId,
      viewInfo.channelId
    ])

    configSpace.setUser(undefined, user)
    // TODO if userId and channelId are the same, channelUser will not be set
    configSpace.setChannelUser(undefined, channelUser || user)
  }
})

twitch.pubSubListeners.push(message => {
  twitch.log(message)
  const payloadWithType = JSON.parse(message) as {
    type: string;
    payload: {};
  }
  store.commit(payloadWithType.type, payloadWithType.payload)
})

twitch.bits
  .getProducts()
  .then(products => {
    products.map(bitsProduct => {
      alertSpace.addProduct(undefined, bitsProduct)
    })
  })
  .catch(e => {
    throw new Error(e)
  })
