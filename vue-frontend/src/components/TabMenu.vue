<template>
  <div>
    <keep-alive>
      <component v-bind:is="currentTabComponent">
      </component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import CheerBits from './CheerBits.vue'
import CharityInfo from './CharityInfo.vue'
import AlertHistory from './AlertHistory.vue'
import { alertSpace } from '../store'

// const timeout = (ms: number) => new Promise(res => setTimeout(res, ms))

@Component({
  components: { CheerBits, CharityInfo, AlertHistory }
})
export default class extends Vue {
  @Prop()
  currentTab!: number

  @alertSpace.Getter
  totalAmount!: number

  tabNumber: number = 0
  comps = ['', 'CheerBits', 'AlertHistory', 'CharityInfo', '']
  get currentTabComponent() {
    return this.comps[this.tabNumber]
  }

  @Watch('currentTab')
  onChildChanged(val: number) {
    this.tabNumber = val
  }
}
</script>
