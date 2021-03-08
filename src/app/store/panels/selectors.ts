import { RootState } from 'app/store'

export const panelsSelector = (state: RootState) => state.panels.items
export const activePanelIdSelector = (state: RootState) =>
  state.panels.activePanelId
