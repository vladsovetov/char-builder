import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PanelType, PanelsState } from './types'

export const initialState: PanelsState = {
  activePanelId: '',
  items: []
}

const panelsSlice = createSlice({
  name: 'panels',
  initialState,
  reducers: {
    setActivePanelId(state, action: PayloadAction<string>) {
      state.activePanelId = action.payload
    },
    addPanel(state, action: PayloadAction<PanelType>) {
      state.items.push(action.payload)
    }
  }
})

export const { setActivePanelId, addPanel } = panelsSlice.actions

export default panelsSlice.reducer
