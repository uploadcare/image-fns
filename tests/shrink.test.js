import { expect } from 'chai'
import shrink from '../src/shrink'
import nativeShrink from '../src/native-shrink'
import createCanvas from '../src/create-canvas'

describe('test shrink', () => {
  it('deafult test', () => {
    const resizeFrom = 320
    const resizeTo = 100
    const { canvas } = createCanvas(resizeFrom, resizeFrom)

    const resized = shrink(canvas, resizeTo, resizeTo)

    expect(canvas.width).to.equal(resizeFrom)
    expect(canvas.height).to.equal(resizeFrom)
    expect(resized.width).to.equal(resizeTo)
    expect(resized.height).to.equal(resizeTo)
  })
})

describe('test native-shrink', () => {
  it('deafult test', () => {
    const resizeFrom = 320
    const resizeTo = 100
    const { canvas } = createCanvas(resizeFrom, resizeFrom)

    const resized = nativeShrink(canvas, resizeTo, resizeTo)

    expect(canvas.width).to.equal(resizeFrom)
    expect(canvas.height).to.equal(resizeFrom)
    expect(resized.width).to.equal(resizeTo)
    expect(resized.height).to.equal(resizeTo)
  })
})
