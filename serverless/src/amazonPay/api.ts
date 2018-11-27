import { amazonPayOptions } from '../config'
import { CaptureDetails } from './types'

export function getOrderReferenceId(captureDetails: CaptureDetails): string {
  const cid = captureDetails.AmazonCaptureId
  return cid.substring(0, cid.lastIndexOf('-'))
}
export async function getOrderReferenceDetails(
  captureDetails: CaptureDetails
): Promise<OrderReferenceDetails> {
  const amazonOrderReferenceId = getOrderReferenceId(captureDetails)

  const amazonPayments = require('./amazonPayments')
  const environment = amazonOrderReferenceId.startsWith('S')
    ? amazonPayments.Environment.Sandbox
    : amazonPayments.Environment.Production

  return new Promise<OrderReferenceDetails>((resolve, reject) => {
    const payment = amazonPayments.connect({
      environment,
      sellerId: amazonPayOptions.sellerId,
      mwsAccessKey: amazonPayOptions.accessKey,
      mwsSecretKey: amazonPayOptions.secret,
      clientId: amazonPayOptions.clientId
    })

    payment.offAmazonPayments.getOrderReferenceDetails(
      { AmazonOrderReferenceId: amazonOrderReferenceId },
      (err, details: { OrderReferenceDetails: OrderReferenceDetails }) => {
        if (err) reject(err)
        else {
          resolve(details.OrderReferenceDetails)
        }
      }
    )
  })
}

interface OrderReferenceDetails {
  OrderReferenceStatus: {
    LastUpdateTimestamp: string; //'2018-11-04T22:46:14.266Z';
    State: string; //'Open';
  }
  ExpirationTimestamp: string //'2019-05-03T22:46:08.423Z';
  IdList: {
    member: string; //'P01-6836681-9994144-A029134'
  }
  PlatformId: string //'A2N4YCW61YFRZY';
  SellerOrderAttributes: {
    StoreName: string; //'GameChanger Twitch';
    SellerOrderId: string; //'1541371554719_102503310';
  }
  OrderTotal: {
    CurrencyCode: string; // 'USD';
    Amount: string; //'0.50'
  }
  Buyer: {
    Name: string; //'Nate Aschenbach';
    Email: string; //'nate@gamechangercharity.org';
  }
  ReleaseEnvironment: string //'Live';
  SellerNote: string //'38659224 25015105'; - userId channelId
  AmazonOrderReferenceId: string //'P01-6836681-9994144';
  CreationTimestamp: string //'2018-11-04T22:46:08.423Z';
  RequestPaymentAuthorization: string //'false';
}

// import axios, { AxiosRequestConfig, AxiosError } from 'axios'
// import { appendSignature } from './signature'
// import * as querystring from 'querystring'

// const result = await callMwsMethod({
//   AmazonOrderReferenceId: amazonOrderReferenceId
// })
// console.log(result)
// // return result
// return Promise.resolve({ SellerNote: '102503310' } as OrderReferenceDetails)

// axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     console.log(config)
//     return config
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error)
//   }
// )

// async function callMwsMethod(
//   params: { AmazonOrderReferenceId: string },
//   action = 'GetOrderReferenceDetails',
//   version = '2013-01-01',
//   sandbox = false
// ) {
//   const url = sandbox
//     ? 'https://mws.amazonservices.com/OffAmazonPayments_Sandbox/2013-01-01'
//     : 'https://mws.amazonservices.com/OffAmazonPayments/2013-01-01'

//   const required = Object.assign({}, params, {
//     AWSAccessKeyId: amazonPayOptions.accessKey,
//     Action: action,
//     SellerId: amazonPayOptions.sellerId,
//     Timestamp: new Date().toISOString(),
//     Version: version,
//     SignatureMethod: 'HmacSHA256',
//     SignatureVersion: '2'
//   })

//   const query = appendSignature(url, required) /// CAPITAL S SIGNATURE??
//   console.log(query)

//   try {
//     const result = await axios.post(url, querystring.stringify(query), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//     return result
//   } catch (e) {
//     throw new Error(e.response.data)
//   }
// }
