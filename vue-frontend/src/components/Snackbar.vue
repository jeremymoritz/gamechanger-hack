<template>
  <v-card>
    <v-snackbar id="snackbarComp" v-model="visible" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" @click="visible = false">

      <AlertRow :alert="mostRecentAlert" />

    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { alertSpace } from '../store'
import { Alert } from '../types'
import AlertRow from './AlertRow.vue'

@Component({ components: { AlertRow } })
export default class extends Vue {
  avatarImg = ''
  visible = false
  y = 'top'
  x = 'center'
  mode = ''
  timeout = 0
  alertTime = 5000

  @alertSpace.Getter
  mostRecentAlert!: Alert

  lastTimeout!: number
  @Watch('mostRecentAlert')
  onChildChanged(val: Alert) {
    this.avatarImg = val.avatar ? 'url("' + val.avatar + '")' : ''
    this.visible = true

    clearTimeout(this.lastTimeout)
    this.lastTimeout = setTimeout(() => {
      this.visible = false
    }, this.alertTime)
  }

  beforeDestroy() {
    clearTimeout(this.lastTimeout)
  }
}
</script>
<style scoped lang="scss">
.avatarImg {
  border-radius: 5px;
  width: 40px;
  height: 40px;
  position: relative;
  background-image: url('../assets/power-on-logo.svg');
  background-size: 100% 100%;
}

.productImg {
  border-radius: 5px;
  width: 40px;
  height: 40px;
  position: relative;
  background-size: 100% 100%;
}
</style>

