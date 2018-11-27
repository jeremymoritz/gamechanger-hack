<template>
  <v-layout column justify-center v-if="allAlerts.length">
    <v-subheader>Recent Donations</v-subheader>

    <v-expansion-panel popout>
      <v-expansion-panel-content v-for="(alert, i) in allAlerts" :key="i" hide-actions>
        <AlertRow slot="header" :alert="alert" />
        <!-- <v-card>
          <v-divider></v-divider>
          <v-card-text v-text="lorem"></v-card-text>
        </v-card> -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Alert } from '../types'
import { alertSpace } from '../store'
import AlertRow from './AlertRow.vue'

@Component({ components: { AlertRow } })
export default class extends Vue {
  @alertSpace.Getter
  allAlerts!: Alert[]
}
</script>
<style scoped lang="scss">
</style>