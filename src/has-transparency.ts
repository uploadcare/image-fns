import createCanvas from './create-canvas'

const hasTransparency = (input: HTMLCanvasElement) => {
  const pcsn = 50
  const {canvas, ctx} = createCanvas(pcsn, pcsn)

  let transparency = false

  if (ctx) {
    ctx.drawImage(input, 0, 0, pcsn, pcsn)
    const data = ctx.getImageData(0, 0, pcsn, pcsn).data
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
