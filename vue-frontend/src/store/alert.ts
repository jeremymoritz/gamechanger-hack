import { Store, GetterTree, ActionTree } from 'vuex'
import StoreSpace, { commitMethod } from './space'
import { RootState, AlertState, Product, Alert } from '../types'

const stateTemplate: AlertState = {
  products: [],
  totalAmount: 0,
  alerts: [
    // {
    //   avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    //   name: 'John Leider',
    //   title: 'Blah blah blah!',
    //   text: 'Thank you for joining our community...',
    //   amount: 50
    // },
    // {
    //   avatar:
    //     'https://static-cdn.jtvnw.net/jtv_user_pictures/904a5d31-868f-487b-83c1-d7a00c7f8b2d-profile_image-300x300.jpg',
    //   name: 'Nate A',
    //   title: 'Nate donated!',
    //   text: 'whatever wahtever',
    //   amount: 200
    // }
  ]
}

const gettersTemplate: GetterTree<AlertState, RootState> = {
  allProducts: s => s.products,
  allAlerts: s => s.alerts,
  above100: s => s.alerts.filter(a => a.amount > 100),
  mostRecentAlert: (s: AlertState): Alert =>
    s.alerts.length > 0 ? s.alerts[0] : ({} as Alert),
  totalAmount: s => s.totalAmount
}
const namespace = 'alert'
const actions: ActionTree<AlertState, RootState> = {
  async addAlertAsync({ commit, rootState }, id) {
    const resp: string = await rootState.twitch.ebsPost('cycleColor')
    const alert: Alert = {
      avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      name: 'Nate A',
      title: 'did my thing',
      text: resp,
      amount: 200
    }
    commit('addAlert', alert)
  },
  async useBits({ rootState }, product: Product) {
    await rootState.twitch.bits.purchase(product)
    await rootState.twitch.ebsPost('cycleColor')
  }
}

const nullState: AlertState = { alerts: [], products: [], totalAmount: 0 }
export class AlertSpace extends StoreSpace<AlertState> {
  constructor(store: Store<RootState>) {
    super(stateTemplate, namespace, store, gettersTemplate, actions)
  }

  @commitMethod()
  addAlert(s: AlertState = nullState, newAlert: Alert) {
    s.totalAmount += newAlert.amount
    s.alerts.unshift({ ...newAlert })
    while (s.alerts.length > 5) {
      s.alerts.pop()
    }
  }

  @commitMethod()
  addProduct(s: AlertState = nullState, newProduct: Product) {
    s.products.push({ ...newProduct })
  }
}
