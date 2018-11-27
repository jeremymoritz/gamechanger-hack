export interface Alert {
  text: string
  amount: number
  avatar: string
  name: string
  title: string
}

export interface Donation {
  transactionId: string
  twitchUserId: string
  amount: number
  channelId: string
  userName: string
}

export interface IAuthJwt {
  exp: number

  channel_id: string

  pubsub_perms: {
    listen?: string[];
    send: string[];
  }

  role: 'broadcaster' | 'moderator' | 'viewer' | 'external'

  user_id?: string

  opaque_user_id?: string
}

export interface TwitchUser {
  id: string
  login: string
  display_name: string
  type: 'staff' | 'admin' | 'global_mod' | ''
  broadcaster_type: 'partner' | 'affiliate' | ''
  description: string // User’s channel description.
  profile_image_url: string
  offline_image_url: string
  view_count: number
  email: string // User’s email address. Returned if the request includes the user:read:email scope.
}
