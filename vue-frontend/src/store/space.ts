import {
  Store,
  Module,
  GetterTree,
  MutationTree,
  ActionTree,
  Mutation
} from 'vuex'
import { namespace as bindingHelpersFactory } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings'
import { RootState } from '../types'

/* tslint:disable:no-any */
export function commitMethod() {
  return <T>(
    target: StoreSpace<T>,
    key: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    const originalMethod: Mutation<T> = descriptor.value
    target._addMutation(key, originalMethod)

    descriptor.value = function(this: StoreSpace<T>, ...args: any[]) {
      const payload = args[1] // Element 0 is placeholder for state object
      this.commitFromDecorator(key, payload)
    }
    return descriptor
  }
}

/* tslint:enable:no-any */

export default abstract class StoreSpace<T> {
  constructor(
    state: T,
    private readonly namespace: string,
    private readonly rootStore: Store<RootState>,
    getters: GetterTree<T, RootState>,
    actions?: ActionTree<T, RootState>
  ) {
    this.vuexModule = {
      state: Object.assign({}, state),
      getters: Object.assign({}, getters),
      mutations: Object.assign({}, this.mutatorDict),
      actions: Object.assign({}, actions),
      namespaced: true
    }
    rootStore.registerModule<T>(namespace, this.vuexModule, {})
  }

  private readonly vuexModule: Module<T, RootState>

  private mutatorDict!: MutationTree<T>
  public _addMutation(key: string, func: Mutation<T>) {
    if (this.vuexModule) {
      throw Error('Trying to addMutation when Vuex Model already created')
    }
    this.mutatorDict = this.mutatorDict || {}
    this.mutatorDict[key] = func
  }

  public unregisterModule() {
    this.rootStore.unregisterModule(this.namespace)
  }

  private get bindingHelpers(): BindingHelpers {
    return bindingHelpersFactory(this.namespace)
  }
  get Getter() {
    return this.bindingHelpers.Getter
  }

  get Action() {
    return this.bindingHelpers.Action
  }

  get Mutation() {
    return this.bindingHelpers.Mutation
  }
  get State() {
    return this.bindingHelpers.State
  }

  public commitFromDecorator(type: string, payload: {}) {
    this.rootStore.commit(`${this.namespace}/${type}`, payload)
  }
}
