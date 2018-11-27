<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Donation Complete!</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            Thank you for your donation. Your alert on Twitch will be visible in the GameChanger Extension Panel shortly!<br>
            It is now safe to close this window.
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeWindow" color="primary">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ components: {} })
export default class App extends Vue {
  closeWindow() {
    window.close()
  }
}
</script>

<style>
</style>