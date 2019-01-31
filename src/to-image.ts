const toImage = (canvas: HTMLCanvasElement, mime: string): HTMLImageElement => {
  const realImage = new Image()
  realImage.src = canvas.toDataURL(mime)

  return realImage
}

export default toImage
