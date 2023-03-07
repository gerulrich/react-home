import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setDuration, setPosition, setCurrentSong, setPlayPause } from "../../store/slices/player";
import { AudioControls } from "./AudioControls";
import { PlayerQueue } from "./PlayerQueue";
import { SongInfo } from "./SongInfo";

export const AudioPlayer = () => {
    
    const dispatch = useDispatch();
    const audioPlayer = useRef();
    const {isPlaying, songs, currentSong} = useSelector(status => status.player);

    useEffect(() => {
        isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
    }, [isPlaying, audioPlayer?.current?.readyState]);

    useEffect(() => {
        if (currentSong >= 0 && currentSong < songs.length && isPlaying) {
            if (audioPlayer.current.src !== songs[currentSong].media_url) {
                audioPlayer.current.src = songs[currentSong].media_url;
                isPlaying ? audioPlayer.current.play() : audioPlayer.current.pause();
            }
        } else {
            audioPlayer.current.pause();
        }
    }, [currentSong, songs]);

    const onLoadedData = (event) => dispatch(setDuration({duration: event.target.duration}));
    const onTimeUpdate = (event) => dispatch(setPosition({position: event.target.currentTime}));

    const onEnded = () => {
        if (currentSong == (songs.length -1)) {
            dispatch(setPosition(0));
            dispatch(setPlayPause({play: false}));
            dispatch(setPosition({position: 0}));
            dispatch(setCurrentSong({currentSong: 0}));
        } else {
            const nextSong = currentSong + 1;
            dispatch(setCurrentSong({currentSong: nextSong}));                
        }
    }

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
                    <SongInfo songs={songs} currentSong={currentSong} isPlaying={isPlaying}/>                        
                </Grid>
                <Grid item xs={7}>
                    <AudioControls audioPlayer={audioPlayer} />
                </Grid>
                <Grid item xs={2} >
                   <PlayerQueue songs={songs} currentSong={currentSong} isPlaying={isPlaying}/>
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
                   <PlayerQueue songs={songs} currentSong={currentSong} isPlaying={isPlaying}/>
                </Grid>
            </Grid>
        </>
    )
}
