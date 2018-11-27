import { broadcastAlert } from './broadcast'
import { donations } from './db'
import { Donation, TwitchUser } from './sharedTypes'
import { getTwitchUserByUserId } from './twitch'

export async function storeTransaction(donation: Donation) {
  await donations.put(donation)
  const user = await getTwitchUserByUserId(donation.twitchUserId)
  const alert = createAlert(user, donation)
  const { status, statusText, data } = await broadcastAlert(
    donation.channelId,
    donation.twitchUserId,
    alert
  )
  return { status, statusText, data }
}

function createAlert(user: TwitchUser, donation: Donation) {
  return {
    name: user.display_name, //User name
    title: `${user.display_name} donated $${donation.amount}!`,
    text: `${donation.amount}`,
    amount: donation.amount,
    avatar: user.profile_image_url
  }
}
