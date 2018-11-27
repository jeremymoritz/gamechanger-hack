import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'ts-sinon'
import {
  getOrderReferenceDetails,
  getOrderReferenceId
} from '../../src/amazonPay/api'
import { CaptureDetails } from '../../src/amazonPay/types'

const sandbox = sinon.default.createSandbox()

describe('getOrderReferenceDetails', () => {
  beforeEach(function() {
    //
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('Converts CaptureId into OrderId', () => {
    const actualId = getOrderReferenceId({
      AmazonCaptureId: 'P01-6836681-9994144-C234kd'
    } as CaptureDetails)
    expect(actualId).to.be.eql('P01-6836681-9994144')
  })

  it('returns SellerNote, StoreName, and SellerOrderId from CaptureId', async () => {
    const ord = await getOrderReferenceDetails({
      AmazonCaptureId: 'S01-8436385-2645943-C029134'
    } as CaptureDetails)
    expect(ord.SellerNote).to.be.eql('102503310')
    expect(ord.SellerOrderAttributes).to.be.eql({
      StoreName: 'GameChanger Twitch',
      SellerOrderId: '1542220610081_102503310'
    })
  })
})

// payment.offAmazonPayments.getCaptureDetails(
//   {
//     AmazonCaptureId: 'P01-6836681-9994144-C029134'
//   },
//   (err, details) => {
//     if (err) console.error(err)
//     if (details) console.log(details)
//   }
// )
// payment.offAmazonPayments.getAuthorizationDetails(
//   {
//     AmazonAuthorizationId: 'P01-6836681-9994144-A029134'
//   },
//   (err, details) => {
//     console.log(details)
//   }
// )
