import config from '../config'
import axios from 'axios'
import { sourceScript } from '../external'

declare global {
  interface Window {
    onAmazonLoginReady(a?: string): void
  }
  // tslint:disable-next-line:variable-name
  const OffAmazonPayments: {
    Button(
      amazonPayButton: string,
      sellerId: string,
      args: {
        type: string;
        hostedParametersProvider(done: (args: {}) => void): void;
        onError(errorCode: {
          getErrorCode(): string;
          getErrorMessage(): string;
        }): void;
      }
    ): void;
  }
}

function renderButton(signature: string) {
  OffAmazonPayments.Button('AmazonPayButton', 'A3FL1IXMTLGWYD', {
    type: 'hostedPayment',
    hostedParametersProvider: done => {
      done(signature)
    },
    onError: errorCode => {
      const e = errorCode.getErrorCode() + ' ' + errorCode.getErrorMessage()
      throw new Error(e)
    }
  })
}

export async function load(doc: Document) {
  const url = config.ebsUrl + '/amazonPaySignature?'
  const signatureResponse = await axios.get(url + location.search.substr(1))
  const signature = signatureResponse.data
  window.onAmazonLoginReady = () => {
    // amazon.Login.setClientId('YOUR_CLIENT_ID_HERE')
    renderButton(signature)
  }
  await sourceScript(config.amazonPayWidgetUrl, doc)
}
