import Vue from 'vue'
import { expect, assert } from 'chai'
import Vuex, { Store } from 'vuex'
import { RootState, Alert } from '@/types'
import { AlertSpace } from '@/store/alert'
Vue.use(Vuex)

describe('AlertSpace', () => {
  let store: Store<RootState>
  let alertSpace: AlertSpace

  beforeEach(() => {
    store = new Store<RootState>({ strict: true })
    alertSpace = new AlertSpace(store)
  })

  afterEach(() => {
    alertSpace.unregisterModule()
  })

  it('Initial Alerts', () => {
    assert.exists(store.state.alert)
    expect(store.state.alert.alerts.length).to.eql(2)
  })

  it('Add an alert', () => {
    assert.exists(store.state.alert)
    const a = {} as Alert
    alertSpace.addAlert(undefined, a)
    expect(store.state.alert.alerts.length).to.eql(3)
  })
})
