// tslint:disable-next-line:no-var-requires
const jwtDecode = require('jwt-decode')

import config from '../config'
import axios from 'axios'
import { BitsManager } from './bits'
import { ViewerInfo, IAuthJwt, TwitchUser } from '../types'
import * as queryString from 'query-string'

export class TwitchManager {
  public readonly bits: BitsManager = new BitsManager(
    config.twitchBitsUseLoopback
  )
  private readonly twitchExt: TwitchExt
  private mostRecentViewerInfo?: ViewerInfo
  constructor() {
    this.twitchExt = window.Twitch.ext
    this.twitchExt.onAuthorized(auth => {
      this.eachAuthorize(auth)
    })
    this.bits.addOnTransactionCompleteCallback(transaction =>
      this.respondToTransaction(transaction)
    )
  }

  public log(message: string) {
    if (this.twitchExt.rig) this.twitchExt.rig.log(message)
  }
  public onContext(
    contextCallback: <T extends Partial<TwitchExtContext>>(
      context: T,
      changed: ReadonlyArray<keyof T>
    ) => void
  ) {
    this.twitchExt.onContext(contextCallback)
  }

  public requestIdShare() {
    this.twitchExt.actions.requestIdShare()
  }

  public onAuthorizedListeners: Array<(viewerInfo: ViewerInfo) => void> = []
  private eachAuthorize(auth: TwitchExtAuthorized) {
    if (!this.mostRecentViewerInfo) {
      // Need to unlisten at somepoint??
      this.twitchExt.listen(
        'broadcast',
        (_target: string, _contentType: string, message: string) => {
          this.firePubSubListeners(message)
        }
      )
    }

    const decodedJwt = jwtDecode(auth.token) as IAuthJwt
    const viewerInfo = {
      channelId: auth.channelId,
      role: decodedJwt.role,
      userId: decodedJwt.user_id,
      opaqueUserId: auth.userId,
      token: auth.token,
      clientId: auth.clientId
    } as ViewerInfo

    if (!this.twitchExt.bits) {
      throw Error('Couldn\'t find Bits object during Authorization')
    }
    this.bits.initialize(this.twitchExt.bits)

    this.mostRecentViewerInfo = viewerInfo
    this.onAuthorizedListeners.map(l => l(viewerInfo))
  }

  respondToTransaction(transaction: TwitchExtBitsTransaction) {
    if (transaction.initiator.toUpperCase() === 'CURRENT_USER') {
      this.ebsPost('transactionComplete', transaction)
        .then(resp => {
          this.twitchExt.rig.log(resp)
        })
        .catch(resp => {
          this.twitchExt.rig.log(resp)
        })
    }
  }

  public async ebsPost(method: string, data = {}): Promise<string> {
    const url = config.ebsUrl + '/' + method
    if (!this.mostRecentViewerInfo) {
      throw Error(`Missing Authorized during EBS get: ${url}`)
    }

    // Authorization header must have Capital A
    // tslint:disable-next-line:variable-name
    const Authorization = 'Bearer ' + this.mostRecentViewerInfo.token
    try {
      const res = await axios.post(url, data, { headers: { Authorization } })
      return res.data
    } catch (error) {
      throw Error(`EBS request returned ${error.message} )`)
    }
  }
  public async getTwitchUsersByUserId(
    userIds: string[]
  ): Promise<TwitchUser[]> {
    if (!this.mostRecentViewerInfo) {
      throw Error(`Missing Authorized during getTwitchUsersByUserId`)
    }

    const headers = {
      ['Accept']: 'application/vnd.twitchtv.v5+json',
      'Client-Id': this.mostRecentViewerInfo.clientId,
      'Content-Type': 'application/json'
    }
    const url = `https://api.twitch.tv/helix/users?id=` + userIds.join('&id=')
    const response = await axios.get(url, { headers })
    return response.data.data as TwitchUser[]
  }

  public queryParams(): TwitchExtClientQueryParams {
    const parsed: {} = queryString.parse(location.search)
    return parsed as TwitchExtClientQueryParams
  }

  public pubSubListeners: Array<(message: string) => void> = []

  private firePubSubListeners(message: string) {
    this.pubSubListeners.map(l => l(message))
  }
}
