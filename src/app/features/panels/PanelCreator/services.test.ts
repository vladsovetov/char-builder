import { PanelRect } from './PanelCreator'
import { getPanelRectOnEdgeMove } from './services'

const panel: PanelRect = {
  x: 100,
  y: 100,
  height: 100,
  width: 100
}

test('top edge should stretch on move up', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: panel.x, y: 0 }, 'top')).toEqual({
    ...panel,
    y: 0,
    height: 200
  })
})

test('top edge should shrink on move down but above bottom edge', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: panel.x, y: 150 }, 'top')).toEqual({
    ...panel,
    y: 150,
    height: 50
  })
})

test('top edge should not shrink below bottom edge', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: panel.x, y: 250 }, 'top')).toEqual({
    ...panel,
    y: 200,
    height: 0
  })
})

test('top edge should not go outside screen', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: panel.x, y: -50 }, 'top')).toEqual({
    ...panel,
    y: 0,
    height: 200
  })
})

test('bottom edge should stretch on move down', () => {
  expect(
    getPanelRectOnEdgeMove(panel, { x: panel.x, y: 250 }, 'bottom')
  ).toEqual({
    ...panel,
    height: 150
  })
})

test('bottom edge should shrink on move up but below top edge', () => {
  expect(
    getPanelRectOnEdgeMove(panel, { x: panel.x, y: 150 }, 'bottom')
  ).toEqual({
    ...panel,
    height: 50
  })
})

test('bottom edge should not shrink above top edge', () => {
  expect(
    getPanelRectOnEdgeMove(panel, { x: panel.x, y: 50 }, 'bottom')
  ).toEqual({
    ...panel,
    height: 0
  })
})

test('right edge should stretch on move right', () => {
  expect(
    getPanelRectOnEdgeMove(panel, { x: 250, y: panel.y }, 'right')
  ).toEqual({
    ...panel,
    width: 150
  })
})

test('right edge should shrink on move left but before left edge', () => {
  expect(
    getPanelRectOnEdgeMove(panel, { x: 150, y: panel.y }, 'right')
  ).toEqual({
    ...panel,
    width: 50
  })
})

test('right edge should not shrink behind left edge', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: 50, y: panel.y }, 'right')).toEqual(
    {
      ...panel,
      width: 0
    }
  )
})

test('left edge should stretch on move left', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: 50, y: panel.y }, 'left')).toEqual({
    ...panel,
    x: 50,
    width: 150
  })
})

test('left edge should shrink on move right but before right edge', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: 150, y: panel.y }, 'left')).toEqual(
    {
      ...panel,
      x: 150,
      width: 50
    }
  )
})

test('left edge should not shrink ahead of right edge', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: 250, y: panel.y }, 'left')).toEqual(
    {
      ...panel,
      x: 200,
      width: 0
    }
  )
})

test('left edge should not go outside screen', () => {
  expect(getPanelRectOnEdgeMove(panel, { x: -50, y: panel.y }, 'left')).toEqual(
    {
      ...panel,
      x: 0,
      width: 200
    }
  )
})
