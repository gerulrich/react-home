import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        darkMode: true
    },
    reducers: {
        setDarkMode: (state, {payload} ) => {
            state.darkMode = payload.darkMode;
        },
    }
});


// Action creators are generated for each case reducer function
export const { setDarkMode } = uiSlice.actions;