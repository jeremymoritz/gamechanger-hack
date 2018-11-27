import { dynamoOptions } from '../config'
import { DynamoDB } from 'aws-sdk'
import { Database } from '.'

function createParams<T extends {}>(entries?: T): { TableName: string } & T {
  return Object.assign({ TableName: dynamoOptions.tableName }, entries)
}

export class Dynamo<T> implements Database<T> {
  readonly sortKey = dynamoOptions.sortKey
  readonly partitionKey = dynamoOptions.partitionKey

  constructor(
    private readonly partitionValue: string,
    private dynamoDb = new DynamoDB.DocumentClient(
      dynamoOptions.documentClientOptions
    )
  ) {}
  async query(bookmark = 0, limit = 100): Promise<T[]> {
    const params = createParams({
      Limit: limit,
      ScanIndexForward: false,
      KeyConditionExpression:
        '#partitionKey = :partitionValue and #sortKey > :sortValue',
      ExpressionAttributeNames: {
        '#partitionKey': this.partitionKey,
        '#sortKey': this.sortKey
      },
      ExpressionAttributeValues: {
        ':partitionValue': this.partitionValue,
        ':sortValue': bookmark
      }
    })
    const result = await this.dynamoDb.query(params).promise()
    return result.Items.map(r => {
      return r as T
    })
  }

  async put(obj: T): Promise<T> {
    const timestamp = Date.now()

    const params = createParams({
      Item: Object.assign(
        {
          [this.partitionKey]: this.partitionValue, //uuid.v1(),
          [this.sortKey]: timestamp // NEED TO CHECK IF THIS ALREADY EXISTS AND NOT OVERWRITE
        },
        obj
      )
    })
    const result = await this.dynamoDb.put(params).promise()
    return params.Item
  }

  async delete(obj: T): Promise<T> {
    const params = createParams({
      Key: {
        [this.partitionKey]: obj[this.partitionKey], //uuid.v1(),
        [this.sortKey]: obj[this.sortKey] // NEED TO CHECK IF THIS ALREADY EXISTS AND NOT OVERWRITE
      }
    })
    const result = await this.dynamoDb.delete(params).promise()
    return obj
  }
}
