import { IFrontEndAuth, verifyAuthorizationToken } from '../jwt'
import { APIGatewayEvent, Handler } from 'aws-lambda'
type HandlerWithAuth = (
  auth: IFrontEndAuth,
  event: APIGatewayEvent
) => Promise<string>

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

export function verifyAuthorization(handler: HandlerWithAuth) {
  return async (event: APIGatewayEvent) => {
    try {
      const token = event.headers.Authorization
      const auth = verifyAuthorizationToken(token)
      const result = await handler(auth, event)
      return {
        statusCode: 200,
        headers,
        body: result
      }
    } catch (e) {
      return {
        statusCode: 500,
        headers,
        body: e
      }
    }
  }
}
