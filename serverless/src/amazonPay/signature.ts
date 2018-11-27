import * as crypto from 'crypto'
import { amazonPayOptions } from '../config'
import * as querystring from 'querystring'

export function signature(queryStringParameters: { [name: string]: string }) {
  const amount = queryStringParameters['amount']
  const userId = queryStringParameters['userId']
  const channelId = queryStringParameters['channelId']

  const sellerOrderId = `${Date.now()}_${userId}`
  const sellerNote = `${userId} ${channelId}`

  const params = {
    accessKey: amazonPayOptions.accessKey,
    amount: amount,
    sellerId: amazonPayOptions.sellerId,
    returnURL: amazonPayOptions.payUrl,
    cancelReturnURL: amazonPayOptions.payUrl,
    lwaClientId: amazonPayOptions.clientId,
    sellerNote: sellerNote,
    sellerOrderId: sellerOrderId,
    currencyCode: 'USD',
    shippingAddressRequired: 'false',
    paymentAction: 'AuthorizeAndCapture'
  }
  return appendSignature(`payments.amazon.com`, '/', params)
}

export function appendSignature(host, path, params) {
  const hmac = crypto.createHmac('sha256', amazonPayOptions.secret)

  const sortedParams = Object.keys(params)
    .sort()
    .map(function(key) {
      return key + '=' + querystring.escape(params[key])
    })
    .join('&')

  const stringToSign = ['POST', host, path, sortedParams].join('\n')

  hmac.update(stringToSign)
  const finalSignature = RFC3986Encode(hmac.digest('base64'))

  params['signature'] = finalSignature
  return params
}

function RFC3986Encode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16)
  })
}
