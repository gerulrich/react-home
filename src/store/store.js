import { configureStore } from '@reduxjs/toolkit'
import { audioPlayerSlice } from './audioPlayerSlice'
import { authSlice } from './slices/auth'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        player: audioPlayerSlice.reducer
    },
})