import createCanvas from './create-canvas'

const nativeShrink = (
  input: HTMLCanvasElement,
  options: {
    width: number
    height: number
  }
): HTMLCanvasElement => {
  const { width, height } = options
  const { canvas, context } = createCanvas(width, height)

  if (context) {
    context.imageSmoothingQuality = 'high'
    context.drawImage(input, 0, 0, width, height)
  }

  return canvas
}

export default nativeShrink
