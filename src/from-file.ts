import ImageRepresentation from './image-representation'
import fromImage from './from-image'

const fromFile = (file: File): Promise<ImageRepresentation> => {
  const url = URL.createObjectURL(file)

  const imagePromise: Promise<HTMLImageElement> = new Promise(
    (resolve, reject) => {
      const image = new Image()

      image.onload = () => resolve(image)
      image.onerror = () => reject()
      image.src = url
    }
  )

  // const pipe = (value) => URL.revokeObjectURL(url)

  return imagePromise.then(fromImage)
}

export default fromFile
