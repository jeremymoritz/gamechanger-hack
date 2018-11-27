import { ConfigSpace } from '@/store/config'
import { expect, assert } from 'chai'
import Vuex, { Store } from 'vuex'
import { RootState } from '@/types'
import Vue from 'vue'

Vue.use(Vuex)

describe('process.env', () => {
  it('Uses "test" mode for EBS URL', () => {
    expect(process.env.VUE_APP_EBS_URL).to.eql('https://localhost:4000')
  })
})

describe('ConfigSpace', () => {
  const initialColor = '#AAA'

  let store: Store<RootState>
  let configSpace: ConfigSpace

  beforeEach(() => {
    store = new Store<RootState>({ strict: true })
    configSpace = new ConfigSpace(store)
  })

  afterEach(() => {
    configSpace.unregisterModule()
  })

  it('Initial Color', () => {
    assert.exists(store.state.config)
    expect(store.state.config.color).to.include(initialColor)
  })

  it('SetColor 1', () => {
    const expectedColor = '#456'
    configSpace.setColor(undefined, expectedColor)
    expect(store.state.config.color).to.include(expectedColor)
  })

  it('SetColor 2', () => {
    const expectedColor = '#345'
    configSpace.setColor(undefined, expectedColor)
    expect(store.state.config.color).to.include(expectedColor)
  })

  it('BlackColorMut', () => {
    configSpace.blackColorMut()
    expect(store.state.config.color).to.include('#001')
  })

  it('Reset to Initial Color', () => {
    assert.exists(store.state.config)
    expect(store.state.config.color).to.include(initialColor)
  })
})
