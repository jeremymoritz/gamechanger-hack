<template>
  <v-app :dark="dark" :style="appStyle">
    <v-content>
      <Snackbar />
      <!-- <SpeedDial v-on:selection="speedDialSelection">
        <TabMenu :currentTab="currentTab" />
      </SpeedDial> -->
      <TwitchPanelLayout />

    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Snackbar from './components/Snackbar.vue'
import TwitchPanelLayout from './components/TwitchPanelLayout.vue'
import { configSpace } from './store'

@Component({ components: { Snackbar, TwitchPanelLayout } }) // TabMenu, SpeedDial,
export default class App extends Vue {
  @configSpace.Getter
  isPanel!: boolean

  @configSpace.Getter
  dark!: boolean

  get appStyle() {
    const twitchDarkPurple = '#201c2b'
    return this.dark ? { background: twitchDarkPurple } : {}
  }

  currentTab: string = ''
  speedDialSelection(value: string) {
    this.currentTab = value
  }
}
</script>

<style>
</style>