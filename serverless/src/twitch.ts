import axios, { AxiosRequestConfig } from 'axios'
import { twitchExtensionOptions } from './config'
import { TwitchUser } from './sharedTypes'

export const postBroadcast = async function(
  authTokenWithBearerPrefix: string,
  // tslint:disable-next-line:variable-name
  channel_id: string,
  typeAndPayload: { type: string; payload: {} },
  targets: string[]
) {
  const headers = {
    'Client-Id': twitchExtensionOptions.clientId,
    'Content-Type': 'application/json',
    Authorization: authTokenWithBearerPrefix
  }

  const twitchApiHost = 'api.twitch.tv'
  const url = `https://${twitchApiHost}/extensions/message/${channel_id}`

  const body = {
    content_type: 'application/json',
    message: JSON.stringify(typeAndPayload),
    targets: targets
  }
  return axios.post(url, body, { headers } as AxiosRequestConfig)
}

export async function getTwitchUserByUserId(
  userId: string
): Promise<TwitchUser> {
  const headers = {
    'Client-Id': twitchExtensionOptions.clientId,
    Accept: 'application/vnd.twitchtv.v5+json',
    'Content-Type': 'application/json'
  }
  const url = `https://api.twitch.tv/helix/users?id=${userId}`
  const response = await axios.get(url, { headers } as AxiosRequestConfig)
  return response.data['data'][0] as TwitchUser
}
