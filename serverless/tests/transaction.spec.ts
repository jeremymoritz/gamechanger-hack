import { expect } from 'chai'
import { describe, it } from 'mocha'
import { verifyReceipt } from '../src/handlers/bitsTransaction'
import * as sinon from 'ts-sinon'
import * as config from '../src/config'

const sandbox = sinon.default.createSandbox()

function exampleParsedReceipt() {
  return {
    topic: 'bits_transaction_receipt',
    exp: 1536637740,
    data: {
      transactionId: 'edfefb38-6fe7-4c4b-9e52-0e7d0759288b',
      time: '2018-09-11 02:49:00.745313276 +0000 UTC',
      userId: '102503310',
      product: {
        domainId: 'twitch.ext.th40ow0zog4oe9by5a1mtbsuqmadvb',
        sku: 'testSKU',
        displayName: 'TestProduct',
        cost: { amount: 5, type: 'bits' }
      }
    }
  }
}

function createExampleTransaction() {
  return {
    product: {
      domain: 'twitch.ext.th40ow0zog4oe9by5a1mtbsuqmadvb',
      sku: 'testSKU',
      cost: {
        amount: 5,
        type: 'bits'
      },
      inDevelopment: true,
      displayName: 'TestProduct',
      broadcast: true
    },
    transactionId: 'edfefb38-6fe7-4c4b-9e52-0e7d0759288b',
    userId: '102503310',
    displayName: 'inventonater',
    initiator: 'current_user',
    transactionReceipt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b3BpYyI6ImJpdHNfdHJhbnNhY3Rpb25fcmVjZWlwdCIsImV4cCI6MTUzNjYzNzc0MCwiZGF0YSI6eyJ0cmFuc2FjdGlvbklkIjoiZWRmZWZiMzgtNmZlNy00YzRiLTllNTItMGU3ZDA3NTkyODhiIiwidGltZSI6IjIwMTgtMDktMTEgMDI6NDk6MDAuNzQ1MzEzMjc2ICswMDAwIFVUQyIsInVzZXJJZCI6IjEwMjUwMzMxMCIsInByb2R1Y3QiOnsiZG9tYWluSWQiOiJ0d2l0Y2guZXh0LnRoNDBvdzB6b2c0b2U5Ynk1YTFtdGJzdXFtYWR2YiIsInNrdSI6InRlc3RTS1UiLCJkaXNwbGF5TmFtZSI6IlRlc3RQcm9kdWN0IiwiY29zdCI6eyJhbW91bnQiOjUsInR5cGUiOiJiaXRzIn19fX0.3BVYsviwR7E8UpaTg2Uv4XiZEXp8IYlIiGH9sDsT1XI'
  }
}

describe('parse receipt transaction', () => {
  beforeEach(function() {
    //
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('Parse and use TransactionReceipt in Production', async () => {
    sandbox.stub(config, 'production').value(true)

    const transactionReceipt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b3BpYyI6ImJpdHNfdHJhbnNhY3Rpb25fcmVjZWlwdCIsImV4cCI6MTUzNjYzNzc0MCwiZGF0YSI6eyJ0cmFuc2FjdGlvbklkIjoiZWRmZWZiMzgtNmZlNy00YzRiLTllNTItMGU3ZDA3NTkyODhiIiwidGltZSI6IjIwMTgtMDktMTEgMDI6NDk6MDAuNzQ1MzEzMjc2ICswMDAwIFVUQyIsInVzZXJJZCI6IjEwMjUwMzMxMCIsInByb2R1Y3QiOnsiZG9tYWluSWQiOiJ0d2l0Y2guZXh0LnRoNDBvdzB6b2c0b2U5Ynk1YTFtdGJzdXFtYWR2YiIsInNrdSI6InRlc3RTS1UiLCJkaXNwbGF5TmFtZSI6IlRlc3RQcm9kdWN0IiwiY29zdCI6eyJhbW91bnQiOjUsInR5cGUiOiJiaXRzIn19fX0.3BVYsviwR7E8UpaTg2Uv4XiZEXp8IYlIiGH9sDsT1XI'
    const twitchExtBitsTransaction = {
      transactionReceipt
    } as TwitchExtBitsTransaction
    const actualReceipt = verifyReceipt(twitchExtBitsTransaction, {
      ignoreExpiration: true
    })
    expect(actualReceipt).to.eql(exampleParsedReceipt().data)
  })

  it('transactionId vs transactionID??', () => {
    //
  })
})
