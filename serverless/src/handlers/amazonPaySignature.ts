import { APIGatewayEvent, Handler } from 'aws-lambda'
import { signature } from '../amazonPay'
export const handler: Handler = async function(event: APIGatewayEvent) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(signature(event.queryStringParameters))
  }
}
