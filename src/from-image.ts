import createCanvas from './create-canvas'

const fromImage = (image: HTMLImageElement): HTMLCanvasElement => {
  const { canvas, ctx } = createCanvas(image.naturalWidth, image.naturalHeight)

  if (ctx) {
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
  }

  return canvas
}

export default fromImage
