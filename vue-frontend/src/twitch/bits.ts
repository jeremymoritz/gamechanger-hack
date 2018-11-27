export class BitsManager {
  constructor(private useLoopback: boolean) {}
  private readonly bitsResolutions: Array<(bits: TwitchExtBits) => void> = []
  private get bits(): Promise<TwitchExtBits> {
    if (this.twitchExtBits) return Promise.resolve(this.twitchExtBits)
    return new Promise<TwitchExtBits>(resolve => {
      this.bitsResolutions.push(resolve)
    })
  }

  private twitchExtBits?: TwitchExtBits
  public initialize(twitchExtBits: TwitchExtBits) {
    if (this.twitchExtBits) return
    this.twitchExtBits = twitchExtBits
    twitchExtBits.onTransactionComplete(
      (transaction: TwitchExtBitsTransaction) => {
        this.onTransactionCompleteCallbacks.map(
          (cb: (transaction: TwitchExtBitsTransaction) => void) => {
            cb(transaction)
          }
        )
      }
    )
    twitchExtBits.onTransactionCancelled(() => {
      this.onTransactionCancelled()
    })
    twitchExtBits.setUseLoopback(this.useLoopback)

    this.bitsResolutions.map(cb => {
      cb(twitchExtBits)
    })
    this.bitsResolutions.length = 0
  }
  onTransactionCancelled() {
    // TODO Log this as an event
  }

  private onTransactionCompleteCallbacks: Array<
    (transaction: TwitchExtBitsTransaction) => void
  > = []
  public addOnTransactionCompleteCallback(
    cb: (transaction: TwitchExtBitsTransaction) => void
  ) {
    this.onTransactionCompleteCallbacks.push(cb)
  }

  public async getProducts(): Promise<ReadonlyArray<TwitchExtBitsProduct>> {
    const bits = await this.bits
    return bits.getProducts()
  }

  public async purchase(product: { sku: string }): Promise<void> {
    const bits = await this.bits
    bits.useBits(product.sku)
  }

  public async showBitsBalance(): Promise<void> {
    const bits = await this.bits
    bits.showBitsBalance()
  }
}
