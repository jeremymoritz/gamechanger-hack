export function sourceScript(url: string, doc: Document) {
  return new Promise((resolve: (el: HTMLScriptElement) => void) => {
    const script: HTMLScriptElement = doc.createElement('script')
    script.onload = () => {
      resolve(script)
    }
    script.async = true
    script.src = url
    doc.body.appendChild(script) // Should be doc.head?
  })
}
