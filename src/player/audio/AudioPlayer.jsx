import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setDuration, setPosition, setNextSong } from "../../store/slices/player";
import { AudioControls } from "./AudioControls";
import { PlayerQueue } from "./PlayerQueue";
import { SongInfo } from "./SongInfo";
import { homeApi } from "../../api/homeApi";
import { redirect } from "react-router-dom";

export const AudioPlayer = () => {
    
    const dispatch = useDispatch();
    const audioPlayer = useRef();
    const {isPlaying, songs, currentSong, currentSongIndex} = useSelector(status => status.player);

    useEffect(() => {
        isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
    }, [isPlaying, audioPlayer?.current?.readyState]);

    const setMediaMetadata = (currentSong) => {
        if ("mediaSession" in navigator) {
            if (!!currentSong.media_url) {
                const metadata = {
                    title: currentSong.title,
                    artist: currentSong.artist,
                    album: currentSong.album,
                    artwork: [{
                        src: currentSong.cover_url
                    }]
                }
                navigator.mediaSession.metadata = new MediaMetadata(metadata);
            }
        }
    }

    const updateSongUrl = (song) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api${currentSong.media_url}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Añade encabezados de autenticación si es necesario
              },
            redirect: "manual", // This prevents automatic following of redirects
        }).then( response => {
            if (response.status === 301) {
                const redirectUrl = response.headers.get("location"); // Get the new URL from the 'Location' header
                console.log(redirectUrl);
                audioPlayer.current.src = redirectUrl;
            };
        });
    }

    useEffect(() => {
        if (isPlaying && (!!currentSong.media_url)) {
            if (audioPlayer.current.src !== currentSong.media_url) {
                updateSongUrl(currentSong);
            }
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
            if (audioPlayer.current.src !== currentSong.media_url) {
                updateSongUrl(currentSong);
            }
        }
        setMediaMetadata(currentSong);
    }, [currentSong]);

    const onLoadedData = (event) => dispatch(setDuration({duration: event.target.duration}));
    const onTimeUpdate = (event) => dispatch(setPosition({position: event.target.currentTime}));
    const onEnded = () => dispatch(setNextSong());
  
    return (
        <>
            <audio 
                ref={audioPlayer}
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                onLoadedData={onLoadedData}
                src="https://github.com/anars/blank-audio/raw/master/250-milliseconds-of-silence.mp3"
            />
            
            {/** medium screen and up*/}
            <Grid 
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{display: {xs: 'none', md: 'flex'}}}
            >
                <Grid item xs={3}>
                    <SongInfo songs={songs} currentSong={currentSong} currentSongIndex={currentSongIndex} isPlaying={isPlaying}/>                        
                </Grid>
                <Grid item xs={7}>
                    <AudioControls audioPlayer={audioPlayer} />
                </Grid>
                <Grid item xs={2} >
                   <PlayerQueue songs={songs} currentSong={currentSong} currentSongIndex={currentSongIndex} isPlaying={isPlaying}/>
                </Grid>

            </Grid>

            {/** Small screen */}
            <Grid 
                container
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                sx={{display: {sm: 'flex', md: 'none'}}}
            >
                <Grid item xs={10}>
                    <AudioControls audioPlayer={audioPlayer} />
                </Grid>
                <Grid item xs={2} >
                   <PlayerQueue songs={songs} currentSong={currentSong} currentSongIndex={currentSongIndex} isPlaying={isPlaying}/>
                </Grid>
            </Grid>
        </>
    )
}
