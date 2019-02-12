const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  return { canvas, context }
}

export default createCanvas
