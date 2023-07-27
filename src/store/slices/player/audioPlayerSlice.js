import { createSlice } from '@reduxjs/toolkit';

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState: {
        songs: [],
        currentSongIndex: -1,
        currentSong: {},
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
                state.currentSongIndex = 0;
                state.currentSong = state.songs[0];
                state.position = 0;
            } else {
                state.songs = [...state.songs, ...payload.songs];
            }
            if (payload.play && !!payload.replace) {
                state.isPlaying = payload.play;
            }
        },
        setCurrentSong: (state, {payload}) => {
            console.log(payload);
            const index = state.songs.findIndex((e) => e.title === payload.song.title && e.album === payload.song.album && e.artist === payload.song.artist);
            console.log(index);
            if (index > 0) {
                state.currentSong = payload.song;
                state.currentSongIndex = index;
            }
        },
        setNextSong: (state, {payload}) => {
            const nextSong = state.currentSongIndex + 1;
            if (nextSong < state.songs.length) {
                state.currentSongIndex = nextSong;
                state.currentSong = state.songs[nextSong];
            } else {
                state.isPlaying = false;
                state.position = 0;
                state.currentSongIndex = -1;
                state.currentSong = state.songs[0];
            }
        },
        setPrevSong: (state, {payload}) => {
            const prevSong = state.currentSongIndex - 1;
            if (prevSong >= 0) {
                state.currentSongIndex = prevSong;
                state.currentSong = state.songs[prevSong];
            }
        }
    }
});

// Action creators are generated for each case reducer function
export const { setPlayPause, setPosition, setDuration, addSongsToQueue, setCurrentSong, setNextSong, setPrevSong } = audioPlayerSlice.actions;