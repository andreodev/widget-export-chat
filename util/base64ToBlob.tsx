export function base64ToBlob(base64: string, mimeType = 'application/pdf') {
  const byteCharacters = atob(base64.replace(/\s/g, ''))
  const byteArray = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i)
  }
  return new Blob([byteArray], { type: mimeType })
}