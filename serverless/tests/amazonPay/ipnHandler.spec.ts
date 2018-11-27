import { expect, assert } from 'chai'
import { describe, it } from 'mocha'
import * as sinon from 'ts-sinon'
const sandbox = sinon.default.createSandbox()
import { donations } from '../../src/db'
import * as jwt from '../../src/jwt'
import { handler as amazonPayIpnHandler } from '../../src/handlers/amazonPayIpn'
import { captureBody } from './exampleMessages'

describe('ipnHandler with production AmazonPay API', () => {
  let eventIn, verifyMethodStub: sinon.default.SinonStub

  beforeEach(() => {
    const expectedAuthorization = 'expectedAuthorization!!'
    const authObj = {}
    eventIn = {
      headers: { origin: 'asdfasdf', Authorization: expectedAuthorization }
    }
    expect(
      eventIn.headers.Authorization,
      'Authorization header MUST be Capitalized in AWS Gateway'
    ).to.be.eql(expectedAuthorization)

    verifyMethodStub = sandbox.stub(jwt, 'verifyAuthorizationToken')
    verifyMethodStub.withArgs('expectedAuthorization').returns(authObj)
    verifyMethodStub.withArgs(authObj).returns(authObj)
  })

  // Make sure you are running a local DynamoDB, otherwise this will time out!
  afterEach(async () => {
    sandbox.restore()
    const queryResult = await donations.query()
    queryResult.forEach(async element => {
      await donations.delete(element)
    })
    expect(queryResult.length, 'found orphaned donation items in db').to.eql(0)
  })

  //npm run test -- -g "returns something real"
  it('returns something real', async () => {
    eventIn.body = JSON.stringify(captureBody)
    const result = await amazonPayIpnHandler(eventIn)
    expect(200, 'ipn returned bad statusCode').to.eql(result.statusCode)
    const expectedHeaders = {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    }
    expect(expectedHeaders, 'headers in ipn response broken').to.eql(
      result.headers
    )
    const resultBody = JSON.parse(result.body)
    expect(resultBody, 'ipn response body is broken').to.include({
      amount: 0.5,
      transactionId: 'S01-2765659-0358526-C003349',
      twitchUserId: '38659224',
      channelId: '25015105'
    })

    const queryResult = await donations.query()
    expect(queryResult[0], 'ipn response body is broken').to.include({
      amount: 0.5,
      transactionId: 'S01-2765659-0358526-C003349',
      twitchUserId: '38659224',
      channelId: '25015105',
      partition: 'v1_Donation'
    })
    expect(queryResult[0]['sort'])
      .to.be.at.most(Date.now())
      .and.at.least(Date.now() - 500)
    await donations.delete(queryResult[0])
  })

  it('handles non Capture notifications', async () => {
    //
  })
})
