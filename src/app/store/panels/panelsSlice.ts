import { createSlice } from '@reduxjs/toolkit'

const panelsSlice = createSlice({
  name: 'panels',
  initialState: {
    counter: 0
  },
  reducers: {
    test(state) {
      state.counter++
    }
  }
})

export const { test } = panelsSlice.actions

export default panelsSlice.reducer
