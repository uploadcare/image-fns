import { Formats, getMimeType } from './supported-formats'

const toImage = (
  canvas: HTMLCanvasElement,
  format: Formats | string
): HTMLImageElement => {
  const realImage = new Image()
  const mime = getMimeType(format)
  realImage.src = canvas.toDataURL(mime)

  return realImage
}

export default toImage
