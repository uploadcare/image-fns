import createCanvas from './create-canvas'
import MicroTasks from './task-queue'

const runner = MicroTasks()

function protect(img: HTMLCanvasElement): HTMLCanvasElement {
  const ratio = img.width / img.height

  const maxSquare = 5000000 // ios max canvas square
  const maxSize = 4096 // ie max canvas dimensions

  let maxWidth = Math.floor(Math.sqrt(maxSquare * ratio))
  let maxHeight = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio))

  if (maxWidth > maxSize) {
    maxWidth = maxSize
    maxHeight = Math.round(maxWidth / ratio)
  }

  if (maxHeight > maxSize) {
    maxHeight = maxSize
    maxWidth = Math.round(ratio * maxHeight)
  }

  if (img.width > maxWidth) {
    const { canvas, context } = createCanvas(maxWidth, maxHeight)
    if (context) {
      context.drawImage(img, 0, 0, maxWidth, maxHeight)
    }

    return canvas
  }

  return img
}

function shrinkTo(input: HTMLCanvasElement, w: number, h: number) {
  const { canvas, context } = createCanvas(w, h)
  if (context) {
    context.drawImage(input, 0, 0, w, h)
  }

  return Promise.resolve(canvas)
}

function shrink(
  image: HTMLCanvasElement,
  options: { width: number; height: number }
) {
  const { width, height } = options
  let result = protect(image)

  let steps = Math.ceil(Math.log2(result.width / width))
  let shrinkWidth = width * Math.pow(2, steps - 1)
  let shrinkHeight = height * Math.pow(2, steps - 1)
  const x = 2

  let promise: Promise<[HTMLCanvasElement, number, number]> = Promise.resolve([
    result,
    shrinkWidth,
    shrinkHeight,
  ] as [HTMLCanvasElement, number, number])

  const lil = ([canvas, width, height]: [HTMLCanvasElement, number, number]) =>
    runner.add(() =>
      shrinkTo(canvas, width, height).then(
        canva =>
          [canva, Math.round(width / x), Math.round(height / x)] as [
            HTMLCanvasElement,
            number,
            number
          ]
      )
    )

  for (let i = 0; i < steps; ++i) {
    promise = promise.then(lil)
  }

  return promise.then(([canvas]) => canvas)
}

export default shrink
