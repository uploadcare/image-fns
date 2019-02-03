const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  return { canvas, ctx }
}

export default createCanvas
