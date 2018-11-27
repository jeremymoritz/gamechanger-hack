import { expect, assert } from 'chai'
import { describe, it } from 'mocha'
import { handler as cycleColorHandler } from '../../src/handlers/cycleColor'

import * as jwt from '../../src/jwt'
import * as sinon from 'ts-sinon'
import * as broadcast from '../../src/broadcast'
import { APIGatewayProxyEvent } from 'aws-lambda'

const sandbox = sinon.default.createSandbox()

describe('cycleColor', () => {
  const broadcastColorReturn = 'ok!'
  const frontEndAuth = { authy: 'ok!!' }
  const eventIn = sinon.stubInterface<APIGatewayProxyEvent>({
    headers: { Authorization: 'asdf' },
    body: 'asdf'
  })

  let broadcastColorStub, verifyAuthorizationTokenStub: sinon.default.SinonStub
  beforeEach(function() {
    verifyAuthorizationTokenStub = sandbox
      .stub(jwt, 'verifyAuthorizationToken')
      .returns(frontEndAuth)

    broadcastColorStub = sandbox
      .stub(broadcast, 'broadcastColor')
      .resolves(broadcastColorReturn)
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('returns a random color', async () => {
    const result = await cycleColorHandler(eventIn)
    expect({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: broadcastColorReturn
    }).to.be.eql(result)
    assert(broadcastColorStub.calledOnce)
    const args = broadcastColorStub.getCall(0).args
    expect(args[0]).to.be.eql(frontEndAuth)
    expect(args[1].length).to.be.eql(7)
  })
})
