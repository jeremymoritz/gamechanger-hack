import { expect, assert } from 'chai'
import { describe, it } from 'mocha'
import * as sinon from 'ts-sinon'
const sandbox = sinon.default.createSandbox()
import * as jwt from '../../src/jwt'
import { handler as cycleColorHandler } from '../../src/handlers/cycleColor'
import * as broadcast from '../../src/broadcast'

describe('handler tests', () => {
  let eventIn, verifyMethodStub, broadcastColorStub: sinon.default.SinonStub
  const broadcastColorResult = 'colorFuncResult'

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
    broadcastColorStub = sandbox
      .stub(broadcast, 'broadcastColor')
      .returns(Promise.resolve(broadcastColorResult))
  })

  afterEach(async () => {
    sandbox.restore()
  })

  describe('cycleColor', () => {
    it('returns a color', async () => {
      const result = await cycleColorHandler(eventIn)

      expect(verifyMethodStub.callCount, 'verifyMethod was called').to.equal(1)
      expect(
        broadcastColorStub.callCount,
        'broadcastColor was called'
      ).to.equal(1)

      const expectedCallbackArgs = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
        body: broadcastColorResult
      }
      expect(result, 'cycleColorFunc used callback properly').to.eql(
        expectedCallbackArgs
      )
    })
  })
})
