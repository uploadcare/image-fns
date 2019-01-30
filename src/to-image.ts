const toImage = ({
  canvas,
  mime,
}: {
  canvas: HTMLCanvasElement
  mime: string
}) => {
  const image = new Image()
  image.src = canvas.toDataURL(mime)

  return { image }
}

export default toImage
