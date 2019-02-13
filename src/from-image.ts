import createCanvas from './create-canvas'

const fromImage = (image: HTMLImageElement): HTMLCanvasElement => {
  const { canvas, context } = createCanvas(image.naturalWidth, image.naturalHeight)

  if (context) {
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
  }

  return canvas
}

export default fromImage
