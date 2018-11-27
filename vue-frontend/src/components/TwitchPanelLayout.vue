<template>
  <div>
    <v-toolbar color="secondary">
      <v-toolbar-side-icon>
        <div class="power-on-button" />
      </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">GameChanger Charity</v-toolbar-title>
    </v-toolbar>

    <DonatePanel />
    <AlertHistory />
    <CharityInfo />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CharityInfo from './CharityInfo.vue'
import AlertHistory from './AlertHistory.vue'
import DonatePanel from './DonatePanel.vue'

@Component({
  components: { CharityInfo, AlertHistory, DonatePanel }
})
export default class extends Vue {
  categories = [
    { title: 'Alert History', component: 'AlertHistory' },
    { title: 'Charity Profile', component: 'CharityInfo' }
  ]
}
</script>
<style scoped lang="scss">
.power-on-button {
  width: 100%;
  height: 36px;
  position: relative;
  background-image: url('../assets/power-on-logo.svg');
  background-size: 100% 100%;
}
</style>