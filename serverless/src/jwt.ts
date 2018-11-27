import * as jwt from 'jsonwebtoken'
import { twitchExtensionOptions } from './config'
import { IAuthJwt } from './sharedTypes'

const bearerPrefix = 'Bearer '
const algorithm = 'HS256'

// We need a fresh buffer every time!
function base64Buffer(): Buffer {
  return Buffer.from(twitchExtensionOptions.twitchExtensionSecret, 'base64')
}

export function verifyAuthorizationToken(token: string): IFrontEndAuth {
  if (token && token.startsWith(bearerPrefix)) {
    const subToken = token.substring(bearerPrefix.length)
    return verifyToken(subToken) as IFrontEndAuth
  }
  throw new Error('Invalid token passed to verifyFrontEndToken: ' + token)
}

export function verifyToken(token: string, options?: jwt.VerifyOptions) {
  return jwt.verify(token, base64Buffer(), {
    algorithms: [algorithm],
    ignoreExpiration: true,
    ...options
  })
}
export function sign(authObject: IPubSubAuth): string {
  const signed = jwt.sign(authObject, base64Buffer(), { algorithm })
  const token = bearerPrefix + signed
  return token
}

export function createPubSubAuth(
  channelId: string,
  userId: string,
  dateNow: number
): IPubSubAuth {
  const serverTokenDurationSec = 30
  const payload: IPubSubAuth = {
    exp: Math.floor(dateNow / 1000) + serverTokenDurationSec,
    channel_id: channelId,
    user_id: userId,
    role: 'external',
    pubsub_perms: {
      send: ['*']
    }
  }
  return payload
}

export interface IPubSubAuth extends IAuthJwt {}

export interface IFrontEndAuth extends IAuthJwt {
  iat: number
}
