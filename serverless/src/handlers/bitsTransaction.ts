import { APIGatewayEvent, Handler } from 'aws-lambda'
import * as jwt from '../jwt'
import { verifyAuthorization } from './verifyAuthorizationWrapper'
import { production } from '../config'
import { storeTransaction } from '../processDonation'

export interface TransactionReceiptData {
  transactionId: string
  time: string
  userId: string
  product: TwitchExtBitsProduct
}

export function verifyReceipt(
  transaction: TwitchExtBitsTransaction,
  options = { ignoreExpiration: false }
): TransactionReceiptData {
  if (!production) return createFakeReceiptData(transaction)
  const result = jwt.verifyToken(transaction.transactionReceipt, options)
  return result['data'] as TransactionReceiptData
}

function createFakeReceiptData(
  transaction: TwitchExtBitsTransaction
): TransactionReceiptData {
  return {
    transactionId: transaction['transactionId'], // wrong capitalization in TwitchExtBitsTransaction typing
    time: Date.now().toLocaleString(),
    userId: transaction.userId !== '0' ? transaction.userId : '63636358',
    product: transaction.product
  }
}

export async function transactionComplete(
  auth: jwt.IFrontEndAuth,
  event: APIGatewayEvent
): Promise<string> {
  const transaction = JSON.parse(event.body) as TwitchExtBitsTransaction
  const receiptData = await verifyReceipt(transaction)
  const donation = {
    transactionId: receiptData.transactionId,
    twitchUserId: receiptData.userId,
    amount: Number(receiptData.product.cost.amount),
    channelId: auth.channel_id,
    userName: auth.user_id
  }
  return JSON.stringify(await storeTransaction(donation))
}

export const handler: Handler = verifyAuthorization(transactionComplete)
