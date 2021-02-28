import { Panel } from './types'
import reducer, {
  addPanel,
  initialState,
  setActivePanelId
} from './panelsSlice'

test('set active panel id', () => {
  const panelId = '123'
  expect(reducer(initialState, setActivePanelId(panelId))).toEqual({
    ...initialState,
    activePanelId: panelId
  })
})

test('add a new panel', () => {
  const panel: Panel = {
    id: '123',
    rect: {
      x: 100,
      y: 100,
      height: 200,
      width: 300
    }
  }
  expect(reducer(initialState, addPanel(panel))).toEqual({
    ...initialState,
    items: [panel]
  })
})
