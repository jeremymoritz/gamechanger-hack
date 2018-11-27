<template>
  <div>
    <v-speed-dial v-model="fab" right top direction="bottom" transition=slide-y-transition fixed>
      <v-btn slot="activator" v-model="fab" color="primary" fab>
        <div id="power-on-button" />
        <v-icon>bar_chart</v-icon>
      </v-btn>
      <v-btn fab small @click="select(1)" id="bitsButton">
        <img width="36px" src="@/assets/bits.gif" alt="Cheer Bits">
      </v-btn>

      <v-btn fab small @click="select(3)" id="infoButton">
        <v-icon>info</v-icon>
      </v-btn>
      <v-btn fab small @click="select(2)">
        <v-icon>list</v-icon>
      </v-btn>
      <v-btn fab small color="grey" @click="select(4)" id="visibilityButton">
        <v-icon>visibility_off</v-icon>
      </v-btn>
    </v-speed-dial>
    <slot />

  </div>
</template>
<style scoped lang="scss">
#power-on-button {
  width: 100%;
  height: 60px;
  position: relative;
  background-image: url('../assets/power-on-logo.svg');
  background-size: 100% 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  fab = false

  select(value: number) {
    this.$emit('selection', value)
  }
}
</script>
