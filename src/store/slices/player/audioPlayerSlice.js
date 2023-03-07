import { createSlice } from '@reduxjs/toolkit';

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState: {
        songs: [],
        currentSong: -1,
        isPlaying: false,
        paused: false,
        duration: 0,
        position: 0
    },
    reducers: {
        setPlayPause: (state,  {payload} ) => {
            state.isPlaying = payload.play;
        },
        setPosition: (state, {payload}) => {
            state.position = payload?.position;
        },
        setDuration: (state, {payload}) => {
            state.duration = payload?.duration;
        },
        // TODO agregar a la cola no tiene que cambiar el isPlaing
        // agregar metodo play(songs) que reemplace la cola y reproduzca.
        addSongsToQueue: (state, {payload}) => {
            if (!!payload.replace) {
                state.songs = [...payload.songs];
                state.currentSong = 0;
                state.position = 0;
            } else {
                state.songs = [...state.songs, ...payload.songs];
            }
            if (payload.play && !!payload.replace) {
                state.isPlaying = payload.play;
            }
        },
        setCurrentSong: (state, {payload}) => {
            state.currentSong = payload.currentSong;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setPlayPause, setPosition, setDuration, addSongsToQueue, setCurrentSong } = audioPlayerSlice.actions;