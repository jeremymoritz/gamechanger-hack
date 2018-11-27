const successUrl =
  'http://gcc-te-frontend.s3-website-us-east-1.amazonaws.com/pay.html?resultCode=Success&signature=uKC3SJZ0SHAzd%252FkF9YY%252FOqq0gVnvStFLMZcYa3SuJCI%253D&sellerId=A3FL1IXMTLGWYD&AWSAccessKeyId=AKIAINFNXYV5AV7LG6VA&SignatureMethod=HmacSHA256&SignatureVersion=2&orderReferenceId=P01-0554607-5531778&amount=0.50&currencyCode=USD&paymentAction=AuthorizeAndCapture&sellerOrderId=1541397581248_102503310'

export const captureMessage = {
  ReleaseEnvironment: 'Live',
  MarketplaceID: '623680',
  Version: '2013-01-01',
  NotificationType: 'PaymentCapture',
  SellerId: 'A3FL1IXMTLGWYD',
  NotificationReferenceId: 'eb221d4d-b073-4a10-b83e-16175b9d9705',
  Timestamp: '2018-10-23T22:54:56.462Z',
  NotificationData:
    '<?xml version="1.0" encoding="UTF-8"?><CaptureNotification xmlns="https://mws.amazonservices.com/ipn/OffAmazonPayments/2013-01-01">\n    <CaptureDetails>\n        <AmazonCaptureId>P01-2933073-2828284-C037658</AmazonCaptureId>\n        <CaptureReferenceId>P01-2933073-2828284_DefaultRefId</CaptureReferenceId>\n        <CaptureAmount>\n            <Amount>1.0</Amount>\n            <CurrencyCode>USD</CurrencyCode>\n        </CaptureAmount>\n        <RefundedAmount>\n            <Amount>0.0</Amount>\n            <CurrencyCode>USD</CurrencyCode>\n        </RefundedAmount>\n        <CaptureFee>\n            <Amount>0.32</Amount>\n            <CurrencyCode>USD</CurrencyCode>\n        </CaptureFee>\n        <IdList/>\n        <CreationTimestamp>2018-10-23T22:54:53.123Z</CreationTimestamp>\n        <CaptureStatus>\n            <State>Completed</State>\n            <LastUpdateTimestamp>2018-10-23T22:54:53.123Z</LastUpdateTimestamp>\n        </CaptureStatus>\n        <SoftDescriptor>AMZ*GameChanger Char</SoftDescriptor>\n    </CaptureDetails>\n</CaptureNotification>'
}
export const authorizeMessage = {
  ReleaseEnvironment: 'Live',
  MarketplaceID: '623680',
  Version: '2013-01-01',
  NotificationType: 'PaymentAuthorize',
  SellerId: 'A3FL1IXMTLGWYD',
  NotificationReferenceId: '159b07e5-3627-4f07-8975-429ef7e15639',
  Timestamp: '2018-10-23T22:54:54.765Z',
  NotificationData:
    '<?xml version="1.0" encoding="UTF-8"?><AuthorizationNotification xmlns="https://mws.amazonservices.com/ipn/OffAmazonPayments/2013-01-01">\n    <AuthorizationDetails>\n        <AmazonAuthorizationId>P01-2933073-2828284-A037658</AmazonAuthorizationId>\n        <AuthorizationReferenceId>P01-2933073-2828284_DefaultRefId</AuthorizationReferenceId>\n        <AuthorizationAmount>\n            <Amount>1.0</Amount>\n            <CurrencyCode>USD</CurrencyCode>\n        </AuthorizationAmount>\n        <CapturedAmount>\n            <Amount>1.0</Amount>\n            <CurrencyCode>USD</CurrencyCode>\n        </CapturedAmount>\n        <AuthorizationFee>\n            <Amount>0.0</Amount>\n            <CurrencyCode>USD</CurrencyCode>\n        </AuthorizationFee>\n        <IdList>\n            <Id>P01-2933073-2828284-C037658</Id>\n        </IdList>\n        <CreationTimestamp>2018-10-23T22:54:53.023Z</CreationTimestamp>\n        <ExpirationTimestamp>2018-11-22T22:54:53.023Z</ExpirationTimestamp>\n        <AuthorizationStatus>\n            <State>Closed</State>\n            <LastUpdateTimestamp>2018-10-23T22:54:54.094Z</LastUpdateTimestamp>\n            <ReasonCode>MaxCapturesProcessed</ReasonCode>\n        </AuthorizationStatus>\n        <SoftDecline>false</SoftDecline>\n        <OrderItemCategories/>\n        <CaptureNow>true</CaptureNow>\n        <SoftDescriptor>AMZ*GameChanger Char</SoftDescriptor>\n    </AuthorizationDetails>\n</AuthorizationNotification>'
}
export const authorizeBody = {
  Type: 'Notification',
  MessageId: 'f295a79a-c48c-5eea-b238-f3d360d11e3f',
  TopicArn: 'arn:aws:sns:us-east-1:291180941288:AGWSWK15IEJJ7A3FL1IXMTLGWYD',
  Message:
    '{"ReleaseEnvironment":"Live","MarketplaceID":"623680","Version":"2013-01-01","NotificationType":"PaymentAuthorize","SellerId":"A3FL1IXMTLGWYD","NotificationReferenceId":"c0ab35d6-791f-4b74-b900-54e75b9e8757","Timestamp":"2018-10-23T22:35:09.275Z","NotificationData":"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?><AuthorizationNotification xmlns=\\"https://mws.amazonservices.com/ipn/OffAmazonPayments/2013-01-01\\">\\n    <AuthorizationDetails>\\n        <AmazonAuthorizationId>P01-2063820-0023097-A016707<\\/AmazonAuthorizationId>\\n        <AuthorizationReferenceId>P01-2063820-0023097_DefaultRefId<\\/AuthorizationReferenceId>\\n        <AuthorizationAmount>\\n            <Amount>1.0<\\/Amount>\\n            <CurrencyCode>USD<\\/CurrencyCode>\\n        <\\/AuthorizationAmount>\\n        <CapturedAmount>\\n            <Amount>1.0<\\/Amount>\\n            <CurrencyCode>USD<\\/CurrencyCode>\\n        <\\/CapturedAmount>\\n        <AuthorizationFee>\\n            <Amount>0.0<\\/Amount>\\n            <CurrencyCode>USD<\\/CurrencyCode>\\n        <\\/AuthorizationFee>\\n        <IdList>\\n            <Id>P01-2063820-0023097-C016707<\\/Id>\\n        <\\/IdList>\\n        <CreationTimestamp>2018-10-23T22:35:07.413Z<\\/CreationTimestamp>\\n        <ExpirationTimestamp>2018-11-22T22:35:07.413Z<\\/ExpirationTimestamp>\\n        <AuthorizationStatus>\\n            <State>Closed<\\/State>\\n            <LastUpdateTimestamp>2018-10-23T22:35:08.655Z<\\/LastUpdateTimestamp>\\n            <ReasonCode>MaxCapturesProcessed<\\/ReasonCode>\\n        <\\/AuthorizationStatus>\\n        <SoftDecline>false<\\/SoftDecline>\\n        <OrderItemCategories/>\\n        <CaptureNow>true<\\/CaptureNow>\\n        <SoftDescriptor>AMZ*GameChanger Char<\\/SoftDescriptor>\\n    <\\/AuthorizationDetails>\\n<\\/AuthorizationNotification>"}',
  Timestamp: '2018-10-23T22:35:09.282Z',
  SignatureVersion: '1',
  Signature:
    'AhmOOAjVScBWyPj4agJXHUi8X65i8KKJB1m+q6CrxZ4yt0Mt5NAL/7noeJCpi98zXnpIejNJrghM3xZ3PadnKb+JR0XOAIysI6cyeU/j3WGHbime7nHOGqxwWj2nxBq1ws1lYxNYMBp5lNXdv//Iukc3d4toS1k6n4F7iJawW4cxeIYj5JODOMR7sfeCwH7vFFN+9a72CRvnfyVpn8AovEQrjbE5MbgR9f9n0DVXAYRcDceHevr+cIxmKM6VN73ZWQ6WjwhE82kq0RknDu3KOdsy586qj+Y5mh2+x7ueGxQULDG6MvRFWO5dQdzdWlDwaPOL8SIgi8jd3pCqpCz1gw==',
  SigningCertURL:
    'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-0fb3b692991b952a61daf69ea263e545.pem',
  UnsubscribeURL:
    'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:291180941288:AGWSWK15IEJJ7A3FL1IXMTLGWYD:5ed79acc-40ae-4cf7-be9e-da011fb283db'
}
export const captureBody = {
  Type: 'Notification',
  MessageId: '69c9db99-5fe1-5e52-9ff6-8ffebba6106c',
  TopicArn: 'arn:aws:sns:us-east-1:291180941288:A3BXB0YN3XH17HA3FL1IXMTLGWYD',
  Message:
    '{"ReleaseEnvironment":"Sandbox","MarketplaceID":"623690","Version":"2013-01-01","NotificationType":"PaymentCapture","SellerId":"A3FL1IXMTLGWYD","NotificationReferenceId":"ce7ee36b-b9ed-4429-a69b-0ebc398ea60a","Timestamp":"2018-11-15T21:15:51.757Z","NotificationData":"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?><CaptureNotification xmlns=\\"https://mws.amazonservices.com/ipn/OffAmazonPayments/2013-01-01\\">\\n    <CaptureDetails>\\n        <AmazonCaptureId>S01-2765659-0358526-C003349<\\/AmazonCaptureId>\\n        <CaptureReferenceId>S01-2765659-0358526_DefaultRefId<\\/CaptureReferenceId>\\n        <CaptureAmount>\\n            <Amount>0.5<\\/Amount>\\n            <CurrencyCode>USD<\\/CurrencyCode>\\n        <\\/CaptureAmount>\\n        <RefundedAmount>\\n            <Amount>0.0<\\/Amount>\\n            <CurrencyCode>USD<\\/CurrencyCode>\\n        <\\/RefundedAmount>\\n        <CaptureFee>\\n            <Amount>0.0<\\/Amount>\\n            <CurrencyCode>USD<\\/CurrencyCode>\\n        <\\/CaptureFee>\\n        <IdList/>\\n        <CreationTimestamp>2018-11-15T21:15:50.710Z<\\/CreationTimestamp>\\n        <CaptureStatus>\\n            <State>Completed<\\/State>\\n            <LastUpdateTimestamp>2018-11-15T21:15:50.710Z<\\/LastUpdateTimestamp>\\n        <\\/CaptureStatus>\\n        <SoftDescriptor>AMZ*GameChanger Char<\\/SoftDescriptor>\\n    <\\/CaptureDetails>\\n<\\/CaptureNotification>"}',
  Timestamp: '2018-11-15T21:15:51.769Z',
  SignatureVersion: '1',
  Signature:
    'Mm7pITt1BAaT7yCaEgrRIpCkCHOMJrTnWGZPmdtbG/jV/NmWlwpp6g1kyzttFtw8Kz4DduOJOOCi4Ay0cHehmKEzKY0nzaBgAGl9Jd/9jYMNj6mErKn+LXzr319vRBQQnBCvxYxC/+q7ynnFWqbPXkazl61J+eF1duj6HeHMp/JxLXvQsDr8ncC5F+GBEuXJ9KWhzDAX9ODp0xfROEcKG+HfxFc426HsumYHIpOP3sllCejSByc3cpwotNcpoYJ2q65HXPwU4Klr4Yt9S68IxI5YM/WazG+LRcuZlHHwHJpvG0aO2yszn1zek+UTfLRe3xWJv+Fihyftr+0E8oaY4Q==',
  SigningCertURL:
    'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-ac565b8b1a6c5d002d285f9598aa1d9b.pem',
  UnsubscribeURL:
    'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:291180941288:A3BXB0YN3XH17HA3FL1IXMTLGWYD:3c569d82-bd91-4aca-925c-4e946eef3bc5'
}
