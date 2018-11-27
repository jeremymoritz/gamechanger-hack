<template>
  <v-layout
    column
    justify-center
  >
    <v-subheader>Cheer Bits</v-subheader>

    <ProductComponent 
      v-for="(product, i) in allProducts" :key="i"
      :product="product">
    </ProductComponent>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductComponent from './Product.vue'
import { alertSpace } from '../store'
import { Product } from '../types'

@Component({ components: { ProductComponent } })
export default class extends Vue {
  @alertSpace.Getter
  allProducts!: Product[]
}
</script>

<style scoped lang="scss">
</style>