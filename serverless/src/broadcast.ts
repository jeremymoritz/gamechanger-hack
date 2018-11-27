import { IFrontEndAuth, IPubSubAuth, createPubSubAuth, sign } from './jwt'
import { postBroadcast } from './twitch'
import { Alert } from './sharedTypes'

export async function broadcastColor(auth: IFrontEndAuth, color: string) {
  await broadcast(auth.channel_id, auth.user_id, 'config/setColor', color)
  return color
}

export async function broadcastAlert(
  channelId: string,
  userId: string,
  alert: Alert
) {
  return broadcast(channelId, userId, 'alert/addAlert', alert)
}

async function broadcast<T>(
  channelId: string,
  userId: string,
  type: string,
  payload: T
) {
  const pubSubAuth: IPubSubAuth = createPubSubAuth(
    channelId,
    userId,
    Date.now()
  )
  const pubSubToken: string = sign(pubSubAuth)
  const targets = ['broadcast']

  return postBroadcast(
    pubSubToken,
    pubSubAuth.channel_id,
    { type, payload },
    targets
  )
}
