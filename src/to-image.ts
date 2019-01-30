import ImageRepresentation from './image-representation'

const toImage = (
  image: ImageRepresentation,
  mime: string
): HTMLImageElement => {
  const realImage = new Image()
  realImage.src = image.canvas.toDataURL(mime)

  return realImage
}

export default toImage
