import createCanvas from './create-canvas'

/** Description */
const nativeShrink = (
  input: HTMLCanvasElement,
  width: number,
  height: number
): HTMLCanvasElement => {
  const { canvas, context } = createCanvas(width, height)

  if (context) {
    context.imageSmoothingQuality = 'high'
    context.drawImage(input, 0, 0, width, height)
  }

  return canvas
}

export default nativeShrink
