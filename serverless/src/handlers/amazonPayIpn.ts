import { APIGatewayEvent } from 'aws-lambda'
import {
  captureDetailsToDonation,
  parseCaptureNotification
} from '../amazonPay'
import { storeTransaction } from '../processDonation'
export const handler = async function(event: APIGatewayEvent) {
  const notificationBody = JSON.parse(event.body)
  const captureNotification = parseCaptureNotification(notificationBody)
  let result = 'No CaptureNotification found'
  if (captureNotification) {
    const captureDetails = captureNotification.CaptureDetails
    const donation = await captureDetailsToDonation(captureDetails)
    await storeTransaction(donation)
    result = JSON.stringify(donation)
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: result
  }
}
