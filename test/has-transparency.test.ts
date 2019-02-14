import { expect } from 'chai'
import images from './fixtures'
import { hasTransparency, fromDataUrl } from '../src/'

describe('test for has transparency', () => {
  it('transparent png', () =>
    fromDataUrl(images.transparent.png).then(canvas =>
      expect(hasTransparency(canvas)).to.equal(true)
    ))

  it('transparent webp', () =>
    fromDataUrl(images.transparent.webp).then(canvas =>
      expect(hasTransparency(canvas)).to.equal(true)
    ))

  it('webp', () =>
    fromDataUrl(images.webp).then(canvas =>
      expect(hasTransparency(canvas)).to.equal(false)
    ))

  it('png', () =>
    fromDataUrl(images.png).then(canvas =>
      expect(hasTransparency(canvas)).to.equal(false)
    ))

  it('jpeg', () =>
    fromDataUrl(images.jpeg).then(canvas =>
      expect(hasTransparency(canvas)).to.equal(false)
    ))
})
