<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <DonationComplete v-if="complete">DONE</DonationComplete>
            <AmazonPayButton v-else :queryParams="queryParams" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as queryString from 'query-string'
import AmazonPayButton from './AmazonPayButton.vue'
import DonationComplete from './DonationComplete.vue'
@Component({ components: { AmazonPayButton, DonationComplete } })
export default class App extends Vue {
  queryParams: queryString.OutputParams = {}
  complete = false
  async created() {
    this.queryParams = queryString.parse(location.search)
    // tslint:disable-next-line:no-string-literal
    this.complete = !this.queryParams['userId']
  }
}
</script>

<style>
</style>