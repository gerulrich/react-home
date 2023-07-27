import { createSlice } from '@reduxjs/toolkit';

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        output: [],
        album: null,
        isDownloading: false,
        tag: ''
    },
    reducers: {
        appendDownloadLog: (state, {payload} ) => {
            state.output = [...state.output, `\n${payload.date} - ${payload.level} - ${payload.message}\n`];
            if (payload.message === 'Done') {
                state.isDownloading = false;
                state.album = null;
            }
        },
        startDownload: (state, {payload} ) => {
            state.isDownloading = true;
            state.album = payload.album;
            state.format = payload.format;
            state.output = [`$ download_deezer.sh --format ${ payload.format } https://deezer.com/album/${ payload.album }`];
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