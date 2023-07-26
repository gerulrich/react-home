import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        darkMode: true,
        showAll: false,
    },
    reducers: {
        setDarkMode: (state, {payload} ) => {
            state.darkMode = payload.darkMode;
        },
        setShowAll: (state, {payload} ) => {
            state.showAll = payload.showAll;
        },
    }
});


// Action creators are generated for each case reducer function
export const { setDarkMode,  setShowAll} = uiSlice.actions;