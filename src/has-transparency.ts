import createCanvas from './create-canvas'

const hasTransparency = (input: HTMLCanvasElement) => {
  const canvasSize = 50
  const {canvas, context} = createCanvas(canvasSize, canvasSize)

  let transparency = false

  if (context) {
    context.drawImage(input, 0, 0, canvasSize, canvasSize)
    const data = context.getImageData(0, 0, canvasSize, canvasSize).data
    canvas.width = canvas.height = 1

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 254) {
        transparency = true
        break
      }
    }
  }

  return transparency
}

export default hasTransparency
