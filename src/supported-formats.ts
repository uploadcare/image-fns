type ImageMimeTypes =
  | 'image/jpeg'
  | 'image/webp'
  | 'image/png'
  | 'image/tiff'
  | 'image/gif'
  | 'image/vnd.microsoft.icon'

const MIME_TIPES: { [key: string]: ImageMimeTypes } = {
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  png: 'image/png',
  tiff: 'image/tiff',
  gif: 'image/gif',
  ico: 'image/vnd.microsoft.icon',
}

type Formats = 'jpeg' | 'webp' | 'png' | 'tiff' | 'gif' | 'ico'

let supportedFormats: Promise<Formats[]> | null = null

const keys = <V>(obj: { [key: string]: V }) => Object.keys(obj)
const values = <V>(obj: { [key: string]: V }) =>
  Object.keys(obj).map(key => obj[key])

const getSupportedFormats = () => {
  if (supportedFormats) {
    return supportedFormats
  }

  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 1

  const blobCallback = (resolve: Function, expectedMime: string) => (
    blob: Blob | null
  ) => {
    const acceptedMime = blob && blob.type

    resolve(acceptedMime === expectedMime)
  }

  supportedFormats = Promise.all(
    Object.keys(MIME_TIPES).map(format =>
      new Promise(resolve =>
        canvas.toBlob(
          blobCallback(resolve, MIME_TIPES[format]),
          MIME_TIPES[format]
        )
      ).catch(() => false)
    )
  )
    .then(indexesOfSupportedMimeTypes =>
      Promise.all([keys(MIME_TIPES), indexesOfSupportedMimeTypes])
    )
    .then(([keysOfSupportedMimeTypes, indexesOfSupportedMimeTypes]) =>
      indexesOfSupportedMimeTypes
        .map((suppored, index) =>
          suppored ? <Formats>keysOfSupportedMimeTypes[index] : null
        )
        .filter((value: Formats | null): value is Formats => value !== null)
    )

  return supportedFormats
}

export default getSupportedFormats
export { getSupportedFormats, MIME_TIPES, ImageMimeTypes, Formats }
