<template>
    <v-layout column justify-center>
        <DonateButton :amount="currentAmount" :viewerInfo="viewerInfo" />
        <v-btn-toggle v-model="selectedIndex" mandatory>
            <v-btn flat v-for="(btn, i) in amounts" :key="i" :disabled="!viewerInfo.userId">
                ${{btn}}
            </v-btn>
        </v-btn-toggle>
    </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DonateButton from './DonateButton.vue'
import { ViewerInfo } from '../types'

@Component({
  components: { DonateButton }
})
export default class extends Vue {
  get viewerInfo(): ViewerInfo {
    return this.$store.state.config.viewerInfo
  }

  amounts = [5, 10, 20, 50]
  bottomNav = 3
  showNav = true
  selectedIndex = 2

  get currentAmount() {
    return this.amounts[this.selectedIndex]
  }
  color() {
    switch (this.bottomNav) {
      case 0:
        return 'blue-grey'
      case 1:
        return 'teal'
      case 2:
        return 'brown'
      case 3:
        return 'indigo'
    }
    return 'red'
  }
}
</script>
