import { combineReducers, configureStore } from '@reduxjs/toolkit'

import panelsReducer from './panels/panelsSlice'

export const rootReducer = combineReducers({
  panels: panelsReducer
})
export type RootState = ReturnType<typeof rootReducer>

export const getConfiguredStore = (initialState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  })
}
