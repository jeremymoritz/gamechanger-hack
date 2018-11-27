import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as sinon from 'ts-sinon'
import * as crypto from 'crypto'

const sandbox = sinon.default.createSandbox()

describe('Amazon Pay Signature', () => {
  beforeEach(function() {
    //
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('Returns a signature', async () => {
    const contents =
      'GET\nelasticmapreduce.amazonaws.com\n/\nAWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&Action=DescribeJobFlows&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2011-10-03T15%3A19%3A30&Version=2009-03-31'
    const exampleKey = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
    const expectedEncode = 'i91nKc4PWAt0JJIdXwz9HxZCJDdiy6cf%2FMj6vPxyYIs%3D'

    const hmac = crypto.createHmac('SHA256', exampleKey)
    hmac.update(contents)

    function RFC3986Encode(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16)
      })
    }

    expect(expectedEncode).to.be.eql(RFC3986Encode(hmac.digest('base64')))
    // const actual = signature()
    // console.log(actual)
    // expect(actual.signature).to.eql(
    //   'oWUIdfYLeCu5/GPKAPClLpEjROipJPSN8dEJbO+lIEo='
    // )
  })
})
