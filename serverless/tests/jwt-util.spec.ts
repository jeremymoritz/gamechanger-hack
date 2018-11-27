import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as gccJwt from '../src/jwt'

import { twitchExtensionOptions } from '../src/config'
import * as jsonwebtoken from 'jsonwebtoken'

describe('jwt-util', () => {
  it('works with all versions of opaque users', () => {
    // expect({ hi: 5 }).to.eql({ hi: 6 });
  })

  it('fails verification upon expired token', () => {
    // expect({ hi: 5 }).to.eql({ hi: 6 });
  })

  it('gets eql objectr from raw to signed to verified', () => {
    const dateNumber = Date.now()
    const expectedUserId = 'nate'
    const expectedChannelId = 'gamechangerorg'

    const token = gccJwt.sign({
      channel_id: expectedChannelId,
      user_id: expectedUserId
    } as gccJwt.IPubSubAuth)
    const actualPayload = gccJwt.verifyAuthorizationToken(token)

    expect(Math.floor(dateNumber / 1000)).to.eql(actualPayload.iat)
    expect(expectedUserId).to.eql(actualPayload.user_id)
    expect(expectedChannelId).to.eql(actualPayload.channel_id)
  })

  it('set the exp field 30 seconds into the future', () => {
    const dateNumber = 1234456
    const actual = gccJwt.createPubSubAuth(
      'gamechangerorg',
      'usserr',
      dateNumber
    )
    const expected = Math.floor(dateNumber / 1000) + 30
    expect(expected).to.eql(actual.exp)
  })

  it('verifies example developer-rig token properly', () => {
    const exampleToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjUzNzk2MDEsIm9wYXF1ZV91c2VyX2lkIjoiVVJJR0xpVVp1WElkU1hNQXB6MiIsImNoYW5uZWxfaWQiOiJyaWdDaGFubmVsIiwicm9sZSI6InZpZXdlciIsInB1YnN1Yl9wZXJtcyI6eyJsaXN0ZW4iOlsiYnJvYWRjYXN0IiwiZ2xvYmFsIl19LCJpYXQiOjE1MzM4NDM2MDF9.mN3WfslPg-AMYZbARYh5sggy88VbsePwJZrdqWdQ2c8`
    const expectedContents = {
      channel_id: 'rigChannel',
      exp: 1565379601,
      iat: 1533843601,
      opaque_user_id: 'URIGLiUZuXIdSXMApz2',
      pubsub_perms: { listen: ['broadcast', 'global'] },
      role: 'viewer'
    }
    const actualFrontEndAuth = gccJwt.verifyAuthorizationToken(exampleToken)
    expect(expectedContents).to.eql(actualFrontEndAuth)
    const actualSubAuthToken = gccJwt.sign(actualFrontEndAuth)
    expect(exampleToken).to.eql(actualSubAuthToken)
  })

  it('verifies example bit payment JWT properly', () => {
    const exampleToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b3BpYyI6ImJpdHNfdHJhbnNhY3Rpb25fcmVjZWlwdCIsImV4cCI6MTUzNjYzNzc0MCwiZGF0YSI6eyJ0cmFuc2FjdGlvbklkIjoiZWRmZWZiMzgtNmZlNy00YzRiLTllNTItMGU3ZDA3NTkyODhiIiwidGltZSI6IjIwMTgtMDktMTEgMDI6NDk6MDAuNzQ1MzEzMjc2ICswMDAwIFVUQyIsInVzZXJJZCI6IjEwMjUwMzMxMCIsInByb2R1Y3QiOnsiZG9tYWluSWQiOiJ0d2l0Y2guZXh0LnRoNDBvdzB6b2c0b2U5Ynk1YTFtdGJzdXFtYWR2YiIsInNrdSI6InRlc3RTS1UiLCJkaXNwbGF5TmFtZSI6IlRlc3RQcm9kdWN0IiwiY29zdCI6eyJhbW91bnQiOjUsInR5cGUiOiJiaXRzIn19fX0.3BVYsviwR7E8UpaTg2Uv4XiZEXp8IYlIiGH9sDsT1XI'

    const options = { algorithms: ['HS256'], ignoreExpiration: true }
    const verified = jsonwebtoken.verify(
      exampleToken,
      Buffer.from(twitchExtensionOptions.twitchExtensionSecret, 'base64'),
      options
    )
    const expectedContents = {
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

    expect(expectedContents).to.eql(verified)
  })
})
