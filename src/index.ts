const fromFile = ({ file }: { file: File }) => {
  const url = URL.createObjectURL(file)

  const imagePromise: Promise<{image: HTMLImageElement}> = new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve({ image })
    image.onerror = () => reject()
    image.src = url
  })

  // const pipe = (value) => URL.revokeObjectURL(url)

  return imagePromise.then(fromImage)
}

const fromImage = ({ image }: { image: HTMLImageElement }) => {
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')

  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  if (cx) {
    cx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
  }

  return { canvas }
}

const nativeResize = ({
  canvas: input,
  width,
  height,
}: {
  canvas: HTMLCanvasElement
  width: number
  height: number
}) => {
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height

  if (cx) {
    cx.imageSmoothingQuality = 'high'
    cx.drawImage(input, 0, 0, width, height)
  }

  return { canvas }
}

const toImage = ({
  canvas,
  mime,
}: {
  canvas: HTMLCanvasElement
  mime: string
}) => {
  const image = new Image()
  image.src = canvas.toDataURL(mime)

  return { image }
}

const toFile = ({
  canvas,
  name,
  mime,
  quality = 0.85,
}: {
  canvas: HTMLCanvasElement
  name: string
  mime: string
  quality: number
}) => {
  const filePromise = new Promise<Blob | null>(resolve =>
    canvas.toBlob(resolve, mime, quality)
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

export { toFile, toImage, nativeResize, fromImage, fromFile }
