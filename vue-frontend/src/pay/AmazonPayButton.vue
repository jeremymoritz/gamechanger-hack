<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>{{queryParams.userName}}'s Donation:</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field v-if="queryParams.userName" :value="queryParams.userName" prepend-icon="person" name="userName" label="Twitch User" type="text" disabled></v-text-field>
                <v-text-field v-if="queryParams.channelName" :value="queryParams.channelName" prepend-icon="home" name="channelName" label="Twitch Channel" type="text" disabled></v-text-field>
                <v-text-field value="GameChanger Charity" prepend-icon="loyalty" name="recipient" label="Recipient" type="text" disabled></v-text-field>
                <v-text-field :value="queryParams.amount" prepend-icon="attach_money" name="amount" label="Amount" type="text" disabled></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <div id="AmazonPayButton" />
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as button from './button'

@Component({ components: {} })
export default class App extends Vue {
  @Prop()
  queryParams!: {}

  async mounted() {
    await button.load(document)
  }
}
</script>

<style>
</style>