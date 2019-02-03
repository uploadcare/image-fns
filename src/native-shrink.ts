import createCanvas from './create-canvas'

/** Descrption */
const nativeShrink = (
  input: HTMLCanvasElement,
  width: number,
  height: number
): HTMLCanvasElement => {
  const { canvas, ctx } = createCanvas(width, height)

  if (ctx) {
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(input, 0, 0, width, height)
  }

  return canvas
}

export default nativeShrink
