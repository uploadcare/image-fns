import ImageRepresentation from './image-representation'

const fromImage = (image: HTMLImageElement): ImageRepresentation => {
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')

  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  if (cx) {
    cx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
  }

  return { canvas }
}

export default fromImage
