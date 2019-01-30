import ImageRepresentation from './image-representation'

const toFile = (
  image: ImageRepresentation,
  name: string,
  mime: string,
  quality: number
): Promise<File | null> => {
  const filePromise = new Promise<Blob | null>(resolve =>
    image.canvas.toBlob(resolve, mime, quality)
  )

  return filePromise.then(blob => {
    if (blob == null) return null

    let b: any = blob
    b.lastModifiedDate = new Date()
    b.name = name

    return <File>blob
    // return new File(<BlobPart[]>blob, name, { type: mime })
  })
}

export default toFile
