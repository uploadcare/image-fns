import ImageRepresentation from './image-representation'

/** Descrption */
const nativeShrink = (
  input: ImageRepresentation,
  width: number,
  height: number
): ImageRepresentation => {
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height

  if (cx) {
    cx.imageSmoothingQuality = 'high'
    cx.drawImage(input.canvas, 0, 0, width, height)
  }

  return { canvas }
}

export default nativeShrink
