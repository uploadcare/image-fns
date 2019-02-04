import fromImage from './from-image'

const fromDataUrl = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = error => reject(error)

    image.src = url
  }).then(fromImage)

export default fromDataUrl
