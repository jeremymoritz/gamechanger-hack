import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import * as alert from './alert'
import * as config from './config'
import { RootState } from '../types'
Vue.use(Vuex)

const store = new Store<RootState>({
  strict: true
})
export default store
export const configSpace = new config.ConfigSpace(store)
export const alertSpace = new alert.AlertSpace(store)
