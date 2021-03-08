import { PanelType } from './types'
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

test('unset active panel id on second activate', () => {
  const panelId = '123'
  expect(
    reducer(
      { ...initialState, activePanelId: panelId },
      setActivePanelId(panelId)
    )
  ).toEqual({
    ...initialState,
    activePanelId: ''
  })
})

test('add a new panel', () => {
  const panel: PanelType = {
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
