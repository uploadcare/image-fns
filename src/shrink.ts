 
function protect(img: HTMLCanvasElement): HTMLCanvasElement {
  const ratio = img.width / img.height

  const maxSquare = 5000000 // ios max canvas square
  const maxSize = 4096 // ie max canvas dimensions

  let maxW = Math.floor(Math.sqrt(maxSquare * ratio))
  let maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio))

  if (maxW > maxSize) {
    maxW = maxSize
    maxH = Math.round(maxW / ratio)
  }

  if (maxH > maxSize) {
    maxH = maxSize
    maxW = Math.round(ratio * maxH)
  }

  if (img.width > maxW) {
    const canvas = document.createElement('canvas')
    canvas.width = maxW
    canvas.height = maxH
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0, maxW, maxH)
    }

    return canvas
  }

  return img
}

function shrinkTo(input: HTMLCanvasElement, w: number, h: number) {
  const canvas = document.createElement('canvas')

  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.drawImage(input, 0, 0, w, h)
  }

  return canvas
}

function shrink(image: HTMLCanvasElement, widht: number, height: number) {
  let result = protect(image)

  let steps = Math.ceil(Math.log2(result.width / widht))
  let sW = widht * Math.pow(2, steps - 1)
  let sH = height * Math.pow(2, steps - 1)
  const x = 2

  while (true) {
    if (!steps--) {
      return result
    }

    result = shrinkTo(result, sW, sH)
    sW = Math.round(sW / x)
    sH = Math.round(sH / x)
  }
}

export default shrink
