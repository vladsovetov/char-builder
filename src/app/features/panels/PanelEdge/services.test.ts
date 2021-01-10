import { Point } from './PanelEdge'
import { getRectDiffBetweenPointsByPosition } from './services'

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

describe('top position', () => {
  it('returns vertical offset and increases height on top move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveTopPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveTopPoint.y,
      width: 0,
      height: Math.abs(moveTopPoint.y)
    })
  })

  it('returns vertical offset and decreases height on bottom move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveBottomPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveBottomPoint.y,
      width: 0,
      height: Math.abs(moveBottomPoint.y) * -1
    })
  })

  it('returns zero vertical offset and does not change height on right move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveRightPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveRightPoint.y,
      width: 0,
      height: 0
    })
  })

  it('returns zero vertical offset and does not change height on left move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveLeftPoint, 'top')
    ).toStrictEqual({
      ...startPoint,
      y: moveLeftPoint.y,
      width: 0,
      height: 0
    })
  })
})

describe('bottom position', () => {
  it('returns vertical offset and decreases height on top move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveTopPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: 0,
      width: 0,
      height: Math.abs(moveTopPoint.y) * -1
    })
  })

  it('returns vertical offset and increases height on bottom move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveBottomPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: 0,
      width: 0,
      height: Math.abs(moveBottomPoint.y)
    })
  })

  it('returns zero vertical offset and does not change height on right move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveRightPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: 0,
      width: 0,
      height: 0
    })
  })

  it('returns zero vertical offset and does not change height on left move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveLeftPoint, 'bottom')
    ).toStrictEqual({
      ...startPoint,
      y: 0,
      width: 0,
      height: 0
    })
  })
})

describe('left position', () => {
  it('returns horizontal offset and increases width on left move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveLeftPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveLeftPoint.x,
      width: Math.abs(moveLeftPoint.x),
      height: 0
    })
  })

  it('returns horizontal offset and decreases width on right move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveRightPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveRightPoint.x,
      width: Math.abs(moveRightPoint.x) * -1,
      height: 0
    })
  })

  it('returns zero horizontal offset and does not change width on top move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveTopPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveTopPoint.x,
      width: 0,
      height: 0
    })
  })

  it('returns zero horizontal offset and does not change width on bottom move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveBottomPoint, 'left')
    ).toStrictEqual({
      ...startPoint,
      x: moveBottomPoint.x,
      width: 0,
      height: 0
    })
  })
})

describe('right position', () => {
  it('returns horizontal offset and decreases width on left move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveLeftPoint, 'right')
    ).toStrictEqual({
      ...startPoint,
      x: 0,
      width: Math.abs(moveLeftPoint.x) * -1,
      height: 0
    })
  })

  it('returns horizontal offset and increases width on right move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveRightPoint, 'right')
    ).toStrictEqual({
      ...startPoint,
      x: 0,
      width: Math.abs(moveRightPoint.x),
      height: 0
    })
  })

  it('returns zero horizontal offset and does not change width on top move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveTopPoint, 'right')
    ).toStrictEqual({
      ...startPoint,
      x: 0,
      width: 0,
      height: 0
    })
  })

  it('returns zero horizontal offset and does not change width on bottom move', () => {
    expect(
      getRectDiffBetweenPointsByPosition(startPoint, moveBottomPoint, 'right')
    ).toStrictEqual({
      ...startPoint,
      x: 0,
      width: 0,
      height: 0
    })
  })
})
