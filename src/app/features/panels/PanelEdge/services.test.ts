import { Point } from './PanelEdge'
import { getOffsetByAllowedDirection } from './services'

const startPoint: Point = {
  x: 0,
  y: 0
}

const moveTopPoint: Point = {
  x: 0,
  y: -100
}

const moveRightPoint: Point = {
  x: 100,
  y: 0
}

const moveBottomPoint: Point = {
  x: 0,
  y: 100
}

const moveLeftPoint: Point = {
  x: -100,
  y: 0
}

describe('top direction', () => {
  it('returns vertical offset on top move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveTopPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveTopPoint.y
    })
  })

  it('returns vertical offset on bottom move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveBottomPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveBottomPoint.y
    })
  })

  it('returns zero vertical offset on right move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveRightPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveRightPoint.y
    })
  })

  it('returns zero vertical offset on left move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveLeftPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveLeftPoint.y
    })
  })
})

describe('bottom direction', () => {
  it('returns vertical offset on top move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveTopPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: moveTopPoint.y
    })
  })

  it('returns vertical offset on bottom move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveBottomPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: moveBottomPoint.y
    })
  })

  it('returns zero vertical offset on right move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveRightPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: moveRightPoint.y
    })
  })

  it('returns zero vertical offset on left move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveLeftPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: moveLeftPoint.y
    })
  })
})

describe('left direction', () => {
  it('returns horizontal offset on left move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveLeftPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveLeftPoint.x
    })
  })

  it('returns horizontal offset on right move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveRightPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveRightPoint.x
    })
  })

  it('returns zero horizontal offset on top move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveTopPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveTopPoint.x
    })
  })

  it('returns zero horizontal offset on bottom move', () => {
    expect(
      getOffsetByAllowedDirection(startPoint, moveBottomPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveBottomPoint.x
    })
  })
})
