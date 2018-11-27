<template>
  <div class="text-xs-center">
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="teal"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :rotate="-90"
      :size="100"
      :width="15"
      :value="value"
      color="primary"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :rotate="90"
      :size="100"
      :width="15"
      :value="value"
      color="red"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :rotate="180"
      :size="100"
      :width="15"
      :value="value"
      color="pink"
    >
      {{ value }}
    </v-progress-circular>

     <div>
    <v-progress-linear
      color="secondary"
      height="2"
      value="15"
    ></v-progress-linear>

    <v-progress-linear
      color="success"
      height="5"
      value="30"
    ></v-progress-linear>

    <v-progress-linear
      color="info"
      height="10"
      value="45"
    ></v-progress-linear>

    <v-progress-linear
      color="warning"
      height="15"
      value="60"
    ></v-progress-linear>

    <v-progress-linear
      color="error"
      height="20"
      :value="value"

    ></v-progress-linear>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  interval!: number
  value = 0

  beforeDestroy() {
    clearInterval(this.interval)
  }

  mounted() {
    // this.interval = setInterval(() => {
    //   if (this.value === 100) {
    //     return (this.value = 0)
    //   }
    //   this.value += 10
    // }, 1000)
  }
}
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>