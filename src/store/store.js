import { configureStore } from '@reduxjs/toolkit'
import { audioPlayerSlice } from './slices/player'
import { authSlice } from './slices/auth'
import { musicSlice } from './slices/music/musicSlice'
import { uiSlice } from './slices/ui/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        player: audioPlayerSlice.reducer,
        music: musicSlice.reducer,
        ui: uiSlice.reducer,
    },
})