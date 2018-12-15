const fromFile = ({ file }) => {
  const url = URL.createObjectURL(file)

  const imagePromise = new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve({ image })
    image.onerror = () => reject()
    image.src = url
  })

  return imagePromise.finally(() => URL.revokeObjectURL(url)).then(fromImage)
}

const fromImage = ({ image }) => {
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  cx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)

  return { canvas }
}

const nativeResize = ({ canvas: input, width, height }) => {
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  cx.imageSmoothingQuality = 'high'
  cx.drawImage(input, 0, 0, w, h)

  return { canvas }
}

const toImage = ({ canvas, mime }) => {
  const image = new Image()
  image.src = canvas.toDataURL(mime)

  return { image }
}

const toFile = ({ canvas, name, mime, quality = 0.85 }) => {
  const filePromise = new Promise(resolve =>
    canvas.toBlob(resolve, mime, quality)
  )

  return filePromise.then(blob => {
    blob.lastModifiedDate = new Date()
    blob.name = name

    return { file: blob }
  })
}
