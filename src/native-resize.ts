
const nativeResize = ({
  canvas: input,
  width,
  height,
}: {
  canvas: HTMLCanvasElement
  width: number
  height: number
}) => {
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height

  if (cx) {
    cx.imageSmoothingQuality = 'high'
    cx.drawImage(input, 0, 0, width, height)
  }

  return { canvas }
}

export default nativeResize
