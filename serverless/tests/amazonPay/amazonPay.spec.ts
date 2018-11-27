import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'ts-sinon'
import {
  captureDetailsToDonation,
  parseCaptureNotification
} from '../../src/amazonPay'
import { captureBody } from './exampleMessages'

const sandbox = sinon.default.createSandbox()

describe('PRODUCTION amazonPay storeCaptureDetails', () => {
  beforeEach(function() {
    //
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('example captureBody', async () => {
    const captureNotification = parseCaptureNotification(captureBody)
    const result = await captureDetailsToDonation(
      captureNotification.CaptureDetails
    )
    expect(result).to.be.eql({
      amount: 0.5,
      transactionId: 'S01-2765659-0358526-C003349',
      twitchUserId: '38659224',
      channelId: '25015105'
    })
  })
})
