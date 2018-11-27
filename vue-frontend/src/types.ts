import { Alert, IAuthJwt, TwitchUser, Donation } from '../../sharedTypes'
import { TwitchManager } from './twitch'
export { Alert, IAuthJwt, TwitchUser, Donation }

export interface ViewerInfo {
  channelId: string
  role: 'broadcaster' | 'moderator' | 'viewer' | 'external'
  userId?: string
  opaqueUserId?: string
  token: string
  clientId: string
  userName?: string
  channelName?: string
}
export interface RootState {
  alert: AlertState
  config: ConfigState
  twitch: TwitchManager
}

// No undefinable fields... it kills reactivity!
export interface ConfigState {
  color: string
  context: Partial<TwitchExtContext>
  viewerInfo: ViewerInfo
  queryParams: Partial<TwitchExtClientQueryParams>
}
// No undefinable fields... it kills reactivity!
export interface AlertState {
  alerts: Alert[]
  products: Product[]
  totalAmount: number
}

export interface Product {
  cost: {
    amount: string;
    type: 'bits' | 'USD';
  }
  displayName: string
  sku: string
}
