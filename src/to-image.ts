import { Formats, getMimeType } from './supported-formats'

const toImage = (
  canvas: HTMLCanvasElement,
  options: {
    format?: Formats | string
  } = {}
): HTMLImageElement => {
  const { format } = options
  const realImage = new Image()
  const mime = getMimeType(format)
  realImage.src = canvas.toDataURL(mime)

  return realImage
}

export default toImage
