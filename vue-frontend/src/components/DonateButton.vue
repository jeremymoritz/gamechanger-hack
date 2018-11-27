<template>
  <v-tooltip bottom>
    <v-btn v-if="viewerInfo.userId" block color="primary" @click="performDonation" slot="activator">Donate ${{amount}} to GameChanger</v-btn>
    <v-btn v-else block color="accent" slot="activator" @click="requestIdShare">Grant Access to Donate</v-btn>

    <span v-if="viewerInfo.userId">{{viewerInfo.userName}} donating via {{viewerInfo.channelName}}</span>
    <span v-else>Grant Access to Donate</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { configSpace } from '../store'
import config from '../config'
import { ViewerInfo } from '../types'

@Component
export default class extends Vue {
  @Prop()
  private amount!: number
  @Prop()
  private viewerInfo!: ViewerInfo

  @configSpace.Action
  requestIdShare!: () => void

  payUrl() {
    // TODO Check if userId is available!!
    return `${config.payFrontEndUrl}?amount=${this.amount}&userId=${
      this.viewerInfo.userId
    }&channelId=${this.viewerInfo.channelId}&userName=${
      this.viewerInfo.userName
    }&channelName=${this.viewerInfo.channelName}`
  }

  performDonation() {
    window.open(this.payUrl(), '_blank')
  }
}
</script>


<style scoped lang="scss">
</style>
