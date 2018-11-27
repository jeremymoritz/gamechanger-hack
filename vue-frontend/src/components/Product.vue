<template>
  <div class="viewer">
    <div style="float: left; position: relative; left: 50%;">

      <div v-if="this.product.cost.type === 'USD'" :class="['productImage', this.product.sku]" @click="usdPurchase">
        <div class="cheer">Cheer {{product.cost.amount}}: {{product.displayName}}: </div>
      </div>
      <div v-else-if="this.product.cost.type === 'bits'" :class="['productImage', this.product.sku]" @click="bitsPurchase">
        <div class="cheer">Cheer {{product.cost.amount}}: {{product.displayName}}: </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Product } from '../types'
import { configSpace, alertSpace } from '../store'
import config from '../config'

@Component
export default class extends Vue {
  @Prop()
  private product!: Product

  @configSpace.Getter
  color!: string

  @configSpace.Getter
  userId!: string

  @configSpace.Getter
  channelId!: string

  @alertSpace.Action
  useBits!: (product: Product) => void

  payUrl() {
    const amount = this.product.cost.amount

    // TODO Check if userId is available!!
    return `${config.payFrontEndUrl}?amount=${amount}&userId=${
      this.userId
    }&channelId=${this.channelId}`
  }

  usdPurchase() {
    window.open(this.payUrl(), '_blank')
  }

  bitsPurchase() {
    this.useBits(this.product)
  }
}
</script>


<style scoped lang="scss">
.cheer {
  text-align: center;
  margin: auto;
  margin-top: 15px;
}

body {
  background: #20262e;
  padding: 20px;
  font-family: Helvetica;
}
</style>


<style lang="scss">
.productImage {
  border-radius: 50px;
  margin-top: 30px;
  width: 100px;
  height: 100px;
  float: left;
  position: relative;
  left: -50%;
  transition: background-color 0.5s ease;
  background-image: url('../assets/power-on-logo.svg');
  background-size: 100% 100%;
}

.sk100 {
  background-image: url('../assets/sk100.png');
}

.sk500 {
  background-image: url('../assets/sk500.png');
}
.sk1000 {
  background-image: url('../assets/sk1000.png');
}
</style>