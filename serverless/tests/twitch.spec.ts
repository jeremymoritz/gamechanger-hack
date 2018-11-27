import { expect } from 'chai'
import { describe, it } from 'mocha'
import { getTwitchUserByUserId } from '../src/twitch'

// # gamechangerorg - 63636358
// # Capital_D - 103023432
// # inventonater - 102503310
// # ant0n1op - 38659224
// # atwheelzz - 109524830

describe('twitch user api', () => {
  beforeEach(function() {
    //
  })

  afterEach(function() {
    //
  })

  it('fetch inventonater', async () => {
    const user = await getTwitchUserByUserId('102503310')
    expect(user.display_name).to.eql('inventonater')
    expect(user.login).to.eql('inventonater')
    expect(user.id).to.eql('102503310')
    expect(user.profile_image_url).to.contain(
      'https://static-cdn.jtvnw.net/jtv_user_pictures/'
    )
    expect(user.profile_image_url).to.contain('-profile_image-300x300.jpg')
    expect(user.view_count).to.be.above(275)
  })
})
