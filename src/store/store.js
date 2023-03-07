import { configureStore } from '@reduxjs/toolkit'
import { audioPlayerSlice } from './slices/player'
import { authSlice } from './slices/auth'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        player: audioPlayerSlice.reducer
    },
})