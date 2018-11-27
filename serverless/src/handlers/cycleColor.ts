import { APIGatewayEvent } from 'aws-lambda'
import { IFrontEndAuth } from '../jwt'
import { broadcastColor } from '../broadcast'
import { verifyAuthorization } from './verifyAuthorizationWrapper'
export const handler = verifyAuthorization(cycleColor)

function createRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export async function cycleColor(
  auth: IFrontEndAuth,
  event: APIGatewayEvent
): Promise<string> {
  return broadcastColor(auth, createRandomColor())
}
