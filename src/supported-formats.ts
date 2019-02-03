import createCanvas from './create-canvas'

const MIME_TIPES = {
  jpeg: 'image/jpeg' as 'image/jpeg',
  webp: 'image/webp' as 'image/webp',
  png: 'image/png' as 'image/png',
  tiff: 'image/tiff' as 'image/tiff',
  gif: 'image/gif' as 'image/gif',
  ico: 'image/vnd.microsoft.icon' as 'image/vnd.microsoft.icon',
}

type Formats = keyof typeof MIME_TIPES
type ImageMimeTypes = (typeof MIME_TIPES)[Formats]

let supportedFormats: Promise<Formats[]> | null = null

const keys = <K extends string>(obj: { [key: string]: any }) =>
  Object.keys(obj) as K[]

const getMimeType = (format: string): string =>
  MIME_TIPES[<Formats>format] || format

const getSupportedFormats = () => {
  if (supportedFormats) {
    return supportedFormats
  }

  const { canvas } = createCanvas(2, 1)

  const blobCallback = (resolve: Function, expectedMime: string) => (
    blob: Blob | null
  ) => {
    const acceptedMime = blob && blob.type

    resolve(acceptedMime === expectedMime)
  }

  supportedFormats = Promise.all(
    keys<Formats>(MIME_TIPES).map(format =>
      new Promise(resolve =>
        canvas.toBlob(
          blobCallback(resolve, MIME_TIPES[format]),
          MIME_TIPES[format]
        )
      ).catch(() => false)
    )
  )
    .then(indexesOfSupportedMimeTypes =>
      Promise.all([keys<Formats>(MIME_TIPES), indexesOfSupportedMimeTypes])
    )
    .then(([keysOfSupportedMimeTypes, indexesOfSupportedMimeTypes]) =>
      indexesOfSupportedMimeTypes
        .map((suppored, index) =>
          suppored ? keysOfSupportedMimeTypes[index] : null
        )
        .filter((value: Formats | null): value is Formats => value !== null)
    )

  return supportedFormats
}

export default getSupportedFormats
export { getSupportedFormats, MIME_TIPES, ImageMimeTypes, Formats, getMimeType }
