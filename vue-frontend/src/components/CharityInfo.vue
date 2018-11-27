<template>
  <v-layout column justify-center>
    <v-subheader>Charity Updates</v-subheader>

    <v-carousel height=300 hide-controls hide-delimiters>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="`./media/${item.img}`">
        <v-card>
          <!-- <v-img :src="`./media/${item.img}`" aspect-ratio="2.75"></v-img> -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{item.header}}</h3>
              <div>{{item.text}}</div>
            </div>
          </v-card-title>
          <!-- <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions> -->
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  // tslint:disable:max-line-length
  items = [
    {
      img: 'ggb.jpg',
      header: 'GAMERS GIVE BACK',
      text: `In partnership with Child’s Play, we honor hospital staff, deliver gifts to patients, serve catered food & celebrate how games help kids.`
    },
    {
      img: 'hope.jpg',
      header: 'SCHOLARSHIPS',
      text: `We award college scholarships to inspiring young role models who battled through adversity, ensuring their dreams come true.`
    },

    {
      img: 'infant.jpg',
      header: 'CAREGIVER RESOURCES',
      text:
        'We provide resources to staff and caregivers to support the educational goals of patients experiencing long term treatment.'
    },

    {
      img: 'map.jpg',
      header: '16,470,672 Gifts',
      text:
        'We work with a network of 202 hospitals and have provided support to children and caretakers around the country, and we’re not done yet!'
    },

    {
      img: 'wristbands.jpg',
      header: 'SPREAD THE WORD',
      text:
        'We are on a mission to make our biggest impact to date, and we cannot do it without you.'
    },

    {
      img: 'super.jpg',
      header: 'GAMES MATTER',
      text:
        'You can directly support a child with cancer and provide financial aid to their family by donating online today.'
    }
  ]
  // tslint:enable:max-line-length
}
</script>

<style scoped lang="scss">
.theme--dark.v-card {
  background-color: #42424280;
  border-color: #424242;
  color: #fff;
}
</style>