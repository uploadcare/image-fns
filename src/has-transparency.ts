import ImageRepresentation from './image-representation'

const hasTransparency = (input: ImageRepresentation) => {
  const pcsn = 50

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = pcsn
  const ctx = canvas.getContext('2d')

  let transparency = false

  if (ctx) {
    ctx.drawImage(input.canvas, 0, 0, pcsn, pcsn)
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
