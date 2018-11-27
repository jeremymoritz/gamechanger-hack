import { parse } from 'fast-xml-parser'
import {
  CaptureNotification,
  IpnBody,
  IpnMessage,
  CaptureDetails
} from './types'
import { Donation } from '../sharedTypes'
import { getOrderReferenceDetails } from './api'

export { signature } from './signature'

export function parseCaptureNotification(
  ipnBody: IpnBody
): CaptureNotification | undefined {
  if (ipnBody.Type !== 'Notification') {
    throw new Error('IPN message lacks Type:Notification in body')
  }
  const message = JSON.parse(ipnBody.Message) as IpnMessage
  if (message.NotificationType !== 'PaymentCapture') return undefined

  return parse(message.NotificationData).CaptureNotification
}

export const captureDetailsToDonation = async function(
  captureDetails: CaptureDetails
): Promise<Donation> {
  const orderReferenceDetails = await getOrderReferenceDetails(captureDetails)
  const [
    twitchUserId,
    channelId,
    userName
  ] = orderReferenceDetails.SellerNote.split(' ')
  return {
    transactionId: captureDetails.AmazonCaptureId,
    amount: captureDetails.CaptureAmount.Amount,
    twitchUserId,
    channelId,
    userName
  }
}
