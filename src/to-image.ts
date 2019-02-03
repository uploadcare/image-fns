import { Formats, MIME_TIPES } from './supported-formats'

const toImage = (
  canvas: HTMLCanvasElement,
  format: Formats | string
): HTMLImageElement => {
  const realImage = new Image()
  const mime = MIME_TIPES[format] || format
  realImage.src = canvas.toDataURL(mime)

  return realImage
}

export default toImage
