import fromImage from './from-image'

const fromFile = (file: File): Promise<HTMLCanvasElement> => {
  const url = URL.createObjectURL(file)

  const imagePromise: Promise<HTMLImageElement> = new Promise(
    (resolve, reject) => {
      const image = new Image()

      image.onload = () => resolve(image)
      image.onerror = () => reject()
      image.src = url
    }
  )

  return imagePromise
    .then(
      image => {
        URL.revokeObjectURL(url)

        return image
      },
      error => {
        URL.revokeObjectURL(url)

        throw error
      }
    )
    .then(fromImage)
}

export default fromFile
