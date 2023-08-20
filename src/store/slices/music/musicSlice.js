import { createSlice } from '@reduxjs/toolkit';

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        output: '',
        album: null,
        isDownloading: false,
        tag: ''
    },
    reducers: {
        appendDownloadLog: (state, {payload} ) => {
            if (state.output == '') {
                state.output = payload.message;    
            } else {
                state.output = state.output + '\n' + payload.message;
            }
            if (payload.message && payload.message.endsWith('Finalizado')) {
                state.isDownloading = false;
                state.album = null;
            }
        },
        startDownload: (state, {payload} ) => {
            state.isDownloading = true;
            state.album = payload.album;
            state.format = payload.format;
            state.output = '';
        },
        updateTag: (state, {payload} ) => {
            state.tag = payload.code;
        },
        clearTag: (state, {payload} ) => {
            state.tag = "";
        }
    }
});


// Action creators are generated for each case reducer function
export const { appendDownloadLog, startDownload, updateTag, clearTag } = musicSlice.actions;