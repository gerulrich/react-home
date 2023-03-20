import { createSlice } from '@reduxjs/toolkit';

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        output: [],
        album: null,
        isDownloading: false
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
        }
    }
});


// Action creators are generated for each case reducer function
export const { appendDownloadLog, startDownload } = musicSlice.actions;