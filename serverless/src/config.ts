const { amazonPaySecret, twitchExtensionSecret } = require('../secrets')

export const production = !process.env.IS_OFFLINE
// tslint:disable-next-line:no-console
// console.log('production: ' + production)

const offlineDocumentClientOptions = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'dummyKeyId process.env.AWS_ACCESS_KEY_ID',
  secretAccessKey: 'dummyAccessKey process.env.AWS_SECRET_ACCESS_KEY'
}

export const dynamoOptions = {
  tableName: process.env.DYNAMODB_TABLE || 'gcc-te-dev',
  sortKey: process.env.SORT_KEY || 'sort',
  partitionKey: process.env.PARTITION_KEY || 'partition',
  documentClientOptions: production ? {} : offlineDocumentClientOptions
}

export const amazonPayOptions = {
  secret: amazonPaySecret,
  accessKey: 'AKIAINFNXYV5AV7LG6VA',
  sellerId: 'A3FL1IXMTLGWYD',
  clientId: 'amzn1.application-oa2-client.5d9a4789242f479a9493e946aa2c8298',
  payUrl: production
    ? 'http://gcc-te-frontend.s3-website-us-east-1.amazonaws.com/pay.html'
    : 'https://localhost:8080/pay.html'
}

export const twitchExtensionOptions = {
  twitchExtensionSecret,
  clientId: 'th40ow0zog4oe9by5a1mtbsuqmadvb'
}
