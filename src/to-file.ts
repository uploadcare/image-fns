import { Formats, MIME_TIPES } from './supported-formats'

const toFile = (
  canvas: HTMLCanvasElement,
  options: {
    name?: string
    format?: Formats | string
    quality?: number
  } = {}
): Promise<File | null> => {
  const { name, format, quality } = options
  const mime = format ? MIME_TIPES[format] || format : undefined

  const filePromise = new Promise<Blob | null>(resolve =>
    canvas.toBlob(resolve, mime, quality)
  )

  return filePromise.then(blob => {
    if (blob == null) return null

    let b: any = blob
    b.lastModifiedDate = new Date()
    b.name = name

    return <File>blob
  })
}

export default toFile
