import { Dynamo } from './dynamo'
import { Donation } from '../sharedTypes'

export interface Database<T> {
  query(bookmark?: number, limit?: number): Promise<T[]>
  put(obj: T): Promise<T>
}

export const donations = new Dynamo<Donation>('v1_Donation')
